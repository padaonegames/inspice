/**
 * Gestor de secuencias de pasos, con un estado interno formado por los
 * estados parciales de cada uno de las etapas individuales.
 * Tomado principalmente de https://github.com/sametweb/react-step-builder/blob/master/src/lib-ts/index.tsx.
 * Esta versión pretende permitir realizar cambios puntuales sobre dicho código
 * para ajustarlo a nuestras necesidades (por ejemplo para modificar de forma más
 * conveniente los tipos de datos de los formularios asociados), y disponer de una
 * versión "comentada" donde se explique cómo funciona internamente el módulo.
 *
 * El mayor cambio incluído aquí está destinado a reubicar el estado del formulario
 * en el componente padre (donde se declaran los pasos), y de este modo permitir el
 * acceso al mismo desde un nivel superior al ámbito del contexto de pasos que se define aquí.
 */

import React, { useContext, useEffect, useState } from "react";
import { ComponentType, createContext, ReactElement } from "react";

//--------------------------------------------------------------
//             Definición de un Paso Concreto
//--------------------------------------------------------------

/**
 * Comenzaremos definiendo la noción de paso dentro de un listado
 * de pasos o etapas de nuestro formulario. Notamos que una buena parte de los tipos
 * descritos a continuación hacen referencia al contexto global al que todo
 * paso tendrá acceso al estar declarado dentro de `Steps`.
 *
 * Si se declara un paso fuera de un entorno `Steps`, el contexto recibido
 * será el que establezcamos por defecto más abajo, esencialmente un objeto
 * con un montón de valores dummies por defecto.
 */

/**
 * Lo primero que haremos será definirnos una noción de entrada en la lista de
 * pasos que gestionamos. Por el momento nos bastará con mantener información
 * relativa al nombre asignado a un paso y a su posición dentro de la lista.
 * Es importante remarcar aquí que la información de estas entradas será puramente
 * "cosmética", en el sentido de que no resultará esencial para garantizar el correcto
 * funcionamiento de los componentes/ pasos. No obstante, sí que resulta conveniente
 * para, por ejemplo, mostrar números de etapa dentro de cada componente de paso,
 * títulos que identifiquen cada uno de ellos, etc.
 */

/** Auxiliary type containing the name and the order of a given state within the context */
type StepEntry = {
  /** position of the step within the list of steps (in the context data) */
  order: number;
  /** name of the step (identifier) */
  name: string;
};

/**
 * Vamos a hacer una diferenciación entre StepProps y StepComponentProps:
 *
 * + `StepProps` se refiere a la base de la que heredarán los props de un componente `Step`,
 * que serán los únicos componentes permitidos dentro del cuerpo de un componente `Steps`.
 * En esencia, son los props de cualquiera de las entradas de tipo
 * ```javascript
 *  <Step title="My Step" component={MyStepComponent} />
 * ```
 * con un callback opcional en `onStepLoaded` que permite especificar lógica adicional a
 * ejecutar antes de realizar un cambio desde otro paso al paso actual (será llamado al entrar en él).
 */
export interface BasicStepProps<S, T extends StepComponentProps<S>> {
  /** Title of this step */
  title?: string;
  /** Component to be rendered as a step */
  component: ComponentType<T>;
  /** A callback function to run before step change occurs */
  onStepLoaded?: () => void;
}

export type StepProps<S, T extends StepComponentProps<S>> = BasicStepProps<
  S,
  T
> &
  ExclusiveStepProps<S, T>;

type ExclusiveStepProps<S, T> = Omit<T, keyof StepComponentProps<S>>;

/**
 * + `StepComponentProps` representa la base mínima de props que deben incluir los componentes
 * que definan un paso `<Step>` dentro de un entorno `<Steps>`. Esto permite imponer una cierta
 * forma y estructura sobre los componentes empleados a modo de pasos. En el siguiente ejemplo:
 * ```javascript
 *  <Step title="My Step" component={MyStepComponent} />
 * ```
 * `MyStepComponent` deberá ser un componente de React que tome como props un tipo o interfaz que
 * contenga, como mínimo, todos los campos especificados en la definición de `StepComponentProps`.
 *
 * En realidad esto no supone un esfuerzo de implementación adicional desde el punto de vista de la
 * generación de pasos, puesto que basta con establecer un tipo derivado de `StepComponentProps`
 * como base de los props empleados para el paso a crear, y todas estas propiedades serán pobladas
 * automáticamente simplemente por el hecho de estar en un entorno `Steps`.
 */
export interface StepComponentProps<S> {
  /** Order number of the current step component. */
  order: number;
  /** Title of the current step component. */
  title: string;
  /** Function to move to the next step. */
  next: () => void;
  /** Function to move to the previous step. */
  prev: () => void;
  /** Function to jump to the given step. */
  jump: (step: number) => void;
  /** Function to check if the step is the first. */
  isFirst: () => boolean;
  /** Function to check if the step is the last. */
  isLast: () => boolean;
  /** Function to check if the step has any previous step. */
  hasPrev: () => boolean;
  /** Function to check if the step has any next step. */
  hasNext: () => boolean;
  /** Array of all available steps' title and order number. */
  stepList: StepEntry[];
  /** Combined state value of all steps. */
  state: S;
  /** Function to set/update state by key. */
  setState: React.Dispatch<React.SetStateAction<S>>;
}

/**
 * Por último, se incluye un contexto "de paso", que esencialmente se limita
 * a proporcionar información relativa al orden del paso en la secuencia de pasos.
 * Esto se pasa como contexto por no ensuciar innecesariamente los props de un
 * elemento concreto (ver más adelante cómo se usa en Steps)
 */
interface StepContext {
  order: number;
}

/**
 * Creación del contexto y determinación del valor por defecto del mismo.
 */
const StepContext = createContext<StepContext>({ order: 0 });

/**
 * Wrapper component for each individual step.
 */
function Step<S, T extends StepComponentProps<S>>(
  props: StepProps<S, T> & { stepContext: React.Context<StepsContext<S>> }
) {
  // obtención de la posición en la lista a partir del contexto
  // OJO: Aquí se asume que este contexto existirá por estar el paso
  // incluído dentro de algún `Steps`.
  const { order }: StepContext = useContext(StepContext);
  // obtención de los elementos garantizados en los props
  const { title, component, onStepLoaded, stepContext } = props;
  // obtención del resto del contexto general
  const stepsContextValue: StepsContext<S> = useContext(stepContext);

  // desde el cual se extrae la cuenta para calcular los parámetros de navegación.
  const { stepCount, currentStep } = stepsContextValue;

  // comprobaciones que serán inyectadas como props en el componente de paso
  // y que le servirán para saber su posición en la lista y si tiene más elementos
  // antes o después.
  const isFirst: () => boolean = () => order === 0;
  const isLast: () => boolean = () => order === stepCount;
  const hasNext: () => boolean = () => order < stepCount;
  const hasPrev: () => boolean = () => order > 0;

  // si acabamos de cargar este paso, y hemos especificado una acción a realizar en
  // dicho momento, la ejecutamos.
  useEffect(() => {
    return () => {
      if (currentStep === order && onStepLoaded) onStepLoaded();
    };
  }, [currentStep, order, onStepLoaded]);

  // SÓLO se renderizan aquellos pasos cuyo orden coincida con el paso
  // actual del contexto general.
  if (order === currentStep) {
    const exclusiveProps: ExclusiveStepProps<S, T> = { ...props };

    const defaultTitle = "Step " + order;

    // Forzamos el tipo para calmar al type checker. De esta forma le aseguramos que
    // nunca vamos a tener un componente que tenga más parámetros que los básicos
    // más posiblemente un listado de campos exclusivos.
    const Component = component as ComponentType<
      StepComponentProps<S> & ExclusiveStepProps<S, T>
    >;

    return (
      <Component
        {...exclusiveProps}
        {...stepsContextValue}
        title={title || defaultTitle}
        order={order}
        hasPrev={hasPrev}
        hasNext={hasNext}
        isFirst={isFirst}
        isLast={isLast}
      />
    );
  }
  return null;
}

//--------------------------------------------------------------
//             Definición del Gestor de Pasos
//--------------------------------------------------------------

/**
 * Una vez disponemos de las definiciones de un paso concreto, podemos
 * pasar a definir el gestor general que mantendrá el estado global de
 * los pasos y ejecutará la lógica de carga y descarga de cada uno de ellos.
 */

/**
 * A partir de aquí interesará definir un contexto general que sea accesible
 * a cualquier componente de tipo Step, mediante el que estos puedan consultar
 * los distintos datos del formulario, o desencadenar acciones de consulta/ modificación
 * del estado/ navegación entre pasos. Observamos que una buena parte de las propiedades
 * de esta interfaz están presentes en los pasos individuales, y de hecho estos campos serán
 * utilizados para añadir información general a cada uno de los componentes `<Step>`.
 */

interface StepsContext<S> {
  /** Number of steps available under this context */
  stepCount: number;
  /** Position of the currently active step (the one that will be rendered) */
  currentStep: number;
  /** List of all steps currently included within this context */
  stepList: StepEntry[];
  /** General state to be worked on throughout the different steps in the context */
  state: S;
  /** Function to set/update state by key */
  setState: React.Dispatch<React.SetStateAction<S>>;
  /** Callback describing how to move on to the next step in the sequence */
  next: () => void;
  /** Callback describing how to move back to the previous step in the sequence */
  prev: () => void;
  /** Callback describing how to jump to the given step in the sequence */
  jump: (step: number) => void;
} // StepsContext<S>

/**
 * Con esto es posible crear un contexto (con un valor por defecto
 * para que el comprobador de tipos de TS no lance errores) que podrá
 * ser empleado desde cualquiera de los pasos para acceder a la información
 * del estado de nuestro gestor. Como nota, lo que definimos aquí es el contexto
 * como entidad más o menos abstracta, luego podremos instanciar tantos proveedores
 * de este contexto como deseemos, cada uno con un estado propio particular.
 */
export const generateStepsContext = <S,>() =>
  createContext<StepsContext<S>>({
    // Dummy values for satisfying the type checker
    // Gets updated before being passed down
    stepCount: 0,
    currentStep: 0,
    stepList: [],
    state: {} as S,
    setState: () => ({} as S),
    next: () => {},
    prev: () => {},
    jump: (_) => {},
  }); // StepsContext

/**
 * Al definir los props del gestor de pasos, podemos imponer un tipo determinado
 * para los hijos de este componente mediante el uso de ReactElement<T>. Esencialmente,
 * esto nos permitirá lanzar errores en compilación si alguien trata de añadir un hijo
 * a un componente `<Steps>` que no reciba como props, al menos, un tipo de datos que contenga
 * todos los campos de `StepProps` (se podrían usar tipos más extensos). La unión aquí es necesaria
 * porque React hace distinción entre un hijo suelto y un listado de hijos (un hijo suelto
 * NO es un listado con un elemento).
 *
 * La configuración de los pasos permite especificar cómo queremos que se comporte el gestor,
 * incluyendo además la posibilidad de incorporar componentes exclusivos de navegación, before y
 * after (que van antes y después del cuerpo principal, respectivamente).
 */
export interface StepsProps<S> {
  children:
    | ReactElement<StepProps<S, StepComponentProps<S>>>
    | ReactElement<StepProps<S, StepComponentProps<S>>>[];
  config?: StepsConfig;
  state: S;
  setState: React.Dispatch<React.SetStateAction<S>>;
} // StepsProps<S>

/**
 * Esta configuración incluye básicamente tres elementos fundamentales:
 * + `before`: función que genera un componente de React a partir de unos props (componente funcional)
 * de manera que dicho componente quedará colocado antes de renderizar el contenido del paso activo.
 *
 * + `after`: como before, pero se colocará después del contenido del paso activo.
 *
 * + `navigation`: contiene tanto un componente general de navegación (generalmente para listar los
 * pasos y permitir saltar de uno a otro de forma explícita) como la ubicación relativa al contenido
 * del paso donde deberá colocarse.
 */
export type StepsConfig = {
  before?: (props: any) => JSX.Element;
  after?: (props: any) => JSX.Element;
  navigation?: {
    component: (props: any) => JSX.Element;
    location?: "before" | "after";
  };
}; // StepsConfig

/**
 * Con todo lo anterior, estamos en disposición de pasar a hablar del propio componente
 * de gestión de pasos. Este toma como props la configuración descrita anteriormente y una
 * serie de hijos con tipos restringidos a componentes con props que sabe entender.
 */
/**
 * Wrapper component for `Step` components.
 */
function Steps<S>({
  children,
  config,
  state,
  setState,
  stepContext
}: StepsProps<S> & { stepContext: React.Context<StepsContext<S>> }) {
  // referencia a cada uno de los hijos del componente en formato array
  // esto servirá para poblar la lista de elementos que podrá ser consumida
  // por los pasos individuales a partir del contexto general.
  const childSteps = React.Children.toArray(children);

  const NavigationComponent = (context: StepsContext<S>) => {
    if (config?.navigation?.component) {
      const NavComponent = config?.navigation?.component;
      return <NavComponent {...context} />;
    }
  };

  const BeforeComponent = (context: StepsContext<S>) => {
    if (config?.before) {
      const Before = config.before;
      return <Before {...context} />;
    }
  };

  const AfterComponent = (context: StepsContext<S>) => {
    if (config?.after) {
      const After = config.after;
      return <After {...context} />;
    }
  };

  /**
   * Generar las entradas "cosméticas" de las que hablábamos antes para proporcionar
   * información adicional a los pasos a partir de los hijos del componente.
   */
  const stepList: StepEntry[] = childSteps.map((child, order) => {
    return {
      name:
        (child as { props: StepProps<S, StepComponentProps<S>> }).props.title ||
        "Step " + (order + 1),
      order: order,
    };
  });

  //----------------------------------------------
  //       Creación del Contexto Global
  //----------------------------------------------
  // número de pasos.
  const stepCount = childSteps.length;

  // paso actual (renderizándose en este momento)
  const _currentStep = useState<number>(0);
  const currentStep = _currentStep[0];
  const setCurrentStep = _currentStep[1];

  // gestionar el avance al siguiente paso
  const next: () => void = () => {
    if (currentStep + 1 < stepCount) {
      setCurrentStep(currentStep + 1);
    }
  };

  // gestionar el retroceso al paso previo
  const prev: () => void = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // gestionar un salto a un paso concreto
  const jump: (step: number) => void = (step) => {
    if (step >= 0 && step < stepCount) {
      setCurrentStep(step);
    }
  };

  const context: StepsContext<S> = {
    stepCount,
    currentStep,
    stepList,
    state,
    setState,
    next,
    prev,
    jump,
  };

  return (
    <stepContext.Provider value={context}>
      {config?.before && BeforeComponent(context)}
      {config?.navigation?.location === "before" &&
        NavigationComponent(context)}
      {React.Children.map(children, (child, order) => (
        <StepContext.Provider value={{ order: order }}>
          {child}
        </StepContext.Provider>
      ))}
      {config?.navigation?.location === "after" && NavigationComponent(context)}
      {config?.after && AfterComponent(context)}
    </stepContext.Provider>
  );
} // Steps<S>

export { Steps, Step };

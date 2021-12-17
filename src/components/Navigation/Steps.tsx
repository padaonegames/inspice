/**
 * Gestor de secuencias de pasos, con un estado interno formado por los
 * estados parciales de cada uno de las etapas individuales. 
 * Tomado principalmente de https://github.com/sametweb/react-step-builder/blob/master/src/lib-ts/index.tsx.
 * Esta versión pretende permitir realizar cambios puntuales sobre dicho código
 * para ajustarlo a nuestras necesidades (por ejemplo para modificar de forma más
 * conveniente los tipos de datos de los formularios asociados), y disponer de una 
 * versión "comentada" donde se explique cómo funciona internamente el módulo.
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
  name: string
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
export interface StepProps {
  /** Title of this step */
  title?: string;
  /** Component to be rendered as a step */
  component: ComponentType<StepComponentProps>;
  /** A callback function to run before step change occurs */
  onStepLoaded?: () => void;
};

/**
 * + `StepComponentProps` representa la base mínima de props que deben incluir los componentes
 * que definan un paso `<Step>` dentro de un entorno `<Steps>`. Esto permite imponer una cierta
 * forma y estructura sobre los componentes empleados a modo de pasos. En el siguiente ejemplo:
 * ```javascript
 *  <Step title="My Step" component={MyStepComponent} />
 * ```
 * `MyStepComponent` deberá ser un componente de React que tome como props un tipo o interfaz que 
 * contenga, como mínimo, todos los campos especificados en la definición de `StepComponentProps`.
 */
export interface StepComponentProps {
  /** Order number of the current step component */
  order: number;
  /** Title of the current step component */
  title: string;
  /** Function to move to the next step */
  next: () => void;
  /** Function to move to the previous step */
  prev: () => void;
  /** Function to jump to the given step */
  jump: (step: number) => void;
  /** Function to check if the step is the first */
  isFirst: () => boolean;
  /** Function to check if the step is the last */
  isLast: () => boolean;
  /** Function to check if the step has any previous step*/
  hasPrev: () => boolean;
  /** Function to check if the step has any next step*/
  hasNext: () => boolean;
  /** Array of all available steps' title and order number*/
  stepList: StepEntry[];
  /** Combined state value of all steps */
  state: State;
  /** Function to set/update state by key */
  setState: (key: string, value: unknown) => void;
  /** Function to retrieve a state value by key */
  getState: (key: string, deafultValue: unknown) => unknown;
  /** `onChange` event handler for form elements */
  handleChange: ValueChangedHandler;
};

/**
 * Por último, se incluye un contexto "de paso", que esencialmente se limita
 * a proporcionar información relativa al orden del paso en la secuencia de pasos.
 * Esto se pasa como contexto por no ensuciar innecesariamente los props de un 
 * elemento concreto (ver más adelante cómo se usa en Steps)
 */
interface StepContext {
  order: number;
}

export interface NavigationComponentProps extends StepsContext {
  [name: string]: unknown;
}

/**
 * Creación del contexto y determinación del valor por defecto del mismo.
 */
const StepContext = createContext<StepContext>({ order: 0 });

/**
 * No hay forma de hacer const Step: React.FC<T extends StepProps>, puesto que
 * los componentes funcionales de react sólo admiten tipos no genéricos, pero podemos
 * seguir utilizando una función sin que esto modifique verdaderamente nada.
 */
/**
 * Wrapper component for each individual step.
 */
function Step<T extends StepProps>(props: T) {

  // obtención de la posición en la lista a partir del contexto
  // OJO: Aquí se asume que este contexto existirá por estar el paso
  // incluído dentro de algún `Steps`.
  const { order }: StepContext = useContext(StepContext);
  // obtención de los elementos garantizados en los props
  const { title, component: Component, onStepLoaded } = props;
  // obtención del resto del contexto general
  const stepsContextValue: StepsContext = useContext(StepsContext);

  // desde el cual se extrae la cuenta para calcular los parámetros de navegación.
  const { stepCount, currentStep } = stepsContextValue;

  // comprobaciones que serán inyectadas como props en el componente de paso
  // y que le servirán para saber su posición en la lista y si tiene más elementos
  // antes o después.
  const isFirst: () => boolean = () => order === 1;
  const isLast: () => boolean = () => order === stepCount;
  const hasNext: () => boolean = () => order < stepCount;
  const hasPrev: () => boolean = () => order > 1;

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
    const newProps: Partial<T> = Object.assign({}, props);
    delete newProps.component;

    const defaultTitle = "Step " + order;

    return (
      <Component
        {...newProps}
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
 * 
 * Inicialmente podemos definir eventos (callbacks) a utilizar cuando un campo
 * sea modificado en alguno de los pasos.
 */
/**
 * Definition of an event describing a change within one of the fields
 * of our context state. This is done by specifying the key of the state 
 * to be modified and the new value that was assigned to it in one of the steps.
 */
type ValueChangedEvent = {
  key: string;
  value: unknown;
};

/** General handler type for events that change the current state of our context */
type ValueChangedHandler = (event: ValueChangedEvent) => void;

/**
 * En vez de un estado que sólo permita como valores los tipos clásicos de formularios
 * (strings, números y booleanos), vamos a utilizar el tipo unknown aquí como forma de 
 * tener estados más generales. El tipo `unknown` es la forma explícita de decirle a TS
 * que el valor correspondiente podría ser cualquier cosa (como `any`), pero a diferencia
 * de este último, `unkown` exige un casting explícito a un tipo conocido antes de poder 
 * usarse (lo cual tiende a ser mucho más seguro que llamar a métodos o propiedades de un
 * objeto sobre el que no tenemos nada garantizado, como suele ser el caso con `any`).
 */
/**
 * Definition of a (general) state to be handled by our context.
 * Values are always of type unkown to ensure that we can store anything within a dictionary entry.
 */
type State = {
  [key: string]: unknown;
};

/**
 * A partir de aquí interesará definir un contexto general que sea accesible 
 * a cualquier componente de tipo Step, mediante el que estos puedan consultar
 * los distintos datos del formulario, o desencadenar acciones de consulta/ modificación
 * del estado/ navegación entre pasos. Observamos que una buena parte de las propiedades
 * de esta interfaz están presentes en los pasos individuales, y de hecho estos campos serán
 * utilizados para añadir información general a cada uno de los componentes `<Step>`.
 */

interface StepsContext {
  /** Number of steps available under this context */
  stepCount: number;
  /** Position of the currently active step (the one that will be rendered) */
  currentStep: number;
  /** List of all steps currently included within this context */
  stepList: StepEntry[];
  /** General state to be worked on throughout the different steps in the context */
  state: State;
  /** Function to set/update state by key */
  setState: (key: string, value: unknown) => void;
  /** Function to retrieve a state value by key */
  getState: (key: string, deafultValue: unknown) => unknown;
  /** Callback specifiying how to react to a change in one of the state's values from a step */
  handleChange: ValueChangedHandler;
  /** Callback describing how to move on to the next step in the sequence */
  next: () => void;
  /** Callback describing how to move back to the previous step in the sequence */
  prev: () => void;
  /** Callback describing how to jump to the given step in the sequence */
  jump: (step: number) => void;
}

/**
 * Con esto es posible crear un contexto (con un valor por defecto
 * para que el comprobador de tipos de TS no lance errores) que podrá
 * ser empleado desde cualquiera de los pasos para acceder a la información 
 * del estado de nuestro gestor. Como nota, lo que definimos aquí es el contexto
 * como entidad más o menos abstracta, luego podremos instanciar tantos proveedores
 * de este contexto como deseemos, cada uno con un estado propio particular.
 */
const StepsContext = createContext<StepsContext>({
  // Dummy values for satisfying the type checker
  // Gets updated before being passed down
  stepCount: 0,
  currentStep: 1,
  stepList: [],
  state: {},
  handleChange: (_) => { },
  setState: (_, __) => { },
  getState: (_, __) => "",
  next: () => { },
  prev: () => { },
  jump: (_) => { },
});

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
export interface StepsProps {
  children: ReactElement<StepProps> | ReactElement<StepProps>[];
  config?: StepsConfig;
};

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
 * 
 * Notamos que aquí estamos usando `any` para los props en lugar de `unknown`. TODO: ¿podemos usar otra cosa?
 */
export type StepsConfig = {
  before?: (props: any) => JSX.Element;
  after?: (props: any) => JSX.Element;
  navigation?: {
    component: (props: any) => JSX.Element;
    location?: "before" | "after";
  };
};


/**
 * Con todo lo anterior, estamos en disposición de pasar a hablar del propio componente
 * de gestión de pasos. Este toma como props la configuración descrita anteriormente y una 
 * serie de hijos con tipos restringidos a componentes con props que sabe entender.
 */
/**
 * Wrapper component for `Step` components.
 */
const Steps: React.FC<StepsProps> = ({ children, config }) => {
  // referencia a cada uno de los hijos del componente en formato array
  // esto servirá para poblar la lista de elementos que podrá ser consumida
  // por los pasos individuales a partir del contexto general.
  const childSteps = React.Children.toArray(children);

  const NavigationComponent = (context: NavigationComponentProps) => {
    if (config?.navigation?.component) {
      const NavComponent = config?.navigation?.component;
      return <NavComponent {...context} />;
    }
  };

  const BeforeComponent = (context: NavigationComponentProps) => {
    if (config?.before) {
      const Before = config.before;
      return <Before {...context} />;
    }
  };

  const AfterComponent = (context: NavigationComponentProps) => {
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
        (child as { props: StepProps }).props.title || "Step " + (order + 1),
      order: order + 1,
    };
  });

  //----------------------------------------------
  //       Creación del Contexto Global
  //----------------------------------------------
  // número de pasos.
  const stepCount = childSteps.length;

  // paso actual (renderizándose en este momento)
  const _currentStep = useState<number>(1);
  const currentStep = _currentStep[0];
  const setCurrentStep = _currentStep[1];

  // estado global formado por las partes de cada uno de los estados parciales
  const _stepState = useState<State>({});
  const stepState = _stepState[0];
  const setStepState = _stepState[1];

  // gestionar el avance al siguiente paso
  const next: () => void = () => {
    if (currentStep < stepCount) {
      setCurrentStep(currentStep + 1);
    }
  };

  // gestionar el retroceso al paso previo
  const prev: () => void = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // gestionar un salto a un paso concreto
  const jump: (step: number) => void = (step) => {
    if (step >= 1 && step <= stepCount) {
      setCurrentStep(step);
    }
  };

  // obtener un campo del estado por clave
  const getState: (key: string, deafultValue: unknown) => unknown = (key, defaultValue) => {
    if (key in stepState) {
      return stepState[key];
    }
    return defaultValue;
  };

  // sobrescribir un campo del estado por clave
  const setState: (key: string, value: unknown) => void = (key, value) => {
    const newState = Object.assign({}, stepState);
    newState[key] = value;
    setStepState(newState);
  };

  // gestionar un cambio de valor en una clave
  const handleChange: ValueChangedHandler = (event) => {
    const newState = Object.assign({}, stepState);
    newState[event.key] = event.value;
    setStepState(newState);
  };

  const context = {
    stepCount,
    currentStep,
    stepList,
    state: stepState,
    handleChange,
    setState,
    getState,
    next,
    prev,
    jump,
  };

  return (
    <StepsContext.Provider value={context}>
      {config?.before && BeforeComponent(context)}
      {config?.navigation?.location === "before" &&
        NavigationComponent(context)}
      {React.Children.map(children, (child, order) => (
        <StepContext.Provider value={{ order: order + 1 }}>
          {child}
        </StepContext.Provider>
      ))}
      {config?.navigation?.location === "after" && NavigationComponent(context)}
      {config?.after && AfterComponent(context)}
    </StepsContext.Provider>
  );
}

export { Steps, Step };
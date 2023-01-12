import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";
import StepTitleCard from "../../../components/Forms/Cards/StepTitleCard";
import Header from "../../../components/Layout/Header";
import LoadingOverlay from "../../../components/Layout/LoadingOverlay";
import {
  useLazyCheckSessionNameInUseQuery,
  useLazyCheckUsernameSessionPairForActivityIdQuery,
} from "../../../services/session.api";
import {
  selectSessionUsername,
  selectSessionName,
  selectSessionActivityId,
  setSession,
  SessionState,
} from "../../../store/features/session/sessionSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import EnterSessionStep from "./Steps/EnterSessionStep";
import EnterUsernameStep from "./Steps/EnterUsernameStep";

export const SessionLoginScreen = (): JSX.Element => {
  const { activityId: originActivityId } = useParams();
  // attempt to retrieve default login parameters to perform an auto-login
  const [searchParams] = useSearchParams();
  const pUsername = searchParams.get("username");
  const pSessionName = searchParams.get("sessionName");

  const username = useAppSelector(selectSessionUsername);
  const sessionName = useAppSelector(selectSessionName);
  const activityId = useAppSelector(selectSessionActivityId);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  /** Flag para determinar si se está tratando de recuperar una sesión por medio de
   * los parámetros de la url o por los datos cacheados en localstorage o en la store de redux.
   */
  const [recoveringSession, setRecoveringSession] = useState<boolean>(true);

  const [triggerCheckSession] =
    useLazyCheckUsernameSessionPairForActivityIdQuery();

  useEffect(() => {
    // si no se ha proporcionado un id de actividad, no podemos hacer nada
    if (!originActivityId) {
      // nowhere to go back to, no activity to login to...
      return;
    }

    const attemptSessionRecovery = async () => {
      /**
       * Si disponemos de un id de actividad, usuario y sesión proporcionados por
       * parámetros de búsqueda, podemos intentar hacer uso de ellos para realizar
       * un session login automático.
       */
      if (pUsername && pSessionName) {
        try {
          const isParamsSessionValid = await triggerCheckSession({
            username: pUsername,
            sessionName: pSessionName,
            activityId: originActivityId,
          }).unwrap();

          if (isParamsSessionValid) {
            // Los parámetros que hemos introducido son correctos y la sesión es válida.
            // esto significa que podemos despachar una acción de set sessión con estos
            // datos y redirigir la ruta al destino original.
            dispatch(
              setSession({
                username: pUsername,
                sessionName: pSessionName,
                activityId: originActivityId,
              })
            );
            navigate(location.state, { replace: true });
            return "success";
          }
          // en caso de no ser válido, no es necesario hacer nada (lo mismo ocurre con los errores),
          // ya que a continuación trataremos de conseguir una sesión de la store y, en el peor de los
          // casos, manualmente del usuario.
        } catch {
          // hubo un error a la hora de obtener el resultado del check de sesión por parámetros.
          // por el momento ignoramos el error silenciosamente.
        }
      }

      /**
       * Si resulta que no tenemos estos datos prerrellenados pero podemos extraerlos de
       * la información guardada en el navegador (en este caso se inicializaría por medio
       * de la store de Redux), podemos tratar de realizar un login automático con esos campos.
       * NOTA: Aquí debemos garantizar que la actividad original guardada en la store coincide
       * con el id de actividad a la que queremos acceder ahora, si no sería incoherente.
       */
      if (
        username &&
        sessionName &&
        activityId &&
        activityId === originActivityId
      ) {
        try {
          const isStoreSessionValid = await triggerCheckSession({
            username,
            sessionName,
            activityId,
          }).unwrap();

          if (isStoreSessionValid) {
            // Los datos de sesión almacenados en la store son válidos, por lo que podemos
            // redirigir al usuario al directorio original, sin necesidad esta vez de despachar
            // una acción de set session, al haber utilizado ahora los datos de esa slice directamente.
            navigate(location.state, { replace: true });
            return "success";
          }
          // en caso de no ser válido, no es necesario hacer nada, al igual que ocurría antes.
          // ahora sí que pasaremos a dirigir al usuario al flujo de introducción manual de los datos.
        } catch {
          // hubo un error a la hora de obtener el resultado del check de sesión por store.
          // por el momento ignoramos el error silenciosamente.
        }
      }
      return "failure";
    }; // attemptSessionRecovery

    attemptSessionRecovery().then((res) => {
      // si la función se termina de ejecutar, tenemos dos posibles resultados
      // El primero es que hayamos finalizado con éxito, en cuyo caso no hace falta que hagamos
      // nada más porque en realidad se habrá redirigido al usuario a su destino original.
      // El segundo es que haya sido un fracaso, lo que significa que debemos proceder a mostrar
      // el flujo manual para que el usuario pueda introducir las credenciales por medio de un formulario.
      if (res === "failure") {
        setRecoveringSession(false);
      }
    });
  }, []);

  if (!originActivityId) {
    // nada que hacer, la ruta no es válida porque no sabríamos devolver al usuario
    // a su origen (y tampoco sabemos qué actividad comprobar en el servidor)
    return <Navigate to="/" replace />;
  }

  if (recoveringSession) {
    return <LoadingOverlay message="Attempting to recover session" />;
  }

  /**
   * Si no se pudiera recuperar la sesión por medio de ninguna
   * de las estrategias anteriores, pasamos a mostrar el flujo de login de sesión
   * manual para el usuario.
   */
  return <LoginFlow activityId={originActivityId} />;
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3.5em;
  justify-content: center;
  align-items: center;
`;

interface LoginFlowProps {
  /** id de la actividad a la que deseamos acceder mediante un par usuario - sesión. */
  activityId: string;
}
const LoginFlow = (props: LoginFlowProps): JSX.Element => {
  const { activityId } = props;

  const { t } = useTranslation("inspice");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loginStage, setLoginStage] =
    useState<"enter-session" | "enter-username">("enter-session");

  const [username, setUsername] = useState<string>("");
  const [sessionName, setSessionName] = useState<string>("");
  const [alertMessage, setAlertMessage] =
    useState<string | undefined>(undefined);

  const [
    triggerCheckSessionRequest,
    {
      data: isSessionValid,
      isLoading: checkSessionLoading,
      isSuccess: checkSessionSuccess,
    },
  ] = useLazyCheckUsernameSessionPairForActivityIdQuery();

  const [
    triggerCheckSessionExistsRequest,
    {
      data: sessionExists,
      isLoading: checkSessionExistsLoading,
      isSuccess: checkSessionExistsSuccess,
    },
  ] = useLazyCheckSessionNameInUseQuery();
  // flag para comprobar si la comprobación de existencia de una sesión dada es válida.
  // esto es necesario para el caso en el que el usuario quiere volver a la pantalla de
  // introducir sesión desde la de introducción de usuario (a la que sólo puede llegar
  // si ya se introdujo de forma exitosa un valor de sessionName antes). RTK query no
  // proporciona ningún mecanismo para invalidar de forma manual los resultados de una
  // petición dada, por lo que añadimos este valor como comprobación adicional de si deberíamos
  // fiarnos del resultado almacenado o por el contrario sería necesario repetir la petición.
  const [sessionExistsCheckValid, setSessionExistsCheckValid] =
    useState<boolean>(true);
  // Y lo mismo para el caso de la comprobación de toda la sesión en sí. Esto pretende
  // gestionar el caso en el que se intenta hacer un inicio de sesión pero se falla y
  // luego se vuelve a intentar hacer lo mismo.
  const [sessionCheckValid, setSessionCheckValid] = useState<boolean>(true);

  const handleTriggerCheckSession = async () => {
    try {
      await triggerCheckSessionRequest({
        sessionName,
        activityId,
        username,
      }).unwrap();
      setSessionCheckValid(true);
    } catch {}
  }; // handleTriggerCheckSession

  const handleTriggerSessionExistsCheck = async () => {
    try {
      await triggerCheckSessionExistsRequest({
        sessionName,
        activityId,
      }).unwrap();
      setSessionExistsCheckValid(true);
    } catch {}
  }; // handleTriggerSessionExistsCheck

  const handleReturnToEnterSession = () => {
    setAlertMessage(undefined);
    setLoginStage("enter-session"); // y pasamos a la etapa correspondiente
  }; // handleReturnToEnterSession

  useEffect(() => {
    // éxito recibiendo una respuesta relativa a la sesión en el lado del servidor
    if (
      loginStage === "enter-session" &&
      sessionExistsCheckValid &&
      checkSessionExistsSuccess
    ) {
      // caso 1: no había una sesión con este nombre
      if (!sessionExists) {
        setAlertMessage(
          "Could not find a session with given name. Please check your spelling and try again."
        );
      } else {
        // caso 2: la sesión existía, avanzamos a la siguiente etapa.
        setAlertMessage(undefined);
        setLoginStage("enter-username");
      }
      // en cualquier caso invalidamos el estado actual de la comprobación.
      // esto permite poder detectar nuevas llamadas a la query, tanto como
      // si avanzamos a la siguiente etapa y queremos volver a esta después,
      // como si nos hemos equivocado y nos toca volver a meter otro valor.
      setSessionExistsCheckValid(false);
    }
  }, [
    checkSessionExistsSuccess,
    loginStage,
    sessionExists,
    sessionExistsCheckValid,
  ]);

  useEffect(() => {
    // limpia los mensajes de alerta cada vez que se produzca un cambio
    // en los valores de sesión y nombre de usuario.
    setAlertMessage(undefined);
  }, [sessionName, username]);

  useEffect(() => {
    // éxito recibiendo una respuesta relativa a la sesión en el lado del servidor
    if (
      loginStage === "enter-username" &&
      checkSessionSuccess &&
      sessionCheckValid
    ) {
      // caso 1: no había un usuario con este nombre
      if (!isSessionValid) {
        setAlertMessage(
          "Invalid credentials. Please check your session name and username and try again."
        );
      }
      // caso 2: había un usuario con este nombre, por lo que podemos pasar
      // a almacenar los datos de la sesión en la store y redirigir al usuario a
      // su destino original.
      else {
        dispatch(setSession({ username, sessionName, activityId }));
        navigate(location.state, { replace: true });
      }
      // en cualquier caso invalidamos el estado actual de la comprobación.
      // esto permite poder detectar nuevas llamadas a la query, aunque verdaderamente
      // sólo será útil si las credenciales son incorrectas.
      setSessionCheckValid(false);
    }
  }, [checkSessionSuccess, loginStage, isSessionValid, sessionCheckValid]);

  // se está comprobando si el nombre de sesión es válido, pantalla de carga.
  if (checkSessionExistsLoading) {
    return (
      <LoadingOverlay
        message={`Checking if session with name ${sessionName} exists for activity`}
      />
    );
  }

  // se está comprobando si el nombre de sesión es válido, pantalla de carga.
  if (checkSessionLoading) {
    return <LoadingOverlay message="Checking session credentials" />;
  }

  return (
    <>
      <Header
        sideMenuMode="session-user"
        availableLanguages={["en", "it", "es"]}
      />
      <Root>
        <StepTitleCard
          stepTitle={t("accessActivity")}
          stepDescription={t("accessActivityDescription")}
        >
          {loginStage === "enter-session" && (
            <EnterSessionStep
              sessionName={sessionName}
              onSessionNameChanged={setSessionName}
              alertMessage={alertMessage}
              onNextPressed={handleTriggerSessionExistsCheck}
            />
          )}
          {loginStage === "enter-username" && (
            <EnterUsernameStep
              username={username}
              alertMessage={alertMessage}
              onUsernameChanged={setUsername}
              onBackPressed={handleReturnToEnterSession}
              onTriggerCheckSessionRequest={handleTriggerCheckSession}
            />
          )}
        </StepTitleCard>
      </Root>
    </>
  );
};

export default SessionLoginScreen;

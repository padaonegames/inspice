import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMultistageFormActivityById } from "../../../services/multistageForm/common.api";
import {
  flushResponseBuffer,
  FormResponse,
} from "../../../services/multistageForm/consumption.api";
import {
  MultistageFormActivity,
  SupportedFormResponse,
} from "../../../services/multistageFormActivity.model";
import { RootState } from "../../store";

const initialActivityDefinition: MultistageFormActivity = {
  author: "",
  title: "",
  stages: [],
  _id: "",
  isValid: false,
};

export type FormResponseMap = {
  [formId: string]: SupportedFormResponse;
}; // FormResponseMap

interface MultistageFormConsumptionSliceState {
  /** activity data to be consumed by the user. */
  activityDefinition: MultistageFormActivity;
  /** indexed map of formIds with the respective responses associated to each of them. */
  formResponses: FormResponseMap;
  /** array to buffer the responses applied on the active form before server update batches. */
  responseBuffer: FormResponse[];
  /** currently selected stage. */
  selectedStageId: string | undefined;
} // MultistageFormConsumptionSliceState

const initialState: MultistageFormConsumptionSliceState = {
  activityDefinition: initialActivityDefinition,
  formResponses: {},
  responseBuffer: [],
  selectedStageId: undefined,
};

interface BufferablePayload {
  /** whether to add this response to the response buffer so that it is later sent to the server. */
  bufferAction?: boolean;
}
type BufferablePayloadAction<T> = PayloadAction<T & BufferablePayload>;

/**
 * Adds given response to `state.responseBuffer`, possibly overwriting any other responses that fulfill
 * the conditions encoded by `previousCompare`.
 * @param state State object to whose `responseBuffer` specified response should be added.
 * @param response Response to add to buffer.
 * @param overwritePrevious Whether `previousCompare` should be used to check for previous events, which will then
 * be discarded before adding the new command to the buffer. @default true
 * @param shouldOverwrite Custom check function to be used in order to determine which previous responses should
 * be removed if `overwritePrevious` is set to `true`. Defaults to checking equality in the `formId` field of the response to that of `response`.
 */
const bufferResponse = (
  state: MultistageFormConsumptionSliceState,
  response: FormResponse,
  overwritePrevious: boolean = true,
  shouldOverwrite: (previousResponse: FormResponse) => boolean = (
    previousResponse
  ) => response.formId === previousResponse.formId
) => {
  if (overwritePrevious) {
    // Elimina todas aquellas respuestas que se atengan a nuestra noción de "respuestas previas".
    // esto puede ser la comprobación por defecto por id del formulario, o algo más complejo como comprobar
    // si dos elementos comparten tipo en el payload, por ejemplo.
    state.responseBuffer = state.responseBuffer.filter(
      (c) => !shouldOverwrite(c)
    );
  }
  // añadimos una respuesta nueva con la información proporcionada en el payload.
  state.responseBuffer.push(response);
}; // bufferResponse

const slice = createSlice({
  name: "multistageFormConsumption",
  initialState: initialState,
  reducers: {
    formResponseChanged(
      state,
      {
        payload: { formId, data, bufferAction },
      }: BufferablePayloadAction<FormResponse>
    ) {
      state.formResponses[formId] = data;
      if (!bufferAction) return;
      bufferResponse(state, { formId, data });
    },
    selectedStageIdChanged(
      state,
      { payload: { stageId } }: PayloadAction<{ stageId: string | undefined }>
    ) {
      state.selectedStageId = stageId;
    },
  },
  extraReducers: (builder) => {
    /**
     * `extraReducers` nos permite interceptar los resultados de acciones despachadas
     * en nuestros otros reducers y, en particular, fijarnos en el estado de acciones
     * que dependen directamente de la api. Esto abre las puertas a "suscribirnos" a
     * ciertos estados de peticiones que hayamos realizado y capturar sus resultados
     * para introducirlos en la slice que deba persistirlos de manera local.
     *
     * En este caso concreto, nos va a interesar interceptar el éxito a la hora de obtener
     * una actividad por id de manera que cuando obtengamos una definición desde el servidor
     * actualicemos el estado de esta slice para inicializarlo con dicho valor.
     */
    builder
      .addMatcher(
        getMultistageFormActivityById.matchFulfilled,
        (state, { payload }) => {
          state.activityDefinition = payload;
        }
      )
      .addMatcher(flushResponseBuffer.matchPending, (state, _) => {
        state.responseBuffer = [];
      });
  },
});

export default slice.reducer;

export const { formResponseChanged, selectedStageIdChanged } = slice.actions;

export const selectActivityId = (state: RootState) =>
  state.multistageFormConsumption.activityDefinition._id;
export const selectActivity = (state: RootState) =>
  state.multistageFormConsumption.activityDefinition;
export const selectFormResponses = (state: RootState) =>
  state.multistageFormConsumption.formResponses;
export const selectFormResponseById = (state: RootState, id: string) =>
  state.multistageFormConsumption.formResponses[id];
export const selectFormStagesCompletionStatus = (state: RootState) => {
  return state.multistageFormConsumption.activityDefinition.stages.map(
    (stage) =>
      stage.forms.every(
        (form) => state.multistageFormConsumption.formResponses[form._id]
      )
  );
};
export const selectStageTitles = (state: RootState) =>
  state.multistageFormConsumption.activityDefinition.stages.map(
    (stage) => stage.title
  );
export const selectStageIds = (state: RootState) =>
  state.multistageFormConsumption.activityDefinition.stages.map(
    (stage) => stage._id
  );
export const selectCurrentStage = (state: RootState) =>
  state.multistageFormConsumption.activityDefinition.stages.find(
    (stage) => stage._id === state.multistageFormConsumption.selectedStageId
  );
export const selectCurrentStageId = (state: RootState) =>
  state.multistageFormConsumption.selectedStageId;

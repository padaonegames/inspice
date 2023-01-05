import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMultistageFormActivityById } from "../../../services/multistageForm/common.api";
import {
  ActivityCommand,
  UpdateTitleCommandPayload,
  UpdateDescriptionCommandPayload,
  UpdateAuthorCommandPayload,
  AddNewStageCommandPayload,
  UpdateStageTitleCommandPayload,
  UpdateStageDescriptionCommandPayload,
  RemoveStageCommandPayload,
  DuplicateStageCommandPayload,
  MoveStageCommandPayload,
  AddNewItemToStageCommandPayload,
  MoveStageItemCommandPayload,
  UpdateItemFromStageCommandPayload,
  RemoveItemFromStageCommandPayload,
  DuplicateItemFromStageCommandPayload,
  flushCommandBuffer,
} from "../../../services/multistageForm/creation.api";
import { MultistageFormActivity } from "../../../services/multistageFormActivity.model";
import { RootState } from "../../store";
import {
  addItemToArray,
  duplicateItemFromArrayById,
  moveItemFromArrayById,
  removeItemFromArrayById,
  transformItemFromArrayById,
} from "../../../utils/arrayUtils";

const initialActivityDefinition: MultistageFormActivity = {
  author: "",
  title: "",
  stages: [],
  _id: "",
  isValid: false,
};

interface MultistageFormCreationSliceState {
  /** activity data to be edited by the curator */
  activityDefinition: MultistageFormActivity;
  /** array to buffer the commands applied on the active stage before server update batches */
  commandBuffer: ActivityCommand[];
} // MultistageFormCreationSliceState

const initialState: MultistageFormCreationSliceState = {
  activityDefinition: initialActivityDefinition,
  commandBuffer: [],
};

interface BufferablePayload {
  /** whether to add this action to the command buffer so that it is later sent to the server. */
  bufferAction?: boolean;
}
type BufferablePayloadAction<T> = PayloadAction<T & BufferablePayload>;

/**
 * Adds given command to `state.commandBuffer`, possibly overwriting any other commands that fulfill
 * the conditions encoded by `previousCompare`.
 * @param state State object to whose `commandBuffer` specified command should be added.
 * @param command Command to add to buffer.
 * @param overwritePrevious Whether `previousCompare` should be used to check for previous events, which will then
 * be discarded before adding the new command to the buffer. @default false
 * @param shouldOverwrite Custom check function to be used in order to determine which previous commands should
 * be removed if `overwritePrevious` is set to `true`. Defaults to checking equality in the `type` field of the command to that of `command`.
 */
const bufferCommand = (
  state: MultistageFormCreationSliceState,
  command: ActivityCommand,
  overwritePrevious: boolean = false,
  shouldOverwrite: (previousCommand: ActivityCommand) => boolean = (
    previousCommand
  ) => command.type === previousCommand.type
) => {
  if (overwritePrevious) {
    // Elimina todos aquellos comandos que se atengan a nuestra noción de "comandos previos".
    // esto puede ser la comprobación por defecto por tipo, o algo más complejo como comprobar
    // si dos elementos comparten tipo y parámetros, por ejemplo.
    state.commandBuffer = state.commandBuffer.filter(
      (c) => !shouldOverwrite(c)
    );
  }
  // añadimos un comando nuevo con la información proporcionada en el payload.
  state.commandBuffer.push(command);
}; // bufferCommand

const slice = createSlice({
  name: "multistageFormCreation",
  initialState: initialState,
  reducers: {
    activityChanged(
      state,
      {
        payload: { newState },
      }: PayloadAction<{ newState: MultistageFormActivity }>
    ) {
      state.activityDefinition = newState;
    },
    titleChanged(
      state,
      {
        payload: { title, bufferAction },
      }: BufferablePayloadAction<UpdateTitleCommandPayload>
    ) {
      state.activityDefinition.title = title;

      if (!bufferAction) return;
      bufferCommand(state, { type: "update-title", payload: { title } }, true);
    },
    descriptionChanged(
      state,
      {
        payload: { description, bufferAction },
      }: BufferablePayloadAction<UpdateDescriptionCommandPayload>
    ) {
      state.activityDefinition.description = description;

      if (!bufferAction) return;
      bufferCommand(
        state,
        { type: "update-description", payload: { description } },
        true
      );
    },
    authorChanged(
      state,
      {
        payload: { author, bufferAction },
      }: BufferablePayloadAction<UpdateAuthorCommandPayload>
    ) {
      state.activityDefinition.author = author;

      if (!bufferAction) return;
      bufferCommand(
        state,
        { type: "update-author", payload: { author } },
        true
      );
    },
    stageAdded(
      state,
      {
        payload: { index, stage, bufferAction },
      }: BufferablePayloadAction<AddNewStageCommandPayload>
    ) {
      state.activityDefinition.stages = addItemToArray(
        state.activityDefinition.stages,
        stage,
        index
      );

      if (!bufferAction) return;
      bufferCommand(
        state,
        { type: "add-new-stage", payload: { stage, index } },
        true,
        (c) => c.type === "add-new-stage" && c.payload.stage._id === stage._id
      );
    },
    stageTitleChanged(
      state,
      {
        payload: { stageId, title, bufferAction },
      }: BufferablePayloadAction<UpdateStageTitleCommandPayload>
    ) {
      state.activityDefinition.stages = transformItemFromArrayById(
        state.activityDefinition.stages,
        stageId,
        (stage) => ({ ...stage, title: title })
      );

      if (!bufferAction) return;
      bufferCommand(
        state,
        { type: "update-stage-title", payload: { stageId, title } },
        true,
        (c) => c.type === "update-stage-title" && c.payload.stageId === stageId
      );
    },
    stageDescriptionChanged(
      state,
      {
        payload: { stageId, description, bufferAction },
      }: BufferablePayloadAction<UpdateStageDescriptionCommandPayload>
    ) {
      state.activityDefinition.stages = transformItemFromArrayById(
        state.activityDefinition.stages,
        stageId,
        (stage) => ({ ...stage, description })
      );

      if (!bufferAction) return;
      bufferCommand(
        state,
        { type: "update-stage-description", payload: { stageId, description } },
        true,
        (c) =>
          c.type === "update-stage-description" && c.payload.stageId === stageId
      );
    },
    stageRemoved(
      state,
      {
        payload: { stageId, bufferAction },
      }: BufferablePayloadAction<RemoveStageCommandPayload>
    ) {
      state.activityDefinition.stages = removeItemFromArrayById(
        state.activityDefinition.stages,
        stageId
      );
      if (!bufferAction) return;
      bufferCommand(
        state,
        { type: "remove-stage", payload: { stageId } },
        false
      );
    },
    stageDuplicated(
      state,
      {
        payload: { stageId, bufferAction },
      }: BufferablePayloadAction<DuplicateStageCommandPayload>
    ) {
      state.activityDefinition.stages = duplicateItemFromArrayById(
        state.activityDefinition.stages,
        stageId
      );
      if (!bufferAction) return;
      bufferCommand(
        state,
        { type: "duplicate-stage", payload: { stageId } },
        false
      );
    },
    stagePositionMoved(
      state,
      {
        payload: { stageId, offset, bufferAction },
      }: BufferablePayloadAction<MoveStageCommandPayload>
    ) {
      state.activityDefinition.stages = moveItemFromArrayById(
        state.activityDefinition.stages,
        stageId,
        offset
      );
      if (!bufferAction) return;
      bufferCommand(
        state,
        { type: "move-stage", payload: { stageId, offset } },
        false
      );
    },
    stageItemAdded(
      state,
      {
        payload: { stageId, index, item, bufferAction },
      }: BufferablePayloadAction<AddNewItemToStageCommandPayload>
    ) {
      const stageIndex = state.activityDefinition.stages.findIndex(
        (elem) => elem._id === stageId
      );
      if (stageIndex < 0) return;

      state.activityDefinition.stages[stageIndex].forms = addItemToArray(
        state.activityDefinition.stages[stageIndex].forms,
        item,
        index
      );
      if (!bufferAction) return;
      bufferCommand(
        state,
        {
          type: "add-new-item-to-stage",
          payload: { stageId, item, index },
        },
        true,
        (c) =>
          c.type === "add-new-item-to-stage" &&
          c.payload.stageId === stageId &&
          c.payload.item._id === item._id // no permitir crear dos veces el mismo objeto
      );
    },
    stageItemPositionMoved(
      state,
      {
        payload: { itemId, stageId, offset, bufferAction },
      }: BufferablePayloadAction<MoveStageItemCommandPayload>
    ) {
      const stageIndex = state.activityDefinition.stages.findIndex(
        (elem) => elem._id === stageId
      );
      if (stageIndex < 0) return;
      state.activityDefinition.stages[stageIndex].forms = moveItemFromArrayById(
        state.activityDefinition.stages[stageIndex].forms,
        itemId,
        offset
      );

      if (!bufferAction) return;
      bufferCommand(
        state,
        {
          type: "move-item-from-stage",
          payload: { stageId, itemId, offset },
        },
        false
      );
    },
    stageItemUpdated(
      state,
      {
        payload: { stageId, item, bufferAction },
      }: BufferablePayloadAction<UpdateItemFromStageCommandPayload>
    ) {
      const stageIndex = state.activityDefinition.stages.findIndex(
        (elem) => elem._id === stageId
      );
      if (stageIndex < 0) return;

      state.activityDefinition.stages[stageIndex].forms =
        transformItemFromArrayById(
          state.activityDefinition.stages[stageIndex].forms,
          item._id,
          (_) => item
        );
      if (!bufferAction) return;
      bufferCommand(
        state,
        {
          type: "update-item-from-stage",
          payload: { stageId, item },
        },
        true,
        (c) =>
          c.type === "update-item-from-stage" &&
          c.payload.stageId === stageId &&
          c.payload.item._id === item._id
      );
    },
    stageItemRemoved(
      state,
      {
        payload: { stageId, itemId, bufferAction },
      }: BufferablePayloadAction<RemoveItemFromStageCommandPayload>
    ) {
      const stageIndex = state.activityDefinition.stages.findIndex(
        (elem) => elem._id === stageId
      );
      if (stageIndex < 0) return;

      state.activityDefinition.stages[stageIndex].forms =
        removeItemFromArrayById(
          state.activityDefinition.stages[stageIndex].forms,
          itemId
        );
      if (!bufferAction) return;
      bufferCommand(
        state,
        {
          type: "remove-item-from-stage",
          payload: { stageId, itemId },
        },
        false
      );
    },
    stageItemDuplicated(
      state,
      {
        payload: { stageId, itemId, bufferAction },
      }: BufferablePayloadAction<DuplicateItemFromStageCommandPayload>
    ) {
      const stageIndex = state.activityDefinition.stages.findIndex(
        (elem) => elem._id === stageId
      );
      if (stageIndex < 0) return;

      state.activityDefinition.stages[stageIndex].forms =
        duplicateItemFromArrayById(
          state.activityDefinition.stages[stageIndex].forms,
          itemId
        );
      if (!bufferAction) return;
      bufferCommand(
        state,
        {
          type: "duplicate-item-from-stage",
          payload: { stageId, itemId },
        },
        false
      );
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
      .addMatcher(flushCommandBuffer.matchPending, (state, { payload }) => {
        state.commandBuffer = [];
      });
  },
});

export default slice.reducer;

export const {
  activityChanged,
  titleChanged,
  authorChanged,
  descriptionChanged,
  stageAdded,
  stageDuplicated,
  stageRemoved,
  stagePositionMoved,
  stageItemAdded,
  stageItemDuplicated,
  stageItemRemoved,
  stageTitleChanged,
  stageDescriptionChanged,
  stageItemUpdated,
  stageItemPositionMoved,
} = slice.actions;

export const selectActivityId = (state: RootState) =>
  state.multistageFormCreation.activityDefinition._id;
export const selectTitle = (state: RootState) =>
  state.multistageFormCreation.activityDefinition.title;
export const selectAuthor = (state: RootState) =>
  state.multistageFormCreation.activityDefinition.author;
export const selectDescription = (state: RootState) =>
  state.multistageFormCreation.activityDefinition.description;
export const selectIsBasicInformationCompleted = (state: RootState) => {
  const definition = state.multistageFormCreation.activityDefinition;
  return (
    definition.author !== undefined &&
    definition.author.length > 0 &&
    definition.title !== undefined &&
    definition.title.length > 0
  );
};
export const selectStages = (state: RootState) =>
  state.multistageFormCreation.activityDefinition.stages;
export const selectCommandBuffer = (state: RootState) =>
  state.multistageFormCreation.commandBuffer;

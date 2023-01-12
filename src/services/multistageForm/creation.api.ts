import { api } from "../../store/api/api";
import {
  MultistageFormField,
  MultistageFormStage,
} from "./../multistageFormActivity.model";

export interface UpdateTitleCommandPayload {
  /** new title to be assigned to the activity. */
  title: string;
} // UpdateTitleCommandPayload

export interface UpdateThumbnailSrcCommandPayload {
  /** new thumbnail src to be assigned to the activity. */
  thumbnailSrc?: string;
} // UpdateThumbnailSrcCommandPayload

export interface UpdateDescriptionCommandPayload {
  /** new description to be assigned to the activity. */
  description: string;
} // UpdateDescriptionCommandPayload

export interface UpdateAuthorCommandPayload {
  /** new author to be assigned to the activity. */
  author: string;
} // UpdateAuthorCommandPayload

export interface AddNewStageCommandPayload {
  /** position at which new stage should be inserted. */
  index: number;
  /** object containing the data for the stage that we wish to add to the activity. */
  stage: MultistageFormStage;
} // AddNewStageCommandPayload

export interface UpdateStageTitleCommandPayload {
  /** new title to be assigned to the stage. */
  title: string;
  /** id of the stage for which title should be modified. */
  stageId: string;
} // UpdateStageTitleCommandPayload

export interface UpdateStageDescriptionCommandPayload {
  /** new description to be assigned to the stage. */
  description: string;
  /** id of the stage for which title should be modified. */
  stageId: string;
} // UpdateStageDescriptionCommandPayload

export interface MoveStageCommandPayload {
  /** number of positions that stage should be moved back (if `offset < 0`) or forward (if `offset > 0`). */
  offset: number;
  /** id of the stage that should be moved. */
  stageId: string;
} // MoveStageCommandPayload

export interface RemoveStageCommandPayload {
  /** id of the stage that should be removed. */
  stageId: string;
} // RemoveStageCommandPayload

export interface DuplicateStageCommandPayload {
  /** id of the stage for which title should be duplicated. */
  stageId: string;
} // DuplicateStageCommandPayload

export interface AddNewItemToStageCommandPayload {
  /** position at which new stage should be inserted. */
  index: number;
  /** id of the stage for which a new item should be added. */
  stageId: string;
  /** object containing the data for the item that we wish to add to the stage. */
  item: MultistageFormField;
} // AddNewItemToStageCommandPayload

export interface RemoveItemFromStageCommandPayload {
  /** id of the item which should be removed. */
  itemId: string;
  /** id of the stage from which the item should be removed. */
  stageId: string;
} // RemoveItemFromStageCommandPayload

export interface DuplicateItemFromStageCommandPayload {
  /** id of the item which should be duplicated. */
  itemId: string;
  /** id of the stage from which the item should be duplicated. */
  stageId: string;
} // DuplicateItemFromStageCommandPayload

export interface UpdateItemFromStageCommandPayload {
  /** id of the stage from which the item type should be changed. */
  stageId: string;
  /** object containing the new information for the item. */
  item: MultistageFormField;
} // UpdateItemFromStageCommandPayload

export interface MoveStageItemCommandPayload {
  /** number of positions that item should be moved back (if `offset < 0`) or forward (if `offset > 0`). */
  offset: number;
  /** id of the stage that contains the item that should be moved. */
  stageId: string;
  /** id of the item that should be moved */
  itemId: string;
} // MoveStageItemCommandPayload

export type ActivityCommand =
  | { type: "update-title"; payload: UpdateTitleCommandPayload }
  | { type: "update-thumbnail-src"; payload: UpdateThumbnailSrcCommandPayload }
  | { type: "update-author"; payload: UpdateAuthorCommandPayload }
  | { type: "update-description"; payload: UpdateDescriptionCommandPayload }
  | { type: "add-new-stage"; payload: AddNewStageCommandPayload }
  | { type: "remove-stage"; payload: RemoveStageCommandPayload }
  | { type: "duplicate-stage"; payload: DuplicateStageCommandPayload }
  | { type: "update-stage-title"; payload: UpdateStageTitleCommandPayload }
  | {
      type: "update-stage-description";
      payload: UpdateStageDescriptionCommandPayload;
    }
  | { type: "move-stage"; payload: MoveStageCommandPayload }
  | { type: "add-new-item-to-stage"; payload: AddNewItemToStageCommandPayload }
  | {
      type: "remove-item-from-stage";
      payload: RemoveItemFromStageCommandPayload;
    }
  | {
      type: "duplicate-item-from-stage";
      payload: DuplicateItemFromStageCommandPayload;
    }
  | {
      type: "update-item-from-stage";
      payload: UpdateItemFromStageCommandPayload;
    }
  | { type: "move-item-from-stage"; payload: MoveStageItemCommandPayload };

/**
 * Support API providing the endpoints required to perform operations
 * on a multistage form activity definition during its creation or editing
 * process.
 */
export const multistageFormActivityCreationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /** EXECUTE a given command on the specified activity. */
    executeMultistageFormActivityCommand: builder.mutation<
      any,
      { id: string; command: ActivityCommand }
    >({
      query: ({ id, command }) => ({
        url: `multistage-form/activity/${id}/command`,
        method: "PATCH",
        body: command,
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    /** FLUSH command buffer, sending all buffered commands to the server against activity with given id */
    flushCommandBuffer: builder.mutation<
      any,
      { id: string; commands: ActivityCommand[] }
    >({
      query: ({ id, commands }) => ({
        url: `multistage-form/activity/${id}/commands`,
        method: "PATCH",
        body: commands,
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
  }),
}); // multistageFormActivityCreationApi

export const {
  useExecuteMultistageFormActivityCommandMutation,
  useFlushCommandBufferMutation,
} = multistageFormActivityCreationApi;

export const { flushCommandBuffer } =
  multistageFormActivityCreationApi.endpoints;

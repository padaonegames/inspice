import { api } from "../../store/api/api";
import { FormResponseMap } from "../../store/features/multistageForm/multistageFormConsumptionSlice";
import { SupportedFormResponse } from "./../multistageFormActivity.model";

export interface FormResponse {
  /** _id of the form for which this object provides a response. */
  formId: string;
  /** object containing both the type and the payload for this form's response. */
  data: SupportedFormResponse;
} // FormResponse

export interface MultistageFormUserResponse {
  answers: FormResponseMap;
  userId: string;
  activityId: string;
  sessionName: string;
} // MultistageFormUserResponse

/**
 * Support API providing the endpoints required to submit drafts and responses
 * over a multistage form activity definition during its consumption.
 */
export const multistageFormActivityConsumptionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /** FLUSH response buffer, sending all buffered response drafts to the server against activity with given id */
    flushResponseBuffer: builder.mutation<
      any,
      { id: string; responses: FormResponse[] }
    >({
      query: ({ id, responses }) => ({
        url: `multistage-form/activity/${id}/responses`,
        method: "PATCH",
        body: responses,
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    submitUserResponseToActivity: builder.mutation<
      any,
      {
        /** _id of the activity to which responses are being submitted. */
        id: string;
        /** structure mapping item _id's from forms in given activity to user responses to those forms. */
        responses: FormResponseMap;
      }
    >({
      query: ({ id, responses }) => ({
        url: `multistage-form/activity/${id}/responses`,
        method: "POST",
        body: responses,
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    /** GET all activity definitions. */
    getMultistageFormResponsesToActivity: builder.query<
      MultistageFormUserResponse[],
      string
    >({
      query: (id) => ({
        url: `multistage-form/activity/${id}/responses`,
        method: "GET",
      }),
    }),
  }),
}); // multistageFormActivityConsumptionApi

export const {
  useFlushResponseBufferMutation,
  useSubmitUserResponseToActivityMutation,
  useGetMultistageFormResponsesToActivityQuery,
} = multistageFormActivityConsumptionApi;

export const resetMultistageFormActivityConsumptionApiState =
  multistageFormActivityConsumptionApi.util.resetApiState;

export const { flushResponseBuffer, submitUserResponseToActivity } =
  multistageFormActivityConsumptionApi.endpoints;

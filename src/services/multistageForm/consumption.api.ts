import { api } from "../../store/api/api";
import { SupportedFormResponse } from "./../multistageFormActivity.model";

export interface FormResponse {
  /** _id of the form for which this object provides a response. */
  formId: string;
  /** object containing both the type and the payload for this form's response. */
  data: SupportedFormResponse;
} // FormResponse

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
  }),
}); // multistageFormActivityConsumptionApi

export const { useFlushResponseBufferMutation } =
  multistageFormActivityConsumptionApi;

export const { flushResponseBuffer } =
  multistageFormActivityConsumptionApi.endpoints;

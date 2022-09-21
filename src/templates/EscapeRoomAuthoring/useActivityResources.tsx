import { useState } from 'react';
import { escapeRoomService } from '../../services';
import { ResourceDefinition } from '../../services/escapeRoomActivity.model';
import { ApiResult } from '../../services/escapeRoomActivity.service';
import { useAsyncRequest } from "../../services/useAsyncRequest";

/**
 * Representation of a Promise state machine.
 * A request is set to idle if hook was declared with the triggerOnStart
 * parameter set to false, and will remain in that state until triggerRequest
 * is called on the hook's consumer side.
 */
export type AsyncProgress<ResultType = any, ErrorType = any> =
  | { kind: 'idle' }
  | { kind: 'running' }
  | { kind: 'success', result: ResultType }
  | { kind: 'failure', reason: ErrorType }
  ;

export interface UseActivityResourcesHookData {
  availableResources: ResourceDefinition[];
  refreshAvailableResources: () => void;
  setResourceToUpload: (resource: File) => void;
  resourceUploadStatus: AsyncProgress<ApiResult<{
    name: string;
  }>, unknown>;
  setResourceToRemove: (resourceName: string) => void;
  resourceRemovalStatus: AsyncProgress<ApiResult<void>>,
} // UseActivityResourcesHookData

/**
 * Helper React Hook to wrap around the process of running an async function and
 * switching based on whether it's running, has succeeded, or has failed.
 *
 * @param activityId id of the activity whose resources will be accessed by this hook
 */
export function useActivityResources(
  activityId: string,
): UseActivityResourcesHookData {

  const [resourceToUpload, setResourceToUpload] = useState<File | undefined>(undefined);
  const [resourceToRemove, setResourceToRemove] = useState<string | undefined>(undefined);

  const fetchActivityResources = async () => {
    return await escapeRoomService.getResourcesByEscapeRoomActivityId(activityId);
  }; // fetchActivityResources

  const uploadResourceToActivity = async () => {
    if (!resourceToUpload) return Promise.reject();
    return await escapeRoomService.uploadResourceToEscapeRoomActivityWithId(resourceToUpload, activityId);
  }; // uploadResourceToActivity

  const removeResourceFromActivity = async () => {
    if (!resourceToRemove) return Promise.reject();
    return await escapeRoomService.removeResourceFromEscapeRoomActivityWithId(resourceToRemove, activityId);
  }; // removeResourceFromActivity

  const [fetchActivityResourcesStatus, triggerFetchActivityResources] = useAsyncRequest(fetchActivityResources, []);
  const [uploadResourceToActivityStatus] = useAsyncRequest(uploadResourceToActivity, [resourceToUpload]);
  const [removeResourceFromActivityStatus] = useAsyncRequest(removeResourceFromActivity, [resourceToRemove]);

  const availableResourcesNames: string[] =
    fetchActivityResourcesStatus.kind === 'success' && fetchActivityResourcesStatus.result.kind === 'ok' ?
      fetchActivityResourcesStatus.result.data : [];

  const availableResources: ResourceDefinition[] = availableResourcesNames.map(res => (
    {
      src: escapeRoomService.activityResourceSource(res, activityId),
      name: res
    }));

  return {
    availableResources: availableResources,
    refreshAvailableResources: triggerFetchActivityResources,
    setResourceToUpload: setResourceToUpload,
    resourceUploadStatus: uploadResourceToActivityStatus,
    setResourceToRemove: setResourceToRemove,
    resourceRemovalStatus: removeResourceFromActivityStatus
  };
}; // useActivityResources
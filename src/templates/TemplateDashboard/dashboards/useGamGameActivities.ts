import { useState } from "react";
import { gamGameApi } from "../../../services";
import { useAsyncRequest } from "../../../services/useAsyncRequest";

export function useGamGameActivities() {
  const [activityToDelete, setActivityToDelete] =
    useState<string | undefined>(undefined);
  const fetchGamGameActivities = async () => {
    return gamGameApi.getGamGameActivityDefinitions();
  }; // fetchGamGameActivities

  const deleteActivity = async () => {
    if (!activityToDelete) return;
    const res = await gamGameApi.deleteGamGameActivityDefinitionById(
      activityToDelete
    );
    setActivityToDelete(undefined);
    triggerFetchGamGameActivities();
    return res;
  }; // deleteActivity

  const [fetchGamGameActivitiesRequest, triggerFetchGamGameActivities] =
    useAsyncRequest(fetchGamGameActivities, []);
  const [deleteActivityRequest] = useAsyncRequest(
    deleteActivity,
    [activityToDelete],
    false
  );

  const data =
    fetchGamGameActivitiesRequest.kind === "success" &&
    fetchGamGameActivitiesRequest.result.kind === "ok"
      ? fetchGamGameActivitiesRequest.result.data
      : undefined;

  const isLoading = fetchGamGameActivitiesRequest.kind === "running";
  const isError = fetchGamGameActivitiesRequest.kind === "failure";

  return { data, isLoading, isError };
} // useMultistageFormActivities

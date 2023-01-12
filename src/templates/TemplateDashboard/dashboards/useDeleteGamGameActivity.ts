import { useState } from "react";
import { gamGameApi } from "../../../services";
import { useAsyncRequest } from "../../../services/useAsyncRequest";

export function useDeleteGamGameActivity(onActivityDeleted?: () => void) {
  const [activityToDelete, setActivityToDelete] =
    useState<string | undefined>(undefined);

  const deleteActivity = async () => {
    if (!activityToDelete) return;
    const res = await gamGameApi.deleteGamGameActivityDefinitionById(
      activityToDelete
    );
    setActivityToDelete(undefined);
    if (onActivityDeleted) onActivityDeleted();
    return res;
  }; // deleteActivity

  const [deleteActivityRequest] = useAsyncRequest(
    deleteActivity,
    [activityToDelete],
    false
  );

  return [
    (activityId: string) => setActivityToDelete(activityId),
    {
      isLoading: deleteActivityRequest.kind === "running",
      isSuccess: deleteActivityRequest.kind === "success",
      isError: deleteActivityRequest.kind === "failure",
    },
  ];
} // useMultistageFormActivities

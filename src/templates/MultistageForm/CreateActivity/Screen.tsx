import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import ActivityInstanceBasicInfoStep from "./Steps/ActivityInstanceBasicInfoStep";
import DefineMultistageFormStep from "./Steps/DefineMultistageFormStep";
import LoadingOverlay from "../../../components/Layout/LoadingOverlay";
import { Navigate, useParams } from "react-router-dom";
import ActivityCreationStageManager from "../../../components/Navigation/ActivityCreationStageManager";
import { useAppSelector } from "../../../store/hooks";
import {
  selectActivityId,
  selectCommandBuffer,
  selectIsBasicInformationCompleted,
} from "../../../store/features/multistageForm/multistageFormCreationSlice";
import { debounce } from "lodash";
import { useRequestNewMultistageFormActivityMutation, useGetMultistageFormActivityByIdQuery } from "../../../services/multistageForm/common.api";
import { useFlushCommandBufferMutation } from "../../../services/multistageForm/creation.api";

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

//-------------------------------------------------------
//                 State Definition
//-------------------------------------------------------

export const GenerateNewMultistageFormActivityScreen = () => {
  const [requestNewActivity, result] =
    useRequestNewMultistageFormActivityMutation();

  useEffect(() => {
    // lanza una petición de creación de una nueva actividad al inicio
    // del ciclo de vida del componente.
    requestNewActivity();
  }, []);

  if (result.isLoading) {
    return (
      <LoadingOverlay message="Generating new escape room activity definition" />
    );
  }

  if (result.isError || !result.isSuccess) {
    return (
      <LoadingOverlay message="There was a problem while generating a new escape room activity definition" />
    );
  }

  const activityDefinition = result.data;
  return (
    <Navigate
      to={`/multistage-form/curator/create/${activityDefinition._id}`}
    />
  );
}; // GenerateNewMultistageFormActivityScreen

// Fetch initial Multistage Form activity definition by path id from server
export const EditMultistageFormActivityScreen = (): JSX.Element => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetMultistageFormActivityByIdQuery(
    id ?? ""
  );

  if (isLoading) {
    return (
      <LoadingOverlay message="Fetching multistage form activity definition from database" />
    );
  }

  if (error || !data) {
    return (
      <LoadingOverlay message="There was a problem while fetching the multistage activity definition with given id" />
    );
  }

  return <CreateMultistageFormScreenComponent />;
}; // EditMultistageFormActivityScreen

//-------------------------------------------------------
//                 Multistage Form Creation
//-------------------------------------------------------

export const CreateMultistageFormScreenComponent = (): JSX.Element => {
  const isBasicInformationCompleted = useAppSelector(
    selectIsBasicInformationCompleted
  );
  const commandBuffer = useAppSelector(selectCommandBuffer);
  const activityId = useAppSelector(selectActivityId);

  const [selectedStage, setSelectedStage] = useState<number>(0);
  const [flushCommandBuffer, flushBufferResult] =
    useFlushCommandBufferMutation();

  const debouncedFlushCommandBuffer = useCallback(
    debounce(flushCommandBuffer, 1000),
    []
  );

  useEffect(() => {
    if (commandBuffer.length === 0) return;
    debouncedFlushCommandBuffer({ id: activityId, commands: commandBuffer });
  }, [commandBuffer, debouncedFlushCommandBuffer]);

  return (
    <Root>
      <ActivityCreationStageManager
        stages={[
          {
            name: "Basic Information".toUpperCase(),
            completed: isBasicInformationCompleted,
          },
          { name: "Edit Stages".toUpperCase(), completed: true },
        ]}
        currentStage={selectedStage}
        onStageSelected={(s) => setSelectedStage(s)}
      />
      {selectedStage === 0 && <ActivityInstanceBasicInfoStep />}
      {selectedStage === 1 && <DefineMultistageFormStep />}
    </Root>
  );
}; // CreateMultistageFormActivityScreenComponent

export default CreateMultistageFormScreenComponent;

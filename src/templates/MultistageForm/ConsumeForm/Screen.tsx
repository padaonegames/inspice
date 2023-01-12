import styled from "styled-components";

// navigation

// steps
import LoadingOverlay from "../../../components/Layout/LoadingOverlay";
import { useParams } from "react-router-dom";
import ActivityCreationStageManager from "../../../components/Navigation/ActivityCreationStageManager";
import { useGetMultistageFormActivityByIdQuery } from "../../../services/multistageForm/common.api";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectActivityId,
  selectCurrentStageId,
  selectedStageIdChanged,
  selectFormResponses,
  selectFormStagesCompletionStatus,
  selectStageIds,
  selectStageTitles,
} from "../../../store/features/multistageForm/multistageFormConsumptionSlice";
import ConsumeMultistageFormStageStep from "./Steps/ConsumeFormStageStep";
import { useSubmitUserResponseToActivityMutation } from "../../../services/multistageForm/consumption.api";

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

//-------------------------------------------------------
//                 State Definition
//-------------------------------------------------------

// Fetch initial Multistage Form activity definition by path id from server
export const ConsumeMultistageFormScreen = (): JSX.Element => {
  const { activityId } = useParams();

  const { data, error, isLoading } = useGetMultistageFormActivityByIdQuery(
    activityId ?? ""
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

  return <ConsumeMultistageFormScreenComponent />;
}; // ConsumeMultistageFormScreen

//-------------------------------------------------------
//              Multistage Form Consumption
//-------------------------------------------------------

export const ConsumeMultistageFormScreenComponent = (): JSX.Element => {
  const activityId = useAppSelector(selectActivityId);
  const stagesCompletionStatus = useAppSelector(
    selectFormStagesCompletionStatus
  );
  const stageTitles = useAppSelector(selectStageTitles);
  const stageIds = useAppSelector(selectStageIds);
  const selectedStageId = useAppSelector(selectCurrentStageId);
  const formResponses = useAppSelector(selectFormResponses);

  const dispatch = useAppDispatch();

  const [triggerSubmitForm, { data, isLoading, isSuccess }] =
    useSubmitUserResponseToActivityMutation();

  const handleStageSelected = (stageIndex: number) => {
    if (stageIndex < 0 || stageIndex >= stageIds.length) return;
    dispatch(selectedStageIdChanged({ stageId: stageIds[stageIndex] }));
  }; // handleStageSelected

  const handleSubmitForm = () => {
    if (!stagesCompletionStatus.every((elem) => elem)) {
      return;
    }

    triggerSubmitForm({ id: activityId, responses: formResponses });
  }; // handleSubmitForm

  const selectedStageIndex = stageIds.findIndex((id) => id === selectedStageId);

  if (isLoading) {
    return <LoadingOverlay message="Submitting form" />;
  }

  return (
    <Root>
      <ActivityCreationStageManager
        stages={stageTitles.map((title, i) => ({
          name:
            title?.toLocaleUpperCase() ?? `Stage ${i + 1}`.toLocaleUpperCase(),
          completed: stagesCompletionStatus[i],
        }))}
        currentStage={selectedStageIndex}
        onStageSelected={handleStageSelected}
        finaItemCaption={"SUBMIT FORM"}
        onSubmitActivity={handleSubmitForm}
      />
      <ConsumeMultistageFormStageStep />
    </Root>
  );
}; // ConsumeMultistageFormActivityScreenComponent

export default ConsumeMultistageFormScreen;

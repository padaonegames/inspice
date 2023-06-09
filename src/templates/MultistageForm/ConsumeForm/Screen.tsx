import styled from "styled-components";

// navigation

// steps
import LoadingOverlay from "../../../components/Layout/LoadingOverlay";
import { useParams } from "react-router-dom";
import { useGetMultistageFormActivityByIdQuery } from "../../../services/multistageForm/common.api";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  formResponseChanged,
  selectActivityId,
  selectFormResponses,
  selectFormStagesCompletionStatus,
  selectStageById,
  selectStageIds,
} from "../../../store/features/multistageForm/multistageFormConsumptionSlice";
import ConsumeMultistageFormStageStep, {
  fieldMappings,
} from "./Steps/ConsumeFormStageStep";
import {
  FormResponse,
  useSubmitUserResponseToActivityMutation,
} from "../../../services/multistageForm/consumption.api";
import { useEffect, useState } from "react";
import {
  selectDescription,
  selectTitle,
} from "../../../store/features/multistageForm/multistageFormCreationSlice";
import { selectSessionUsername } from "../../../store/features/session/sessionSlice";
import { NavigationButton } from "../../../components/Forms/Cards/cardStyles";
import FormCard from "../../../components/Forms/Cards/FormCard";
import StepTitleCard from "../../../components/Forms/Cards/StepTitleCard";

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavigationButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4.5vh;
  justify-content: center;
  align-items: center;

  position: relative;
  width: auto;
`;

const FormSubmittedCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4.5vh;
  justify-content: center;
  align-items: center;

  position: relative;
  width: auto;
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
  const username = useAppSelector(selectSessionUsername);

  const activityId = useAppSelector(selectActivityId);
  const activityTitle = useAppSelector(selectTitle);
  const activityDescription = useAppSelector(selectDescription);
  const stageIds = useAppSelector(selectStageIds);
  const formResponses = useAppSelector(selectFormResponses);

  const dispatch = useAppDispatch();

  const [triggerSubmitForm, { data, isLoading, isSuccess }] =
    useSubmitUserResponseToActivityMutation();

  const [status, setStatus] =
    useState<"form-consumption" | "form-submitted">("form-consumption");

  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);

  const [requiredAlerts, setRequiredAlerts] = useState<boolean>(false);

  const selectedStage = useAppSelector(
    selectStageById(stageIds[currentStageIndex])
  );

  useEffect(() => {
    if (isSuccess && data) {
      setStatus("form-submitted");
    }
  }, [data, isSuccess]);

  const handleSelectNextStage = () => {
    const nextValue = currentStageIndex + 1;
    if (nextValue < 0 || nextValue >= stageIds.length || !selectedStage) return;

    // comprobar primero si todos los elementos de la sección actual son válidos
    // antes de avanzar a la siguiente fase. Si no lo fueran, lanzar las alarmas
    // hasta que el usuario
    selectedStage.forms.every((form) => {
      const mapping = fieldMappings[form.fieldData.type];
      /*
      .isFieldResponseEmpty(
        form.fieldData.payload as any,
        formResponses[form._id] as any
      )
      */
    });
    setCurrentStageIndex(nextValue);
  }; // handleSelectNextStage

  const handleSelectPreviousStage = () => {
    const nextValue = currentStageIndex - 1;
    if (nextValue < 0 || nextValue >= stageIds.length) return;
    setCurrentStageIndex(nextValue);
  }; // handleSelectPreviousStage

  const handleFormResponseChanged = (response: FormResponse) => {
    dispatch(formResponseChanged({ bufferAction: true, ...response }));
  }; // handleFormResponseChanged

  const handleSubmitForm = () => {
    triggerSubmitForm({ id: activityId, responses: formResponses });
  }; // handleSubmitForm

  if (isLoading) {
    return <LoadingOverlay message="Submitting form" />;
  }

  if (!selectedStage || !username) {
    return <>No stage selected</>;
  }

  return (
    <Root>
      {status === "form-consumption" && (
        <>
          <ConsumeMultistageFormStageStep
            stageData={selectedStage}
            title={activityTitle}
            description={
              currentStageIndex === 0
                ? activityDescription ?? ""
                : `Username code: ${username}.`
            }
            formResponses={formResponses}
            onFormResponseChanged={handleFormResponseChanged}
            displayRequiredAlerts={requiredAlerts}
          />
          <NavigationButtonsContainer>
            <FormCard showCardBackground={false} childrenLayout="row">
              {currentStageIndex - 1 >= 0 && (
                <NavigationButton onClick={handleSelectPreviousStage}>
                  Back
                </NavigationButton>
              )}
              {currentStageIndex + 1 < stageIds.length && (
                <NavigationButton onClick={handleSelectNextStage}>
                  Next
                </NavigationButton>
              )}
              {currentStageIndex + 1 === stageIds.length && (
                <NavigationButton
                  onClick={handleSubmitForm}
                  colorMode="primary"
                >
                  Submit response
                </NavigationButton>
              )}
            </FormCard>
          </NavigationButtonsContainer>
        </>
      )}

      {status === "form-submitted" && (
        <FormSubmittedCardContainer>
          <StepTitleCard
            stepDescription="Your response has been registered."
            stepTitle={activityTitle}
          >
            <NavigationButton
              onClick={() => window.location.reload()}
              colorMode="primary"
            >
              Send another response
            </NavigationButton>
          </StepTitleCard>
        </FormSubmittedCardContainer>
      )}
    </Root>
  );
}; // ConsumeMultistageFormActivityScreenComponent

export default ConsumeMultistageFormScreen;

/*
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
*/

import styled from "styled-components";

// navigation

// steps
import LoadingOverlay from "../../../components/Layout/LoadingOverlay";
import { useParams } from "react-router-dom";
import { useGetMultistageFormActivityByIdQuery } from "../../../services/multistageForm/common.api";
import {
  MultistageFormUserResponse,
  resetMultistageFormActivityConsumptionApiState,
  useGetMultistageFormResponsesToActivityQuery,
} from "../../../services/multistageForm/consumption.api";
import { useEffect, useState } from "react";
import { MultistageFormActivity } from "../../../services/multistageFormActivity.model";
import StepTitleCard from "../../../components/Forms/Cards/StepTitleCard";
import React from "react";
import { ConsumableFieldCard } from "../ConsumeForm/components/ConsumableFieldCard";
import { fieldMappings } from "../ConsumeForm/Steps/ConsumeFormStageStep";
import NumberInputCard from "../../../components/Forms/Cards/NumberInputCard";
import { useAppDispatch } from "../../../store/hooks";

const Root = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ResponsesContainer = styled.div`
  padding-top: 10px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  position: relative;
`;

//-------------------------------------------------------
//                 State Definition
//-------------------------------------------------------

// Fetch initial Multistage Form activity definition by path id from server
export const ViewMultistageFormResponsesScreen = (): JSX.Element => {
  const { activityId } = useParams();
  const dispatch = useAppDispatch();

  const {
    data: activityDefinition,
    error: activityDefinitionError,
    isLoading: activityDefinitionLoading,
  } = useGetMultistageFormActivityByIdQuery(activityId ?? "");

  const {
    data: userResponses,
    error: userResponsesError,
    isLoading: userResponsesLoading,
  } = useGetMultistageFormResponsesToActivityQuery(activityId ?? "");

  useEffect(() => {
    return () => {
      dispatch(resetMultistageFormActivityConsumptionApiState());
    };
  }, []);

  if (activityDefinitionLoading) {
    return (
      <LoadingOverlay message="Fetching multistage form activity definition from database" />
    );
  }

  if (activityDefinitionError || !activityDefinition) {
    return (
      <LoadingOverlay message="There was a problem while fetching the multistage activity definition with given id" />
    );
  }

  if (userResponsesLoading) {
    return (
      <LoadingOverlay message="Fetching user responses to form from database" />
    );
  }

  if (userResponsesError || !userResponses) {
    return (
      <LoadingOverlay message="There was a problem while fetching user responses from the database" />
    );
  }

  return (
    <ViewMultistageFormResponsesScreenComponent
      userResponses={userResponses}
      activityDefinition={activityDefinition}
    />
  );
}; // ViewMultistageFormResponsesScreen

//-------------------------------------------------------
//              Multistage Form View Responses
//-------------------------------------------------------

interface ViewMultistageFormResponsesScreenComponentProps {
  activityDefinition: MultistageFormActivity;
  userResponses: MultistageFormUserResponse[];
} // ViewMultistageFormResponsesScreenComponentProps
export const ViewMultistageFormResponsesScreenComponent = (
  props: ViewMultistageFormResponsesScreenComponentProps
): JSX.Element => {
  const { activityDefinition, userResponses } = props;

  const [selectedResponseIndex, setSelectedResponseIndex] = useState<number>(1);
  const selectedResponse = userResponses[selectedResponseIndex - 1].answers;

  const handleSelectedResponseChanged = (nextValue: number) => {
    if (nextValue < 1 || nextValue > userResponses.length) return;
    setSelectedResponseIndex(nextValue);
  }; //handleSelectedResponseChanged

  return (
    <Root>
      <ResponsesContainer>
        <NumberInputCard
          promptText={`${userResponses.length} responses`}
          fieldPayload={{
            units: `of ${userResponses.length}`,
            minValue: 1,
            maxValue: userResponses.length,
          }}
          response={{ number: selectedResponseIndex }}
          width={0.125}
          onResponseChanged={(res) => handleSelectedResponseChanged(res.number)}
        />
        {activityDefinition.stages.map((stage) => (
          <>
            <StepTitleCard
              key={`title-${stage._id}`}
              stepTitle={stage.title ?? `Stage`}
              stepDescription={stage.description}
            />
            {stage.forms.map((form) => (
              <React.Fragment key={form._id}>
                <ConsumableFieldCard
                  fieldMappings={fieldMappings}
                  formDefinition={form}
                  response={selectedResponse[form._id]?.response}
                  disabled
                />
              </React.Fragment>
            ))}
          </>
        ))}
      </ResponsesContainer>
    </Root>
  );
}; // ViewMultistageFormResponsesActivityScreenComponent

export default ViewMultistageFormResponsesScreen;

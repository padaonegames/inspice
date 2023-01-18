import MultipleChoiceCard from "../../../../components/Forms/Cards/MultipleChoiceCard";
import ShortTextInputCard from "../../../../components/Forms/Cards/ShortTextInputCard";
import {
  MultistageFormStage,
  SupportedFormField,
  SupportedFormResponse,
} from "../../../../services/multistageFormActivity.model";
import CheckBoxGroupInputCard from "../../../../components/Forms/Cards/CheckBoxGroupInputCard";
import LongTextInputCard from "../../../../components/Forms/Cards/LongTextInputCard";

import styled from "styled-components";
import CalendarInputCard from "../../../../components/Forms/Cards/CalendarInputCard";
import DisplayImageCard from "../../../../components/Forms/Cards/DisplayImageCard";
import DisplayVideoCard from "../../../../components/Forms/Cards/DisplayVideoCard";
import DisplayTextCard from "../../../../components/Forms/Cards/DisplayTextCard";
import LikertScaleInputCard from "../../../../components/Forms/Cards/LikertScaleInputCard";
import {
  ConsumableFieldCard,
  FieldResponseMappings,
} from "../components/ConsumableFieldCard";
import HighLightTextCard from "../../../../components/Forms/Cards/HighLightTextCard";
import StepTitleCard from "../../../../components/Forms/Cards/StepTitleCard";
import React from "react";
import {
  FormResponseMap,
} from "../../../../store/features/multistageForm/multistageFormConsumptionSlice";
import { FormResponse } from "../../../../services/multistageForm/consumption.api";

const StageRoot = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4.5vh;
  justify-content: center;
  align-items: center;

  position: relative;
  width: auto;
`;

export const TitleColor = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 8px 8px 0 0;
  background-color: #c44c49;
`;

export const Separator = styled.div`
  width: 100%;
  height: 25px;
  // background-color:rgb(255,0,0);
`;

export const fieldMappings: FieldResponseMappings<
  SupportedFormField,
  SupportedFormResponse
> = {
  "short-text": {
    consumptionComponentProducer: ShortTextInputCard,
    defaultFieldResponse: { text: "" },
    isFieldResponseValid: (_, res) => res.text.length > 0,
  },
  "long-text": {
    consumptionComponentProducer: LongTextInputCard,
    defaultFieldResponse: { text: "" },
    isFieldResponseValid: (_, res) => res.text.length > 0,
  },
  "multiple-choice": {
    consumptionComponentProducer: MultipleChoiceCard,
    defaultFieldResponse: { selectedResponses: [] },
    isFieldResponseValid: (form, res) =>
      res.selectedResponses.length > 0 &&
      (!form.maxAnswers || res.selectedResponses.length < form.maxAnswers),
  },
  checkbox: {
    consumptionComponentProducer: CheckBoxGroupInputCard,
    defaultFieldResponse: { selectedFields: [] },
    isFieldResponseValid: (_, res) => res.selectedFields.length > 0,
  },
  calendar: {
    consumptionComponentProducer: CalendarInputCard,
    defaultFieldResponse: { date: new Date() },
    isFieldResponseValid: (_, res) => !!res.date,
  },
  "display-image": {
    consumptionComponentProducer: DisplayImageCard,
    defaultFieldResponse: {},
  },
  "display-video": {
    consumptionComponentProducer: DisplayVideoCard,
    defaultFieldResponse: {},
    isFieldResponseValid: (_, __) => true,
  },
  "display-text": {
    consumptionComponentProducer: DisplayTextCard,
    defaultFieldResponse: {},
    isFieldResponseValid: (_, __) => true,
  },
  "likert-scale": {
    consumptionComponentProducer: LikertScaleInputCard,
    defaultFieldResponse: { responses: {} },
    isFieldResponseValid: (form, res) =>
      form.questions.every((_, ind) => res.responses[ind] !== undefined),
  },
  "highlight-text": {
    consumptionComponentProducer: HighLightTextCard,
    defaultFieldResponse: { highlightedTexts: [] },
    isFieldResponseValid: (_, res) => res.highlightedTexts.length > 0,
  },
}; // fieldMappings

interface ConsumeMultistageFormStageStepProps {
  title: string;
  description: string;
  stageData: MultistageFormStage;
  formResponses: FormResponseMap;
  onFormResponseChanged?: (response: FormResponse) => void;
  displayRequiredAlerts: boolean;
}
export const ConsumeMultistageFormStageStep = (
  props: ConsumeMultistageFormStageStepProps
): JSX.Element => {
  const {
    title,
    description,
    stageData,
    formResponses,
    onFormResponseChanged,
    displayRequiredAlerts,
  } = props;

  const handleResponseChanged = (
    formId: string,
    response: SupportedFormResponse
  ) => {
    if (!onFormResponseChanged) return;
    onFormResponseChanged({ formId, data: response });
  }; // handleResponseChanged

  return (
    <StageRoot>
      <StepTitleCard stepTitle={title} stepDescription={description} />
      <StepTitleCard
        stepTitle={stageData.title ?? `Stage`}
        stepDescription={stageData.description}
      />
      {stageData.forms.map((form) => (
        <React.Fragment key={form._id}>
          <ConsumableFieldCard
            fieldMappings={fieldMappings}
            formDefinition={form}
            response={formResponses[form._id]?.response}
            requiredAlert={displayRequiredAlerts}
            onUserResponseChanged={(res) =>
              handleResponseChanged(form._id, {
                response: res,
                type: form.fieldData.type,
              } as any)
            }
          />
        </React.Fragment>
      ))}
    </StageRoot>
  );
};

export default ConsumeMultistageFormStageStep;

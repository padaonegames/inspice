import MultipleChoiceCard from "../../../../components/Forms/Cards/MultipleChoiceCard";
import ShortTextInputCard from "../../../../components/Forms/Cards/ShortTextInputCard";
import { StepComponentProps } from "../../../../components/Navigation/TypedSteps";
import {
  AvailableMultistageFormFieldType,
  ConsumableFieldProps,
  MultistageFormResponses,
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
import { cloneDeep } from "lodash";
import {
  ConsumableFieldCard,
  FormFieldMappings,
} from "../components/ConsumableFieldCard";
import { useEffect, useState } from "react";
import HighLightTextCard from "../../../../components/Forms/Cards/HighLightTextCard";

const Root = styled.div`
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

export const fieldMappings: FormFieldMappings<
  SupportedFormField,
  SupportedFormResponse
> = {
  checkbox: {
    consumptionComponentProducer: CheckBoxGroupInputCard,
    defaultResponse: { selectedFields: [] },
  },
  "short-text": {
    consumptionComponentProducer: ShortTextInputCard,
    defaultResponse: { text: "" },
  },
  "long-text": {
    consumptionComponentProducer: LongTextInputCard,
    defaultResponse: { text: "" },
  },
  "multiple-choice": {
    consumptionComponentProducer: MultipleChoiceCard,
    defaultResponse: { selectedResponses: [] },
  },
  calendar: {
    consumptionComponentProducer: CalendarInputCard,
    defaultResponse: { date: new Date() },
  },
  "display-image": {
    consumptionComponentProducer: DisplayImageCard,
    defaultResponse: {},
  },
  "display-video": {
    consumptionComponentProducer: DisplayVideoCard,
    defaultResponse: {},
  },
  "display-text": {
    consumptionComponentProducer: DisplayTextCard,
    defaultResponse: {},
  },
  "likert-scale": {
    consumptionComponentProducer: LikertScaleInputCard,
    defaultResponse: {
      responses: [],
    },
  },
  "highlight-text": {
    consumptionComponentProducer: HighLightTextCard,
    defaultResponse: { highlightedTexts: [] },
  },
}; // fieldMappings

export interface ConsumeMultistageFormStageStepProps
  extends StepComponentProps<MultistageFormResponses> {
  stageDefinition: MultistageFormStage;
} // ConsumeMultistageFormStageStepProps

export const ConsumeMultistageFormStageStep = (
  props: ConsumeMultistageFormStageStepProps
): JSX.Element => {
  const { state: responses, setState: setResponses, stageDefinition } = props;

  return (
    <Root>
      {stageDefinition.forms.map((form, index) => (
        <>
          {index > 0 && <Separator key={`s${form._id}`} />}
          <ConsumableFieldCard
            key={form._id}
            fieldMappings={fieldMappings}
            formDefinition={form}
            initialUserResponses={responses}
            onUserResponsesChanged={setResponses}
          />
        </>
      ))}
    </Root>
  );
};

export default ConsumeMultistageFormStageStep;

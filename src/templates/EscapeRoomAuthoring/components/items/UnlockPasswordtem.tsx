import {
  EditableItemProps,
  UnlockPasswordItemDefinition,
} from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";

import styled from "styled-components";
import { Root } from "./generalItemsStyles";
import LongTextInputCard from "../../../../components/Forms/Cards/LongTextInputCard";
import { UpArrow } from "@styled-icons/boxicons-solid/UpArrow";
import { DownArrow } from "@styled-icons/boxicons-solid/DownArrow";
import { DotsTwoVertical } from "@styled-icons/entypo/DotsTwoVertical";
import { NumericLockCard } from "../cards/NumericLockCard";
import CheckBoxGroupInputCard from "../../../../components/Forms/Cards/CheckBoxGroupInputCard";

interface InputAreaProps {
  width?: string;
  height?: string;
  dimBackground?: boolean;
}
export const InputArea = styled.textarea<InputAreaProps>`
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  width: ${(props) => props.width ?? "100%"};
  height: ${(props) => props.height ?? "6em"};
  margin-top: 10px;
  color: ${(props) => props.theme.textColor};
  border: none;
  outline: none;
  padding: 0.65em;
  background-color: ${(props) =>
    props.dimBackground ? "#f8f9fa" : "transparent"};
  resize: none;
  overflow-y: hidden;

  text-align: center;

  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  &:focus {
    box-shadow: #c44c49 0px -4px 0px 0px inset;
  }
`;

export const EditableUnlockPasswordItemContent = (
  props: EditableItemProps<UnlockPasswordItemDefinition>
): JSX.Element => {
  const { payload, onPayloadChanged } = props;

  const {
    description,
    password,
    hoursEnabled,
    wrongAnswerFeedback = "",
  } = payload;

  const handleEditDescription = (value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      description: value,
    });
  }; // handleEditDescription

  const handleEditFeedback = (value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      wrongAnswerFeedback: value,
    });
  }; // handleEditFeedback

  const handleEditPassword = (value: number[]) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      password: value,
    });
  }; // handleEditPassword

  const handleEditHoursEnabled = (value: boolean) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      hoursEnabled: value,
    });
  }; // handleEditHoursEnabled

  const hoursEnabledKey = "Display this lock in hour format (XX:XX)";

  return (
    <Root>
      {/* Desctiption that is going to be shown on this puzzle */}
      <LongTextInputCard
        promptText="Enter a prompt for the user before attempting to enter the password:"
        fieldPayload={{ placeholder: "Start typing your prompt" }}
        response={{ text: description }}
        onResponseChanged={(res) => handleEditDescription(res.text)}
        required
      />
      <NumericLockCard
        promptText="Enter a numeric password for this stage:"
        response={{ password }}
        fieldPayload={{ hoursEnabled }}
        onResponseChanged={(res) => handleEditPassword(res.password)}
        required
      />
      <LongTextInputCard
        promptText="Enter some feedback for the user after introducing a WRONG password:"
        fieldPayload={{ placeholder: "Start typing your feedback" }}
        response={{ text: wrongAnswerFeedback }}
        onResponseChanged={(res) => handleEditFeedback(res.text)}
        required
      />
      <CheckBoxGroupInputCard
        promptText="Additional settings:"
        fieldPayload={{ fields: [hoursEnabledKey] }}
        response={{
          selectedFields: hoursEnabled ? [hoursEnabledKey] : [],
        }}
        onResponseChanged={(value) =>
          handleEditHoursEnabled(value.selectedFields.includes(hoursEnabledKey))
        }
      />
    </Root>
  );
}; // EditableUnlockPasswordItemContent

const PreviewBody = styled.div`
  width: 100%;
  height: 100%;
`;
const PreviewBodyUpperArrows = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const PreviewBodyNumbers = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const PreviewNumber = styled.div`
  font-size: 2em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  text-align: center;
  color: rgb(0, 0, 0);
  height: 100%;
  width: 20%;
`;

const UppArrowIconPreview = styled(UpArrow)`
  color: rgb(0, 0, 0);
  height: 100%;
  width: 20%;
`;
const DownArrowIconPreview = styled(DownArrow)`
  color: rgb(0, 0, 0);
  height: 100%;
  width: 20%;
`;
const DotsTwoVerticalIconPreview = styled(DotsTwoVertical)`
  color: rgb(0, 0, 0);
  height: 100%;
  width: 10%;
`;

export const UnlockPasswordItemStageSlide = (
  props: UnlockPasswordItemDefinition
): JSX.Element => {
  const { password, hoursEnabled } = props;

  return (
    <PreviewBody>
      <PreviewBodyUpperArrows>
        <UppArrowIconPreview />
        <UppArrowIconPreview />
        {hoursEnabled && <DotsTwoVerticalIconPreview opacity={0} />}
        <UppArrowIconPreview />
        <UppArrowIconPreview />
      </PreviewBodyUpperArrows>

      <PreviewBodyNumbers>
        <PreviewNumber>{password[0]}</PreviewNumber>
        <PreviewNumber>{password[1]}</PreviewNumber>
        {hoursEnabled && <DotsTwoVerticalIconPreview />}
        <PreviewNumber>{password[2]}</PreviewNumber>
        <PreviewNumber>{password[3]}</PreviewNumber>
      </PreviewBodyNumbers>

      <PreviewBodyUpperArrows>
        <DownArrowIconPreview />
        <DownArrowIconPreview />
        {hoursEnabled && <DotsTwoVerticalIconPreview opacity={0} />}
        <DownArrowIconPreview />
        <DownArrowIconPreview />
      </PreviewBodyUpperArrows>
    </PreviewBody>
  );
}; // narrativeItemStageSlide

export const unlockPasswordItemFactory: AbstractActivityItemFactory<UnlockPasswordItemDefinition> =
  {
    editingComponent: (editingProps) => (
      <EditableUnlockPasswordItemContent {...editingProps} />
    ),
    defaultDefinition: {
      password: [0, 0, 0, 0],
      description: "",
      hoursEnabled: false,
    },
  }; // narrativeItemFactory

export default EditableUnlockPasswordItemContent;

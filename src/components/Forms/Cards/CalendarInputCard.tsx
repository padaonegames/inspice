import { useEffect, useState } from "react";
import { EditableFieldProps } from "../../../services/multistageFormActivity.model";
import {
  InputSegment,
  DateContainer,
  InputSegmentWrapper,
  InputSegmentTag,
  DateSlash,
  Root,
} from "./cardStyles";
import FormCard from "./FormCard";
import { AbstractFormFactory } from "./FormFactory";

export interface CalendarInputCardProps {
  /** Prompt for the user to fill in this field */
  promptText?: string;
  /** Whether this field should always be filled in by the user */
  required?: boolean;
  onChange?: (date: Date | undefined) => void;
  /** Callback to notify the parent when the enter key is pressed while the component is focused. */
  onEnterPress?: () => void;
  /** Default date that will be shown on the loading page before the user inserts any date. */
  initialDate?: Date | undefined;
  /* True if user tried to submit the form without filling a required field */
  requiredAlert?: boolean;
} // CalendarInputCardProps

export const CalendarInputCard = (
  props: CalendarInputCardProps
): JSX.Element => {
  const {
    promptText = "",
    requiredAlert,
    required,
    initialDate,
    onChange,
    onEnterPress,
  } = props;

  const [day, setDay] = useState(initialDate?.getDate());
  const [month, setMonth] = useState(initialDate?.getMonth());
  const [year, setYear] = useState(initialDate?.getFullYear());

  const isValidDate = () => {
    if (day === undefined || month === undefined || year === undefined)
      return false;
    const date = new Date(`${month}/${day}/${year}`);
    return date instanceof Date && !isNaN(date.valueOf());
  }; // isValidDate

  useEffect(() => {
    const date =
      isValidDate() &&
      !(day === undefined || month === undefined || year === undefined)
        ? new Date(`${month}/${day}/${year}`)
        : undefined;
    if (onChange) onChange(date);
  }, [day, month, year]); // useEffect

  return (
    <FormCard
      promptText={promptText}
      required={required}
      requiredAlert={requiredAlert || !isValidDate()}
      alertMessage={!isValidDate() ? "Invalid date." : undefined}
    >
      <DateContainer>
        <InputSegmentWrapper>
          <InputSegmentTag>DD</InputSegmentTag>
          <InputSegment
            type="text"
            numCharacters={2}
            maxLength={2}
            value={day || ""}
            onChange={(event) => setDay(parseInt(event.target.value))}
          />
        </InputSegmentWrapper>
        <DateSlash>/</DateSlash>
        <InputSegmentWrapper>
          <InputSegmentTag>MM</InputSegmentTag>
          <InputSegment
            type="text"
            numCharacters={2}
            maxLength={2}
            value={month || ""}
            onChange={(event) => setMonth(parseInt(event.target.value))}
          />
        </InputSegmentWrapper>
        <DateSlash>/</DateSlash>
        <InputSegmentWrapper>
          <InputSegmentTag>YYYY</InputSegmentTag>
          <InputSegment
            type="text"
            numCharacters={4}
            maxLength={4}
            value={year || ""}
            onChange={(event) => setYear(parseInt(event.target.value))}
          />
        </InputSegmentWrapper>
      </DateContainer>
    </FormCard>
  );
}; // CalendarInputCard

export interface EditableCalendarContentProps extends EditableFieldProps<{}> {} // EditableShortTextContentProps

export const EditableCalendarContent = (
  _: EditableCalendarContentProps
): JSX.Element => {
  return (
    <Root>
      <DateContainer>
        <InputSegmentWrapper>
          <InputSegmentTag>DD</InputSegmentTag>
          <InputSegment
            disabled
            type="text"
            numCharacters={2}
            maxLength={2}
            value={""}
          />
        </InputSegmentWrapper>
        <DateSlash>/</DateSlash>
        <InputSegmentWrapper>
          <InputSegmentTag>MM</InputSegmentTag>
          <InputSegment
            disabled
            type="text"
            numCharacters={2}
            maxLength={2}
            value={""}
          />
        </InputSegmentWrapper>
        <DateSlash>/</DateSlash>
        <InputSegmentWrapper>
          <InputSegmentTag>YYYY</InputSegmentTag>
          <InputSegment
            disabled
            type="text"
            numCharacters={4}
            maxLength={4}
            value={""}
          />
        </InputSegmentWrapper>
      </DateContainer>
    </Root>
  );
}; // EditableCalendarContent

export const calendarInputCardFactory: AbstractFormFactory<{}> = {
  userFormComponent: (useFormPayload: CalendarInputCardProps) => (
    <CalendarInputCard {...useFormPayload} />
  ),
  formEditingComponent: (editingFormProps: EditableCalendarContentProps) => (
    <EditableCalendarContent {...editingFormProps} />
  ),
  defaultFormDefinition: {},
}; // calendarInputCardFactory

export default CalendarInputCard;

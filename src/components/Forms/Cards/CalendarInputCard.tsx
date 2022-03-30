import { useEffect, useState } from "react";
import {
  Root,
  CardPanel,
  PromptText,
  RequiredAsterisk,
  RequiredQuestionSpan,
  RequiredAlertIcon,
  InputSegment,
  DateContainer,
  InputSegmentWrapper,
  InputSegmentTag,
  DateSlash
} from "./cardStyles";

export interface CalendarInputCardProps {
  /** Text rendered on top of the component as a 
   * prompt for the user, indicating what date they should choose. 
   */
  promptText: string;
  /** Callback to notify the parent when the value of the input field has changed.*/
  onChange?: (date: Date | undefined) => void;
  /** Callback to notify the parent when the enter key is pressed while the component is focused. */
  onEnterPress?: () => void;
  /** Default date that will be shown on the loading page before the user inserts any date. */
  initialDate?: Date | undefined;
  /** Whether this field is considered required within the overall form (used to display an asterisk). */
  required?: boolean;
  /* True if user tried to submit the form without filling a required field */
  requiredAlert?: boolean;
}

export const CalendarInputCard = (props: CalendarInputCardProps): JSX.Element => {

  const {
    promptText,
    requiredAlert,
    required,
    initialDate,
    onChange,
    onEnterPress
  } = props;

  const [day, setDay] = useState(initialDate?.getDate());
  const [month, setMonth] = useState(initialDate?.getMonth());
  const [year, setYear] = useState(initialDate?.getFullYear());

  const isValidDate = () => {
    const date = new Date(`${month}/${day}/${year}`);
    return date instanceof Date && !isNaN(date.valueOf());
  };

  useEffect(() => {
    const date = isValidDate() ? new Date(`${month}/${day}/${year}`) : undefined;
    console.log(date)
    if (onChange)
      onChange(date);
  }, [day, month, year]);

  return (
    <Root>
      <CardPanel requiredAlert={requiredAlert || !isValidDate()}>
        <PromptText>
          {promptText}{required && <RequiredAsterisk> *</RequiredAsterisk>}
        </PromptText>
        <DateContainer>
          <InputSegmentWrapper>
            <InputSegmentTag>DD</InputSegmentTag>
            <InputSegment
              type='text'
              numCharacters={2}
              maxLength={2}
              value={day || ''}
              onChange={event => setDay(parseInt(event.target.value))}
            />
          </InputSegmentWrapper>
          <DateSlash>/</DateSlash>
          <InputSegmentWrapper>
            <InputSegmentTag>MM</InputSegmentTag>
            <InputSegment
              type='text'
              numCharacters={2}
              maxLength={2}
              value={month || ''}
              onChange={event => setMonth(parseInt(event.target.value))}
            />
          </InputSegmentWrapper>
          <DateSlash>/</DateSlash>
          <InputSegmentWrapper>
            <InputSegmentTag>YYYY</InputSegmentTag>
            <InputSegment
              type='text'
              numCharacters={4}
              maxLength={4}
              value={year || ''}
              onChange={event => setYear(parseInt(event.target.value))}
            />
          </InputSegmentWrapper>
        </DateContainer>
        {requiredAlert && (
          <RequiredQuestionSpan>
            <RequiredAlertIcon /> This question is required.
          </RequiredQuestionSpan>
        )}
        {!requiredAlert && !isValidDate() && (
          <RequiredQuestionSpan>
            <RequiredAlertIcon /> Invalid date.
          </RequiredQuestionSpan>
        )}
      </CardPanel>
    </Root>
  );
};

export default CalendarInputCard;
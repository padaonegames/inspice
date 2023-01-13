import {
  CalendarResponseDefinition,
  ConsumableFieldProps,
} from "../../../services/multistageFormActivity.model";
import {
  InputSegment,
  DateContainer,
  InputSegmentWrapper,
  InputSegmentTag,
  DateSlash,
  Root,
} from "./cardStyles";
import { EditableFieldProps } from "./EditableFieldCard";
import FormCard from "./FormCard";

export interface CalendarInputCardProps
  extends ConsumableFieldProps<{}, CalendarResponseDefinition> {
  /** Callback to notify the parent when the enter key is pressed while the component is focused. */
  onEnterPress?: () => void;
} // CalendarInputCardProps

export const CalendarInputCard = (
  props: CalendarInputCardProps
): JSX.Element => {
  const { response, onResponseChanged, onEnterPress, ...formProps } = props;

  const { date } = response;
  const [day, month, year] = [
    date?.getDate(),
    date?.getMonth(),
    date?.getFullYear(),
  ];

  const isValidDate = () => {
    if (day === undefined || month === undefined || year === undefined)
      return false;
    const date = new Date(`${month}/${day}/${year}`);
    return date instanceof Date && !isNaN(date.valueOf());
  }; // isValidDate

  const handleDayChanged = (day: number) => {
    handleDateChanged(day, month, year);
  }; // handleDayChanged

  const handleMonthChanged = (month: number) => {
    handleDateChanged(day, month, year);
  }; // handleDayChanged

  const handleYearChanged = (year: number) => {
    handleDateChanged(day, month, year);
  }; // handleDayChanged

  const handleDateChanged = (
    day: number | undefined,
    month: number | undefined,
    year: number | undefined
  ) => {
    if (!onResponseChanged) return;
    const newDate =
      isValidDate() &&
      !(day === undefined || month === undefined || year === undefined)
        ? new Date(`${month}/${day}/${year}`)
        : undefined;
    onResponseChanged({ date: newDate });
  }; // handleDateChanged

  return (
    <FormCard
      {...formProps}
      requiredAlert={formProps.requiredAlert || !isValidDate()}
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
            onChange={(event) => handleDayChanged(parseInt(event.target.value))}
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
            onChange={(event) =>
              handleMonthChanged(parseInt(event.target.value))
            }
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
            onChange={(event) =>
              handleYearChanged(parseInt(event.target.value))
            }
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

export default CalendarInputCard;

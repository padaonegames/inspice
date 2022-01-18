import DayPicker, { DateUtils, Modifier, Modifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import styled from 'styled-components';
import './DateStyles.css';

const Root = styled.div`
  position: relative;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  width: 95%;

  @media (max-width: 768px) {
    max-width: 375px;
  }

  @media (min-width: 768px) {
    max-width: 585px;
  }
`;

const PanelContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: white;
  box-shadow: 0 0 1px 3px #efefef;
  letter-spacing: +1px;
  font-family: Raleway;
  width: 100%;
`;

const FieldNameSpan = styled.h3`
  align-self: center;
  font-weight: 700;
  letter-spacing: +0.5px;
  font-family: Raleway;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }

  @media (min-width: 768px) {
    font-size: 1.1em;
  }
`;

const ResetButton = styled.button`
  background-color: transparent;
  color: ${props => props.theme.clickableTextFontColor};
  text-decoration: underline;
  cursor: pointer;
  top: 0;
  right: 2px;
  position: absolute;
  font-size: 0.85em;
  letter-spacing: +0.5px;
  font-family: Raleway;
  text-align: center;
  &:hover{
    font-weight: 700;
  }
`;

const RangeText = styled.p`
  margin: auto;
  font-size: 0.85em;
  letter-spacing: +0.5px;
  font-family: Raleway;
  text-align: center;
  line-height: 3.5vh;
  b {
    font-weight: 700;
  }
`;

const weekday = new Array(7);
weekday[0] = 'Sunday';
weekday[1] = 'Monday';
weekday[2] = 'Tuesday';
weekday[3] = 'Wednesday';
weekday[4] = 'Thursday';
weekday[5] = 'Friday';
weekday[6] = 'Saturday';

const month = new Array(12);
month[0] = 'January';
month[1] = 'February';
month[2] = 'March';
month[3] = 'April';
month[4] = 'May';
month[5] = 'June';
month[6] = 'July';
month[7] = 'August';
month[8] = 'September';
month[9] = 'October';
month[10] = 'November';
month[11] = 'December';

export interface SelectDatePanelProps {
  onFromSelected?: (from: Date | undefined | null) => void;
  onToSelected?: (to: Date | undefined | null) => void;
  from: Date | undefined | null;
  to: Date | undefined | null;
};

/**
 * <img src="media://SelectDatePanel.PNG" alt="SelectDatePanel">
 */
export const SelectDatePanel = (props: SelectDatePanelProps) => {

  const { onFromSelected, onToSelected, from, to } = props;

  const handleResetClick = () => {
    if (onFromSelected) onFromSelected(undefined);
    if (onToSelected) onToSelected(undefined);
  };

  const handleDayClick = (day: Date) => {
    const newRange = DateUtils.addDayToRange(day, { from: from, to: to });
    if (onFromSelected) onFromSelected(newRange.from);
    if (onToSelected) onToSelected(newRange.to);
  };

  const modifiers = { start: from, end: to };
  const range = { from: from, to: to };

  return (
    <Root>
      <FieldNameSpan>
        {'Choose a date range'.toUpperCase()}
        {from && to && (
          <ResetButton onClick={handleResetClick}>
            Reset
          </ResetButton>
        )}
      </FieldNameSpan>
      <PanelContainer>
        <DayPicker
          className='Selectable'
          numberOfMonths={2}
          selectedDays={[from as Modifier, range]}
          modifiers={modifiers as Partial<Modifiers>}
          onDayClick={(day: Date) => handleDayClick(day)}
        />
      </PanelContainer>
      {from && to && (
        <>
          <RangeText>
            From <b>{weekday[from.getDay()]} {from.getDate()}</b>, {month[from.getMonth()]} {from.getFullYear()}
          </RangeText>
          <RangeText>
            to <b>{weekday[to.getDay()]} {to.getDate()}</b>, {month[to.getMonth()]} {to.getFullYear()}
          </RangeText>
        </>
      )}
    </Root>
  );
}

export default SelectDatePanel;
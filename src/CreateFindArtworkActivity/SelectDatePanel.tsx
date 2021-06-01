import { useState } from 'react';
import DayPicker, { DateUtils, Modifier, Modifiers, RangeModifier } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import './DateStyles.css';

const PanelContainer = styled.div`
  align-self: center;
  font-size: 0.9em;
  letter-spacing: +1px;
  font-family: Raleway;
`;

const TextContainer = styled.div`
  border-radius: 5px 0px 0px 5px;
  padding-left: 2%;
  padding-right: 3%;
  align-self: center;
  align-text: center;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FieldNameSpan = styled.span`
  margin-top: 2.5%;
  margin-bottom: 2.5%;
  font-size: 1em;
  font-weight: 500;
  letter-spacing: +0.5px;
  font-family: Raleway;
  color: black;
`;

const ResetButton = styled.button`
  align-self: right;
`;

interface SelectDatePanelProps {
  onRangeSelected: (from: Date | undefined, to: Date | undefined) => void;
  initialFrom?: Date;
  initialTo?: Date;
};

const SelectDatePanel: React.FC<SelectDatePanelProps> = ({
  onRangeSelected,
  initialFrom,
  initialTo
}) => {

  const { t, i18n } = useTranslation('app');
  const [range, setRange] = useState<RangeModifier>({ from: initialFrom, to: initialTo });

  const handleResetClick = () => {
    setRange({ from: initialFrom, to: initialTo });
    onRangeSelected(initialFrom, initialTo);
  };

  const handleDayClick = (day: Date) => {
    const newRange = DateUtils.addDayToRange(day, range);
    setRange(newRange);
    if (newRange.from && newRange.to) {
      onRangeSelected(newRange.from, newRange.to);
    }
  };

  const { from, to } = range;
  const modifiers = { start: from, end: to };

  return (
    <PanelContainer>
      <TextContainer>
        <FieldNameSpan>
          {!from && !to && 'Please select the date on which your activity should become available.'}
          {from && !to && 'Please select the last day on which the activity should be be available.'}
          {from &&
            to &&
            `Your activity will be available from ${from.toLocaleDateString()} to
            ${to.toLocaleDateString()}.`}{' '}
          {from && to && (
            <ResetButton onClick={handleResetClick}>
              Reset
            </ResetButton>
          )}
        </FieldNameSpan>
      </TextContainer>

      <DayPicker
        className='Selectable'
        numberOfMonths={2}
        selectedDays={[from as Modifier, range]}
        modifiers={modifiers as Partial<Modifiers>}
        onDayClick={(day: Date) => handleDayClick(day)}
      />
    </PanelContainer>
  );
}

export default SelectDatePanel;
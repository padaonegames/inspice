import React from 'react';
import styled from 'styled-components';
import SelectDatePanel from '../CreateFindArtworkActivity/SelectDatePanel';
import TextInputFieldWithTag from '../components/TextInputFieldWithTag';

const HorizontalSeparator = styled.div<{ size: number }>`
  width: 1px;
  height: 52.5vh;
  margin-left: ${props => props.size}vw;
  margin-right: ${props => props.size}vw;
  border: solid 1px;
  border-color: DimGrey;
`;

const VerticalSpace = styled.div<{ size: number }>`
  width: 1px;
  height: ${props => props.size}vh;
`;

const Root = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 4.5vh;
  justify-content: center;
`;

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vw;
  align-items: center;
  justify-content: center;
`;

interface SetTitleAuthorDatesStageProps {
  handleDateRangeSelected: (from: Date | undefined, to: Date | undefined) => void;
  onTitleChange: (title: string) => void;
  onAuthorChange: (author: string) => void;
  initialTitle?: string;
  initialAuthor?: string;
  initialFrom?: Date;
  initialTo?: Date;
};

const SetTitleAuthorDatesStage: React.FC<SetTitleAuthorDatesStageProps> = ({
  handleDateRangeSelected,
  onAuthorChange,
  onTitleChange,
  initialAuthor,
  initialTitle,
  initialFrom,
  initialTo,
}) => {
  return (
    <Root>
      <FieldsContainer>
        <TextInputFieldWithTag
          initialValue={initialTitle}
          placeholder='Activity name...'
          fieldName='Specify a name for your activity:'
          onChange={(val) => onTitleChange(val)}
        />
        <VerticalSpace size={5} />
        <TextInputFieldWithTag
          initialValue={initialAuthor}
          placeholder='Activity author...'
          fieldName={`Specify the activity's author:`}
          onChange={(val) => onAuthorChange(val)}
        />
      </FieldsContainer>
      <HorizontalSeparator size={2} />
      <SelectDatePanel
        onRangeSelected={(from, to) => handleDateRangeSelected(from, to)}
        initialFrom={initialFrom}
        initialTo={initialTo}
      />
    </Root>
  );
}

export default SetTitleAuthorDatesStage;
import React from 'react';
import styled from 'styled-components';
import SelectDatePanel from '../CreateFindArtworkActivity/SelectDatePanel';
import TextInputFieldWithTag from '../components/TextInputFieldWithTag';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4.5vh;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.h2`
  align-self: center;
  color: #3f3c2d;
  letter-spacing: +0.5px;
  font-family: Raleway;
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
      <TitleText>Basic Information</TitleText>
        <TextInputFieldWithTag
          initialValue={initialTitle}
          placeholder='Activity name...'
          fieldName={`Choose a name for your activity`.toUpperCase()}
          onChange={(val) => onTitleChange(val)}
        />
        <TextInputFieldWithTag
          initialValue={initialAuthor}
          placeholder='Activity author...'
          fieldName={`Specify the activity's author`.toUpperCase()}
          onChange={(val) => onAuthorChange(val)}
        />
      <SelectDatePanel
        onRangeSelected={(from, to) => handleDateRangeSelected(from, to)}
        initialFrom={initialFrom}
        initialTo={initialTo}
      />
    </Root>
  );
}

export default SetTitleAuthorDatesStage;
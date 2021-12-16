import React from 'react';
import styled from 'styled-components';
import SelectDatePanel from '../components/Forms/SelectDatePanel';
import TextInputFieldWithTag from '../components/Forms/TextInputFieldWithTag';
import ContentCard from '../components/Layout/ContentCard';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4.5vh;
  justify-content: center;
  align-items: center;
`;

const CardContent = styled.div`
  align-self: center;
`;

export interface SetTitleAuthorDatesStageProps {
  handleDateRangeSelected: (from: Date | undefined, to: Date | undefined) => void;
  onTitleChange: (title: string) => void;
  onAuthorChange: (author: string) => void;
  initialTitle?: string;
  initialAuthor?: string;
  initialFrom?: Date;
  initialTo?: Date;
};

/**
 * <img src="media://SetTitleAuthorDatesStage.PNG" alt="SetTitleAuthorDatesStage">
 */
export const SetTitleAuthorDatesStage: React.FC<SetTitleAuthorDatesStageProps> = ({
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
      <ContentCard
        titleAlign='center'
        cardTitle='Basic Information'
        width='60%'
      >
        <CardContent>
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
        </CardContent>
      </ContentCard>

    </Root>
  );
}

export default SetTitleAuthorDatesStage;
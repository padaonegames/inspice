import React from 'react';
import styled from 'styled-components';
import ContentCard from '../components/Layout/ContentCard';
import TextInputFieldWithTag from '../components/Forms/TextInputFieldWithTag';
import NextCornerButton from './NextCornerButton';

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

const VerticalMargin = styled.div`
  height: 55px;
  width: 100%;
`;

export interface InputBasicInformationProps {
  onTitleChange: (title: string) => void;
  onAuthorChange: (author: string) => void;
  initialTitle?: string;
  initialAuthor?: string;
  onNextClicked: () => void;
  enabled?: boolean;
};

/**
 * <img src="media://InputBasicInformation.PNG" alt="InputBasicInformation">
 */
export const InputBasicInformation: React.FC<InputBasicInformationProps> = ({
  onAuthorChange,
  onTitleChange,
  initialAuthor,
  initialTitle,
  onNextClicked,
  enabled = true
}) => {
  return (
    <Root>
      <ContentCard
        cardTitle='Input Basic Information'
        titleAlign='center'
        width='900px'
      >
        <CardContent>
          <TextInputFieldWithTag
            initialValue={initialTitle}
            placeholder='Treasure Hunt name...'
            fieldName={`Choose a name for your treasure hunt`.toUpperCase()}
            onChange={(val) => onTitleChange(val)}
          />
          <TextInputFieldWithTag
            initialValue={initialAuthor}
            placeholder='Treasure Hunt author...'
            fieldName={`Specify the treasure hunt's author`.toUpperCase()}
            onChange={(val) => onAuthorChange(val)}
          />
        </CardContent>
        <VerticalMargin />
        <NextCornerButton
          active={enabled}
          onNextClicked={() => { if (enabled) onNextClicked(); }}
        />
      </ContentCard>
    </Root>
  );
}

export default InputBasicInformation;
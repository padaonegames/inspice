import React from 'react';
import styled from 'styled-components';
import TextInputFieldWithTag from '../components/TextInputFieldWithTag';
import NextCornerButton from './NextCornerButton';

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

const VerticalMargin = styled.div`
  height: 55px;
  width: 100%;
`;

interface InputBasicInformationProps {
  onTitleChange: (title: string) => void;
  onAuthorChange: (author: string) => void;
  initialTitle?: string;
  initialAuthor?: string;
  onNextClicked: () => void;
  enabled?: boolean;
};

const InputBasicInformation: React.FC<InputBasicInformationProps> = ({
  onAuthorChange,
  onTitleChange,
  initialAuthor,
  initialTitle,
  onNextClicked,
  enabled = true
}) => {
  return (
    <Root>
      <TitleText>Input Basic Information</TitleText>
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
      <VerticalMargin />
      <NextCornerButton
        active={enabled}
        color='#3f3c2d'
        onNextClicked={() => { if (enabled) onNextClicked(); }}
      />
    </Root>
  );
}

export default InputBasicInformation;
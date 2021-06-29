import React from 'react';
import styled from 'styled-components';
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

interface InputBasicInformationProps {
  onTitleChange: (title: string) => void;
  onAuthorChange: (author: string) => void;
  initialTitle?: string;
  initialAuthor?: string;
  onNextClicked?: () => void;
};

const InputBasicInformation: React.FC<InputBasicInformationProps> = ({
  onAuthorChange,
  onTitleChange,
  initialAuthor,
  initialTitle,
  onNextClicked
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
    </Root>
  );
}

export default InputBasicInformation;
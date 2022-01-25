import styled from 'styled-components';
import StepTitleCard from '../../../../components/Forms/Cards/StepTitleCard';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
  margin-bottom: 65px;
`;

export const GeneralInformationStep = (): JSX.Element => {
  return (
    <Root>
      <StepTitleCard
        stepTitle='Basic Information'
        stepDescription={`
        Welcome to GAM Game!

        If you are visiting the museum in person, you can click on "scan QR"` +
        `when you find a work you find interesting in the exhibition to learn more about it,` +
        `create related stories, and explore the stories created by other users.

        If you are using this application from outside the museum, or you simply want` +
        `to explore every artwork included without having to use a QR code, you can click on` +
        `"Collection" to access a full list of pieces that are part of this game.

        Lastly, you can click on "My Stories" to browse the content that you have generated from this application.`}
      />
    </Root>
  );
}

export default GeneralInformationStep;
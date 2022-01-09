import styled from 'styled-components';
import ContentCard, { CardExplanatoryText } from '../../../components/Layout/ContentCard';
import { StepComponentProps } from '../../../components/Navigation/Steps';


const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
  margin-bottom: 65px;
`;

export const GeneralInformationStep = (props: StepComponentProps): JSX.Element => {
  return (
    <Root>
      <ContentCard
        titleAlign='center'
        cardTitle='Basic Information'
        width='100%'
      >
        <CardExplanatoryText>
          Welcome to GAM Game!
          <br />
          <br />
          If you are visiting the museum in person, you can click on "scan QR"
          when you find a work you find interesting in the exhibition to learn more about it,
          create related stories, and explore the stories created by other users.
          <br />
          <br />
          If you are using this application from outside the museum, or you simply want
          to explore every artwork included without having to use a QR code, you can click on
          "Collection" to access a full list of pieces that are part of this game.
          <br />
          <br />
          Lastly, you can click on "My Stories" to browse the content that you have generated
          from this application.
        </CardExplanatoryText>
      </ContentCard>
    </Root>
  );
}

export default GeneralInformationStep;
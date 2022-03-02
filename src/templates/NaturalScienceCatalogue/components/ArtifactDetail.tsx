import styled from 'styled-components';
import { Edit } from '@styled-icons/boxicons-regular/Edit';
import { useNavigate } from 'react-router-dom';
import ContainerCard from '../../../components/Forms/Cards/ContainerCard';
import { MncnArtifact } from '../../../services/mncnArtifact.model';
import { DetailUpperPanel, DetailMainInfoPanel, ArtworkTitle, ArtworkAuthor, DetailActionPanel, ArtworkListDottedLine, ArtworkDataContainer, ArtworkDescription, ArtworkNotes, DetailArtworkDisplay, StepRoot } from '../../GamGame/components/generalStyles';

const EditIcon = styled(Edit)`
  color: ${props => props.theme.textColor};
  width : 28px;
  height: 28px;
  margin-bottom: 5px;
`;

export interface ArtifactDetailProps {
  artifactData: MncnArtifact;
};

export const ArtifactDetail = (props: ArtifactDetailProps): JSX.Element => {

  const { artifactData } = props;
  const navigate = useNavigate();

  return (
    <StepRoot>
      <ContainerCard upperDecorator>
        <DetailUpperPanel>
          <DetailMainInfoPanel>
            <ArtworkTitle>
              {artifactData.title}
            </ArtworkTitle>
            <ArtworkAuthor>
              Museo Nacional de Ciencias Naturales
            </ArtworkAuthor>
          </DetailMainInfoPanel>
          <DetailActionPanel
            title='Esta acción no se encuentra habilitada para el artefacto actual'
            disabled
          >
            <EditIcon onClick={() => /*navigate('../stories')*/ { }} />
            Editar
          </DetailActionPanel>
        </DetailUpperPanel>

        <ArtworkListDottedLine />
        <ArtworkDataContainer>
          <ArtworkDescription>
            {artifactData.description}
          </ArtworkDescription>
          <ArtworkNotes>
            Posibles datos adicionales relevantes.
          </ArtworkNotes>
        </ArtworkDataContainer>
        <DetailArtworkDisplay
          backgroundImage={artifactData.image}
        />
      </ContainerCard>
    </StepRoot>
  );
};

export default ArtifactDetail;
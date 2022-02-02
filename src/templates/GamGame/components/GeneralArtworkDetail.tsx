import styled from 'styled-components';
import { FeatherAlt } from '@styled-icons/fa-solid/FeatherAlt';
import { ArtworkData } from '../../../services/artwork.model';
import { useNavigate, useParams } from 'react-router-dom';
import ContainerCard from '../../../components/Forms/Cards/ContainerCard';
import { ArtworkAuthor, ArtworkDataContainer, ArtworkDate, ArtworkDescription, ArtworkListDottedLine, ArtworkNotes, ArtworkTitle, ClickableText, DetailActionPanel, DetailArtworkDisplay, DetailMainInfoPanel, DetailUpperPanel } from './generalStyles';

const StoryIcon = styled(FeatherAlt)`
  color: ${props => props.theme.textColor};
  width : 28px;
  height: 28px;
  margin-bottom: 5px;
`;

export interface GeneralArtworkDetailProps {
  artworks: ArtworkData[];
};

export const GeneralArtworkDetail = (props: GeneralArtworkDetailProps): JSX.Element => {

  const { artworks } = props;
  const { artworkId } = useParams();
  const navigate = useNavigate();

  const artworkData = artworks.find(elem => elem.id === artworkId);

  if (!artworkData) {
    return (
      <>No artwork found.</>
    );
  }

  return (
    <ContainerCard upperDecorator>
      <DetailUpperPanel>
        <DetailMainInfoPanel>
          <ArtworkTitle>
            {artworkData.title}
          </ArtworkTitle>
          <ArtworkAuthor>
            {artworkData.author}
          </ArtworkAuthor>
          <ArtworkDate>
            {artworkData.date}
          </ArtworkDate>
        </DetailMainInfoPanel>
        <DetailActionPanel>
          <StoryIcon onClick={() => navigate('../stories/all')} />
          Stories
        </DetailActionPanel>
      </DetailUpperPanel>

      <ArtworkListDottedLine />
      <ArtworkDataContainer>
        <ArtworkDescription>
          {artworkData.info}
        </ArtworkDescription>
        <ArtworkNotes>
          {artworkData.location}
        </ArtworkNotes>
        <ClickableText onClick={() => window.open(artworkData.location)}>
          Find this work in the IMMA Collection
        </ClickableText>
      </ArtworkDataContainer>
      <DetailArtworkDisplay
        backgroundImage={artworkData.src}
      />
    </ContainerCard>
  );
};

export default GeneralArtworkDetail;
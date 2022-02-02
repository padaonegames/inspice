import styled from 'styled-components';
import { FeatherAlt } from '@styled-icons/fa-solid/FeatherAlt';
import { ArtworkData } from '../../../services/artwork.model';
import { useNavigate, useParams } from 'react-router-dom';
import ContainerCard from '../../../components/Forms/Cards/ContainerCard';
import { ArtworkAuthor, ArtworkDate, ArtworkDescription, ArtworkNotes, ArtworkTitle } from './generalStyles';

const UpperPanel = styled.div`
  display: flex;
  flex-direction: row;
`;

const MainInfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-bottom: 10px;
`;

const StoriesPanel = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  color: ${props => props.theme.textColor};
  text-align: center;
  font-size: 0.65em;
  font-weight: 400;
  letter-spacing: +1px;
  font-family: 'EB Garamond';
  text-transform: uppercase;
  cursor: pointer;
`;

const StoryIcon = styled(FeatherAlt)`
  color: ${props => props.theme.textColor};
  width : 28px;
  height: 28px;
  margin-bottom: 5px;
`;

const SelectionPanel = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 550px;
  margin: 0;

  @media (max-width: 768px) {
    width: 100%;
    padding: 3%;
  }

  @media (min-width: 768px) {
    width: 50%;
    padding: 1.5%;
    padding-top: 3%;
  }
`;

const ArtworkListDottedLine = styled.div`
  height: 0.5vh;
  width: 100%;
  border-style: dotted;
  border-color: lightgray;
  border-width: 0px 0px 1px 0px;
  margin-bottom: 2.5%;
`;

const ArtworkDataContainer = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  overflow-y: scroll;
  height: auto;
`;

interface ArtworkDisplayProps {
  backgroundImage: string;
};

const ArtworkDisplay = styled.div<ArtworkDisplayProps>`

  @media (max-width: 768px) {
    width: 100%;
    height: 95vw;
    object-fit: contain;
  }

  @media (min-width: 768px) {
    width: 50%;
  }

  background-image: ${props => `url(${props.backgroundImage})`};
  overflow: hidden;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-color: ${props => props.theme.artworkDisplayBackground};
`;

const ClickableText = styled.p`
  font-size: 0.9em;
  font-weight: 400;
  color: ${props => props.theme.clickableTextFontColor};
  margin-bottom: 15px;
  margin-top: 5px;
  text-decoration: underline;
  cursor: pointer;
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
      <SelectionPanel>
        <UpperPanel>
          <MainInfoPanel>
            <ArtworkTitle>
              {artworkData.title}
            </ArtworkTitle>
            <ArtworkAuthor>
              {artworkData.author}
            </ArtworkAuthor>
            <ArtworkDate>
              {artworkData.date}
            </ArtworkDate>
          </MainInfoPanel>
          <StoriesPanel>
            <StoryIcon onClick={() => navigate('../stories/all')} />
            Stories
          </StoriesPanel>
        </UpperPanel>

        <ArtworkListDottedLine />
        <ArtworkDataContainer>
          <ArtworkDescription>
            {artworkData.info}
          </ArtworkDescription>
        </ArtworkDataContainer>
        <ArtworkNotes>
          {artworkData.location}
        </ArtworkNotes>
        <ClickableText onClick={() => window.open(artworkData.location)}>
          Find this work in the IMMA Collection
        </ClickableText>
      </SelectionPanel>
      <ArtworkDisplay
        backgroundImage={artworkData.src}
      />
    </ContainerCard>
  );
};

export default GeneralArtworkDetail;
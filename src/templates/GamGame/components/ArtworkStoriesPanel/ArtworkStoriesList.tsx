import styled from 'styled-components';
import { Image } from '@styled-icons/ionicons-solid/Image';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { GamGameActivityContext } from '../../UserPerspective/Screen';
import { StoriesContext } from './StoriesContext';
import { PlusCircleFill } from '@styled-icons/bootstrap/PlusCircleFill';
import ContainerCard from '../../../../components/Forms/Cards/ContainerCard';
import { ArtworkAuthor, ArtworkDate, ArtworkListDottedLine, ArtworkTitle, DetailActionPanel, DetailMainInfoPanel, DetailUpperPanel } from '../generalStyles';
import StoriesList from './StoriesList';


const DetailsIcon = styled(Image)`
  color: ${props => props.theme.textColor};
  width : 3em;
  height: 3em;
  margin-bottom: 0.5em;
`;

const AddStoryButton = styled.div`
  position: fixed;
  z-index: 999;
  bottom: 3em;
  right: 3em;
`;

const AddStoryButtonBackground = styled.div`
  background-color: white;
  border-radius: 50%;
  height: 3em;
  width: 3em;
`;

const AddStoryIcon = styled(PlusCircleFill)`
  color: #c44c49;
  position: absolute;
  top: 0;
  left: 0;
  height: 3em;
  width: 3em;
  cursor: pointer;
`;

export const ArtworkStoriesList = (): JSX.Element => {

  const { stories } = useContext(StoriesContext);
  const { artworks } = useContext(GamGameActivityContext);
  const { artworkId } = useParams();
  const navigate = useNavigate();

  const artworkData = artworks.find(elem => elem.id === artworkId);

  if (!artworkData) {
    return (
      <>
        No artwork found.
      </>
    );
  }

  return (
    <ContainerCard upperDecorator>
      <AddStoryButton
        title='Add a new story'
        onClick={() => navigate('../create')}
      >
        <AddStoryButtonBackground />
        <AddStoryIcon />
      </AddStoryButton>
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
          <DetailsIcon onClick={() => navigate('../../detail')} />
          Details
        </DetailActionPanel>
      </DetailUpperPanel>

      <ArtworkListDottedLine />
      <StoriesList
        stories={stories}
        onStorySelected={(id) => navigate(`../${id}`)}
      />
    </ContainerCard>
  );
};

export default ArtworkStoriesList;
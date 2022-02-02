import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ArtworkColumnElement from '../../../../components/ArtworkSelection/ArtworkColumnElement';
import StepTitleCard from '../../../../components/Forms/Cards/StepTitleCard';
import SearchBar from '../../../../components/Forms/SearchBar';
import { GamGameActivityContext } from '../Screen';
import lineBackground from './../../../../components/line-header-point.png';

const VerticalSeparator = styled.div`
  width: 85%;
  max-width: 960px;
  height: 1px;
  background: url(${lineBackground}) repeat-x 0 center;
  margin-bottom: 10px;
  margin-top: 15px;
  align-self: center;
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
  margin-bottom: 65px;
`;

const ArtworkGrid = styled.div`
  position: relative;
  height: fit-content;
  width: 100%;
  max-width: 730px;
  display: grid;
  align-self: top;

  @media (max-width: 768px) {
    justify-content: center;
    padding-bottom: 1em;
  }

  @media (min-width: 768px) {
    padding-top: 1em;
    justify-content: space-around;
    align-content: center;
    grid-row-gap: 1.5em;
    grid-template-columns: auto auto;
    padding-left: 15px;
  }
`;

export const CollectionStep = (): JSX.Element => {

  const navigate = useNavigate();
  const { artworks } = useContext(GamGameActivityContext);

  const [filter, setFilter] = useState<string>('');

  const displayArtworks = artworks.filter(elem =>
    elem.title.toLowerCase().includes(filter) ||
    elem.author.toLowerCase().includes(filter)
  );

  return (
    <Root>
      <StepTitleCard
        stepTitle='Explore the Collection'
        stepDescription={`Here you can find the works included in this activity. Click on any of them to access its information page or interact with its stories.`}
      >
        <VerticalSeparator />
        <SearchBar
          placeholder='Search by title or author...'
          onSearchPerformed={(search) => setFilter(search)}
        />
        <ArtworkGrid>
          {displayArtworks.map(elem => (
            <ArtworkColumnElement
              artworkData={elem}
              key={elem.id}
              onCardClicked={() => {
                navigate(`${elem.id}`);
              }}
            />
          ))}
        </ArtworkGrid>
      </StepTitleCard>
    </Root>
  );
}

export default CollectionStep;
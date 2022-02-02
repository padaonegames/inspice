import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArtworkColumnElement from '../../../../components/ArtworkSelection/ArtworkColumnElement';
import StepTitleCard from '../../../../components/Forms/Cards/StepTitleCard';
import SearchBar from '../../../../components/Forms/SearchBar';
import { ArtworkGrid, ArtworkListDottedLine, StepRoot } from '../../components/generalStyles';
import { GamGameActivityContext } from '../Screen';

export const CollectionStep = (): JSX.Element => {

  const navigate = useNavigate();
  const { artworks } = useContext(GamGameActivityContext);

  const [filter, setFilter] = useState<string>('');

  const displayArtworks = artworks.filter(elem =>
    elem.title.toLowerCase().includes(filter) ||
    elem.author.toLowerCase().includes(filter)
  );

  return (
    <StepRoot>
      <StepTitleCard
        stepTitle='Explore the Collection'
        stepDescription={`Here you can find the works included in this activity. Click on any of them to access its information page or interact with its stories.`}
      >
        <ArtworkListDottedLine />
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
    </StepRoot>
  );
}

export default CollectionStep;
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArtworkColumnElement from '../../../../components/ArtworkSelection/ArtworkColumnElement';
import StepTitleCard from '../../../../components/Forms/Cards/StepTitleCard';
import SearchBar from '../../../../components/Forms/SearchBar';
import { ArtworkGrid, ArtworkListDottedLine, StepRoot } from '../../components/generalStyles';
import { GamGameActivityContext } from '../Screen';

export const MyStoriesStep = (): JSX.Element => {
  
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
        stepTitle='My Stories'
        stepDescription={`Here you can find a list of your personal stories. Use this page to browse, view and delete the stories you've already created.`}
      >
        <ArtworkListDottedLine />
        <SearchBar
          placeholder='Search story by title...'
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

export default MyStoriesStep;
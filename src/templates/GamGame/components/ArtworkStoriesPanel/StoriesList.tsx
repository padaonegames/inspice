import { useState } from 'react';
import { StoryGrid } from '../generalStyles';
import SearchBar from '../../../../components/Forms/SearchBar';
import StoryColumnElement from '../../../../components/ArtworkSelection/StoryColumnElement';
import { GamGameStoryDefinition } from '../../../../services/gamGameActivity.model';

export interface StoriesListProps {
  /** Stories to be rendered within this component */
  stories: GamGameStoryDefinition[];
  /** Callback to parent specifying that a given story with storyId has been selected */
  onStorySelected?: (storyId: string) => void;
};

export const StoriesList = (props: StoriesListProps): JSX.Element => {

  const { stories, onStorySelected } = props;

  const [filter, setFilter] = useState<string>('');

  const displayStories = stories.filter(elem =>
    elem.title.toLowerCase().includes(filter) ||
    elem.author.toLowerCase().includes(filter)
  );

  return (
    <>
      <SearchBar
        placeholder='Search stories by title or author...'
        onSearchPerformed={(search) => setFilter(search)}
      />

      <StoryGrid>
        {displayStories.map(elem => (
          <StoryColumnElement
            key={elem._id}
            storyData={elem}
            imageSrc={elem.imageSrc ?? 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'}
            onCardClicked={() => {
              if (onStorySelected) {
                onStorySelected(elem._id);
              }
            }}
          />
        ))}
      </StoryGrid>
    </>
  );
};

export default StoriesList;
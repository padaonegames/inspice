import { useState } from "react";
import { StoryGrid } from "../generalStyles";
import SearchBar from "../../../../components/Forms/SearchBar";
import StoryColumnElement from "../../../../components/ArtworkSelection/StoryColumnElement";
import { GamGameStoryDefinitionData } from "../../../../services/gamGameActivity.model";
import { ArtworkData } from "../../../../services/artwork.model";
import { useTranslation } from "react-i18next";

export interface StoriesListProps {
  /** Stories to be rendered within this component */
  stories: GamGameStoryDefinitionData[];
  /** artworks used within these stories */
  artworks: ArtworkData[];
  /** whether delete story icons should be available */
  enableStoryDeletion?: boolean;
  /** Callback to parent specifying that a given story with `storyId` has been selected */
  onStorySelected?: (storyId: string) => void;
  /** Callback to parent specifying that user wishes to delete a story with `storyId` */
  onDeleteStory?: (storyId: string) => void;
} // StoriesListProps

export const StoriesList = (props: StoriesListProps): JSX.Element => {
  const { t } = useTranslation("gamGame");
  const {
    stories,
    artworks,
    enableStoryDeletion = false,
    onStorySelected,
    onDeleteStory,
  } = props;
  const [filter, setFilter] = useState<string>("");

  const displayStories = stories.filter((elem) =>
    elem.title.toLowerCase().includes(filter)
  );

  return (
    <>
      <SearchBar
        placeholder={`${t("searchStoriesByTitle")}...`}
        onSearchPerformed={(search) => setFilter(search)}
      />

      <StoryGrid>
        {displayStories.map((elem) => (
          <StoryColumnElement
            key={elem._id}
            storyData={elem}
            enableStoryDeletion={enableStoryDeletion}
            imageSrcs={
              elem.imageSrc
                ? [elem.imageSrc]
                : elem.parts.flatMap(
                    (part) =>
                      artworks.find((artwork) => artwork.id === part.artworkId)
                        ?.src ?? []
                  )
            }
            onCardClicked={() => {
              if (onStorySelected) {
                onStorySelected(elem._id);
              }
            }}
            onDeleteStory={() => {
              if (onDeleteStory) {
                onDeleteStory(elem._id);
              }
            }}
          />
        ))}
      </StoryGrid>
    </>
  );
}; // StoriesList

export default StoriesList;

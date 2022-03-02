import StepTitleCard from "../../../../../components/Forms/Cards/StepTitleCard";
import { ArtworkData } from "../../../../../services/artwork.model";
import { ArtworkListDottedLine, StepRoot } from "../../generalStyles";
import ArtworksList from "../ArtworksList";

interface SelectArtworkStepProps {
  /** Optional number indicating the index of the current part in the story */
  index?: number;
  /** list of artworks to choose from */
  artworks: ArtworkData[];
  /** callback to parent specifying that an artwork has been selected */
  onArtworkSelected?: (id: string) => void;
}

export const SelectArtworkStep = (props: SelectArtworkStepProps): JSX.Element => {

  const { artworks, onArtworkSelected, index } = props;

  const handleArtworkSelected = (id: string) => {
    const artwork = artworks.find(elem => elem.id === id);
    if (!artwork) return;

    const time = Date.now();
    const res = window.confirm(`You're about to choose ${artwork.title}, by ${artwork.author} as your next artwork. Continue with this choice?`);
    if ((res || (Date.now() - time < 10)) && onArtworkSelected) {
      onArtworkSelected(id);
    }
  };

  return (
    <StepRoot>
      <StepTitleCard
        stepTitle={`Select Artwork${index !== undefined ? ` #${index}` : ''}`}
        stepDescription={`Take a look at the different artworks included in this activity and pick one for your story by clicking on it. You may use the search bar to look for specific artworks by title or author's name.
        `}
      >
        <ArtworkListDottedLine />
        <ArtworksList
          artworks={artworks}
          onArtworkSelected={handleArtworkSelected}
        />
      </StepTitleCard>
    </StepRoot>
  );
};

export default SelectArtworkStep;
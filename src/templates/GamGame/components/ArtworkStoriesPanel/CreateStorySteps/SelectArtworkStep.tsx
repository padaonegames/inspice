import _ from "lodash";
import { useTranslation } from "react-i18next";
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

  const { t } = useTranslation('gamGame');
  const { artworks, onArtworkSelected, index } = props;

  const handleArtworkSelected = (id: string) => {
    const artwork = artworks.find(elem => elem.id === id);
    if (!artwork) return;

    const time = Date.now();
    const res = window.confirm(t('youreAboutToChooseArtwork', { artwork: artwork.title, author: artwork.author }));
    if ((res || (Date.now() - time < 10)) && onArtworkSelected) {
      onArtworkSelected(id);
    }
  };

  return (
    <StepRoot>
      <StepTitleCard
        stepTitle={`${t('selectArtwork')} ${index !== undefined ? ` #${index}` : ''}`}
        stepDescription={t('selectArtworkDescription')}
      >
        <ArtworkListDottedLine />
        <ArtworksList
          artworks={shuffleArray(artworks)}
          onArtworkSelected={handleArtworkSelected}
        />
      </StepTitleCard>
    </StepRoot>
  );
};

function shuffleArray<T>(array: T[]) {
  const newArray = _.cloneDeep(array);
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }
  return newArray;
}

export default SelectArtworkStep;
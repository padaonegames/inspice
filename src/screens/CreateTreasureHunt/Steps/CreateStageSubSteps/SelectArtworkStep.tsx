import SelectArtwork from "../../../../components/ArtworkSelection/SelectArtwork";
import { StepComponentProps } from "../../../../components/Navigation/Steps";
import { ArtworkData } from "../../../../services/artwork.model";

export interface SelectArtworkStepProps extends StepComponentProps {
  activityTitle: string;
  artworks: ArtworkData[];
};

export const SelectArtworkStep = (props: SelectArtworkStepProps) => {

  const handleSelectArtwork = (artworkId: string) => {
    props.setState<string | undefined>('artworkId', artworkId, '');
  };

  return (
    <SelectArtwork
      titleText={props.activityTitle}
      imagesData={props.artworks}
      selectedArtwork={props.getState<string | undefined>('artworkId', undefined)}
      onArtworkSelected={handleSelectArtwork}
      onNextClicked={props.next}
    />
  )
};

export default SelectArtworkStep;
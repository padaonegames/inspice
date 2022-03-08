import ArtworkDecorationPanel from './ArtworkDecorationPanel';
import ContainerCard from '../../../../components/Forms/Cards/ContainerCard';
import { GamGameStoryPart } from '../../../../services/gamGameActivity.model';
import { ArtworkData } from '../../../../services/artwork.model';
import { ArtworkAuthor, ArtworkDescription, ArtworkListDottedLine, ArtworkTitle, StoryDataContainer, StoryDisplayActionButton, StoryDisplayHeaderRow, StoryDisplayMainInfoPanel, StoryDisplayQuitIcon, StoryDisplaySelectionPanel, StoryDisplayUpperPanel } from '../generalStyles';
import { useTranslation } from 'react-i18next';

export interface StoryPartViewProps {
  /** Story part to be rendered */
  storyPart: GamGameStoryPart;
  /** Artwork Data for the artwork included in storyPart as artworkId */
  artworkData: ArtworkData;
  /** Callback to parent component specifying that the next button has been pressed */
  onNextClicked?: () => void;
  /** Callback to parent specifying that the user wishes to close this story */
  onQuit?: () => void;
};

export const StoryPartView = (props: StoryPartViewProps): JSX.Element => {

  const {
    storyPart,
    artworkData,
    onNextClicked,
    onQuit
  } = props;

  const { t } = useTranslation('gamGame');

  return (
    <ContainerCard upperDecorator>
      <StoryDisplaySelectionPanel>
        <StoryDisplayHeaderRow>
          <StoryDisplayQuitIcon onClick={onQuit} />
          <StoryDisplayActionButton
            onClick={onNextClicked}
            enabled
          >
            {t('next')}
          </StoryDisplayActionButton>
        </StoryDisplayHeaderRow>

        <ArtworkListDottedLine />

        <StoryDataContainer>
          <StoryDisplayUpperPanel>
            <StoryDisplayMainInfoPanel>
              <ArtworkTitle>
                {artworkData.title}
              </ArtworkTitle>
              <ArtworkAuthor>
                {artworkData.author}
              </ArtworkAuthor>
            </StoryDisplayMainInfoPanel>
          </StoryDisplayUpperPanel>

          <ArtworkListDottedLine />
          <ArtworkDescription>
            <b>{t(storyPart.multimediaData.textTemplate)}...</b> {storyPart.multimediaData.text}
          </ArtworkDescription>
        </StoryDataContainer>
        <ArtworkDecorationPanel
          editEnabled={false}
          artworkSrc={artworkData.src}
          emojis={storyPart.multimediaData.emojis}
          tags={storyPart.multimediaData.tags}
        />
      </StoryDisplaySelectionPanel>
    </ContainerCard>
  );
};

export default StoryPartView;
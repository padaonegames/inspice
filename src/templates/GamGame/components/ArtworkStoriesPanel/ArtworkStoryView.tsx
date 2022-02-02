import styled from 'styled-components';
import { Cross } from '@styled-icons/entypo/Cross';
import ArtworkDecorationPanel from './ArtworkDecorationPanel';
import ContainerCard from '../../../../components/Forms/Cards/ContainerCard';
import { GamGameStoryPart } from '../../../../services/gamGameActivity.model';
import { ArtworkData } from '../../../../services/artwork.model';
import { ArtworkAuthor, ArtworkDataContainer, ArtworkDescription, ArtworkTitle } from '../generalStyles';

const UpperPanel = styled.div`
  display: flex;
  flex-direction: row;
`;

const MainInfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-bottom: 5px;
`;

const SelectionPanel = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 550px;
  margin: 0;

  @media (max-width: 768px) {
    width: 100%;
    padding: 3%;
  }

  @media (min-width: 768px) {
    width: 50%;
    padding: 1.5%;
    padding-top: 3%;
  }
`;

const StoryListDottedLine = styled.div`
  height: 0.5vh;
  width: 100%;
  border-style: dotted;
  border-color: lightgray;
  border-width: 0px 0px 1px 0px;
  margin-bottom: 5px;
`;

const QuitIcon = styled(Cross)`
  color: ${props => props.theme.textColor};
  height: 28px;
  width: 35px;
  cursor: pointer;
  margin-right: 10px;
  align-self: center;
`;

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

  return (
    <ContainerCard upperDecorator>
      <SelectionPanel>
        <UpperPanel>
          <QuitIcon onClick={onQuit} />
          <MainInfoPanel>
            <ArtworkTitle>
              {artworkData.title}
            </ArtworkTitle>
            <ArtworkAuthor>
              {artworkData.author}
            </ArtworkAuthor>
          </MainInfoPanel>
        </UpperPanel>

        <StoryListDottedLine />
        <ArtworkDataContainer>
          <ArtworkDescription>
            {storyPart.multimediaData.text}
          </ArtworkDescription>
        </ArtworkDataContainer>
      </SelectionPanel>
      <ArtworkDecorationPanel
        editEnabled={false}
        artworkSrc={artworkData.src}
        emojis={storyPart.multimediaData.emojis}
        tags={storyPart.multimediaData.tags}
      />
    </ContainerCard>
  );
};

export default StoryPartView;
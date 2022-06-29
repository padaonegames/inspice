import styled from "styled-components";
import { Add } from "@styled-icons/fluentui-system-filled/Add";
import { RoomBlock, SupportedPuzzle } from "../../../../services/escapeRoomActivity.model";
import { RoomBlockSlide, RoomBlockSlideProps, RoomSettingsSlide } from "./RoomBlockSlide";

const Root = styled.div`
  position: absolute;
  top: 0;
  z-index: 101;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  -moz-box-align: center;
  align-blocks: center;
  width: 96%;
  height: 8.5rem;

  background-color: white;

  border-radius: 0 0 1.25rem 1.25rem;
  box-shadow: #d3d4d5 0px -4px 0px 0px inset;
  padding: 0 0.5rem;
`;

const VerticalSpace = styled.div`
  height: 0;
  margin-top: 7rem;
`;

const SlidesContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  z-index: 4;
  height: 85%;
  width: 90%;
  overflow-x: auto;
  margin: 0px 0px;
`;

const AddIcon = styled(Add)`
  color: white;
  height: 1.75em;
  width: 1.75em;
  margin: auto;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  -moz-box-align: center;
  align-blocks: center;
  -moz-box-pack: start;
  justify-content: center;
  min-height: 100%;
  padding: 0px 1.5rem 1.5rem 1.5rem;
  position: absolute;
  right: 0;
  z-index: 9999;
`;

const AddBlockButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: rgb(255, 255, 255) none repeat scroll 0% 0%;
  transition: all 0.2s ease 0s;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const AddBlockButton = styled.button`
  width: 100%;
  margin: 0px;
  border: 0px none;
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  box-shadow: rgba(0, 0, 0, 0.25) 0px -4px inset;

  background: rgb(19, 104, 206) none repeat scroll 0% 0%;
  color: rgb(255, 255, 255);
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 600;

  font-family: ${props => props.theme.contentFont};
  text-align: center;
  text-decoration: none;
  min-width: 42px;
  min-height: 42px;
  padding: 0px;
  position: relative;

  transition: all 0s;
  &:hover {
    transition: all 0s;
    min-height: 40px;
    margin-top: 2px;
    padding-bottom: 2px;
    background-color: rgb(18, 96, 190);
    box-shadow: rgba(0, 0, 0, 0.25) 0px -2px inset;
  }
`;

export type ItemToSlideProducerMapping<T extends SupportedPuzzle> = {
  /** What type of puzzle we are working with here*/
  [P in T['type']]: ((slidePreviewProps: Extract<T, { type: P }>['payload']) => JSX.Element);
}

export interface RoomBlockSlidesContainerProps {
  /** list of blocks currently included in the room */
  blocks: RoomBlock[];
  /** index of currently selected block in blocks */
  selectedBlockIndex: number | 'room-settings';
  /** What  mappings we are working with in this slides list (available puzzle types and how to render their previews) */
  itemMappings: ItemToSlideProducerMapping<SupportedPuzzle>;
  /** Callback to parent component specifying that user wishes to add a new block to the room */
  onAddBlock?: () => void;
  /** Callback to parent component specifying that user wishes to select a given block from the room blocks */
  onSelectBlock?: (index: number) => void;
  /** Callback to parent component specifying that user wishes to go back to the room settings editor */
  onSelectRoomSettings?: () => void;
} // RoomBlockSlidesContainerProps

export const RoomBlockSlidesContainer = (props: RoomBlockSlidesContainerProps): JSX.Element => {

  const {
    blocks,
    selectedBlockIndex,
    itemMappings,
    onAddBlock,
    onSelectBlock,
    onSelectRoomSettings
  } = props;

  const handleSelectBlock = (index: number) => {
    if (onSelectBlock) {
      onSelectBlock(index);
    }
  }; // handleSelectBlock

  return (
    <>
      <Root>
        <SlidesContainer>
          <RoomSettingsSlide
            selected={selectedBlockIndex === 'room-settings'}
            onSlideSelected={onSelectRoomSettings}
          />
          {blocks.map((block, i) => {
            // This is "unsafe", but in reality due to how itemMappings is defined
            // it will never really be problematic (s and itemMappings[s.type] are forcefully consistent)
            const slideProps = {
              puzzleMappings: itemMappings,
              selected: i == selectedBlockIndex,
              block: block,
              onSlideSelected: () => handleSelectBlock(i)
            } as RoomBlockSlideProps;

            return (
              <>
                <RoomBlockSlide
                  key={block.blockName + '_' + i}
                  {...slideProps}
                />
              </>
            );
          })}
        </SlidesContainer>
        <ButtonsContainer>
          <AddBlockButtonContainer>
            <AddBlockButton
              onClick={onAddBlock}
              title="Add Block"
            >
              <AddIcon />
            </AddBlockButton>
          </AddBlockButtonContainer>
        </ButtonsContainer>
      </Root>
      <VerticalSpace />
    </>
  );
}; // RoomBlockSlidesContainer
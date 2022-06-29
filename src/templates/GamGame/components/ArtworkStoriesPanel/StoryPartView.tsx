import ArtworkDecorationPanel from './ArtworkDecorationPanel';
import ContainerCard from '../../../../components/Forms/Cards/ContainerCard';
import { AvailableTextTemplate, availableTextTemplates, GamGameStoryPart } from '../../../../services/gamGameActivity.model';
import { ArtworkData } from '../../../../services/artwork.model';
import { ArtworkAuthor, ArtworkDescription, ArtworkListDottedLine, ArtworkTitle, StoryDataContainer, StoryDisplayActionButton, StoryDisplayHeaderRow, StoryDisplayMainInfoPanel, StoryDisplayQuitIcon, StoryDisplaySelectionPanel, StoryDisplayUpperPanel } from '../generalStyles';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Thinking } from '@styled-icons/fluentui-system-regular/Thinking';
import { HeartOutlined } from '@styled-icons/entypo/HeartOutlined';
import { BackInTime } from '@styled-icons/entypo/BackInTime';
import styled, { css } from 'styled-components';

const templateIconStyle = css`
  width: auto;
  height: 2.25rem;
  color: white;
  margin: auto;
`;

const TemplateRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface TemplateSelectorProps {
  enabled?: boolean;
}
const TemplateSelector = styled.button<TemplateSelectorProps>`
  border-radius: 15px;
  background-color: ${props => props.enabled ? 'rgb(196, 76, 73)' : '#cd6764'};
  color: ${props => props.enabled ? 'white' : 'rgb(230, 230, 230)'};
  font-weight: 500;
  font-size: 0.8em;
  padding: 0.5em 1em;
  margin: 0 0.2em;
  max-width: 33%;
  height: 4em;
  cursor: ${props => props.enabled ? 'default' : 'pointer'};

  box-shadow: rgba(0, 0, 0, 0.25) 0px -4px inset;


  ${props => props.enabled && `
    min-height: 40px;
    margin-top: 2px;
    padding-bottom: 2px;
    background-color: rgb(196, 76, 73);
    color: white;
    box-shadow: rgba(0, 0, 0, 0.25) 0px -2px inset;
  `}

  transition: all 0s;
  &:hover {
    transition: all 0s;
    min-height: 40px;
    margin-top: 2px;
    padding-bottom: 2px;
    background-color: ${props => props.enabled ? 'rgb(196, 76, 73)' : 'rgba(196, 76, 73, 0.85)'};
    color: white;
    box-shadow: rgba(0, 0, 0, 0.25) 0px -2px inset;
  }
`;

const ItMakesMeThinkIcon = styled(Thinking)`
  ${templateIconStyle}
`;

const ItMakesMeFeelIcon = styled(HeartOutlined)`
  ${templateIconStyle}
`;

const ItRemindsMeOfIcon = styled(BackInTime)`
  ${templateIconStyle}
`;

const templateIcons: { [T in AvailableTextTemplate]: JSX.Element } = {
  itMakesMeThinkAbout: <ItMakesMeThinkIcon />,
  itRemindsMeOf: <ItRemindsMeOfIcon />,
  itMakesMeFeel: <ItMakesMeFeelIcon />
};

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

  const [selectedTemplate, setSelectedTemplate] = useState<AvailableTextTemplate>('itMakesMeThinkAbout');

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

          <TemplateRow>
            {availableTextTemplates.map(elem =>
              <TemplateSelector
                enabled={elem === selectedTemplate}
                onClick={() => setSelectedTemplate(elem)}
              >
                {templateIcons[elem]}
              </TemplateSelector>
            )}
          </TemplateRow>

          <ArtworkListDottedLine />

          <ArtworkDescription>
            <b>{t(selectedTemplate)}...</b> {storyPart.multimediaData.answersToTemplates[selectedTemplate]}
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
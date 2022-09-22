import styled, { css } from "styled-components";
import { useState } from "react";
import {
  AnswersToTemplates,
  AvailableTextTemplate,
  availableTextTemplates,
  Emoji,
  GamGameStoryPart,
  StoryPartEmoji,
  StoryPartTag,
} from "../../../../services/gamGameActivity.model";
import { ArtworkDecorationPanel } from "./ArtworkDecorationPanel";
import { Position } from "./Draggable";
import {
  ArtworkAuthor,
  ArtworkListDottedLine,
  ArtworkTitle,
  InputArea,
  NextArrowIcon,
  StoryDataContainer,
  StoryDisplayActionButton,
  StoryDisplayBottomRow,
  StoryDisplayHeaderRow,
  StoryDisplayMainInfoPanel,
  StoryDisplayQuitIcon,
  StoryDisplaySelectionPanel,
  StoryDisplayUpperPanel,
} from "../generalStyles";
import ContainerCard from "../../../../components/Forms/Cards/ContainerCard";
import { ArtworkData } from "../../../../services/artwork.model";
import { useTranslation } from "react-i18next";
import { Thinking } from "@styled-icons/fluentui-system-regular/Thinking";
import { HeartOutlined } from "@styled-icons/entypo/HeartOutlined";
import { BackInTime } from "@styled-icons/entypo/BackInTime";
import { cloneDeep } from "lodash";

const TemplateRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const templateIconStyle = css`
  width: auto;
  height: 2.25rem;
  color: white;
  margin: auto;
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

interface TemplateSelectorProps {
  enabled?: boolean;
}
const TemplateSelector = styled.button<TemplateSelectorProps>`
  border-radius: 15px;
  background-color: ${(props) =>
    props.enabled ? "rgb(196, 76, 73)" : "#cd6764"};
  color: ${(props) => (props.enabled ? "white" : "rgb(230, 230, 230)")};
  font-weight: 500;
  font-size: 0.8em;
  padding: 0.5em 1em;
  margin: 0 0.2em;
  max-width: 33%;
  height: 4em;
  cursor: ${(props) => (props.enabled ? "default" : "pointer")};

  box-shadow: rgba(0, 0, 0, 0.25) 0px -4px inset;

  ${(props) =>
    props.enabled &&
    `
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
    background-color: ${(props) =>
      props.enabled ? "rgb(196, 76, 73)" : "rgba(196, 76, 73, 0.85)"};
    color: white;
    box-shadow: rgba(0, 0, 0, 0.25) 0px -2px inset;
  }
`;

const templateIcons: { [T in AvailableTextTemplate]: JSX.Element } = {
  itMakesMeThinkAbout: <ItMakesMeThinkIcon />,
  itRemindsMeOf: <ItRemindsMeOfIcon />,
  itMakesMeFeel: <ItMakesMeFeelIcon />,
};

export interface CreateStoryPartProps {
  /** Artwork over which the current part will talk about */
  artwork: ArtworkData;
  /** Callback to parent that will be triggered when the user clicks on Done with a valid part definition (passed as part param) */
  onSubmitPart?: (part: GamGameStoryPart) => void;
  /** Callback to parent specifying that the user wishes to give up on this story */
  onQuit?: () => void;
}

export const CreateStoryPart = (props: CreateStoryPartProps): JSX.Element => {
  const { artwork, onSubmitPart, onQuit } = props;

  const { t } = useTranslation("gamGame");

  const [selectedTemplate, setSelectedTemplate] =
    useState<AvailableTextTemplate>("itMakesMeThinkAbout");
  const [answersToTemplates, setAnswersToTemplates] =
    useState<AnswersToTemplates>({
      itMakesMeFeel: "",
      itMakesMeThinkAbout: "",
      itRemindsMeOf: "",
    });
  const [emojis, setEmojis] = useState<StoryPartEmoji[]>([]);
  const [tags, setTags] = useState<StoryPartTag[]>([]);

  const writtenSomething = () =>
    availableTextTemplates.some(
      (entry) => answersToTemplates[entry].length > 0
    );
  const canSubmit = () =>
    writtenSomething() || emojis.length > 0 || tags.length > 0;

  const handleSubmitPart = () => {
    // enforce users typing something for at least one template of their choice
    // OR inputing at least one icon or tag
    if (!canSubmit() || !onSubmitPart) return;

    const part: GamGameStoryPart = {
      artworkId: artwork.id,
      multimediaData: {
        answersToTemplates,
        emojis,
        tags,
      },
    };

    onSubmitPart(part);
  };

  const handleAddEmoji = (emoji: Emoji) => {
    setEmojis((prev) => [
      ...prev,
      {
        locationX: 0.375,
        locationY: 0.3,
        emoji,
      },
    ]);
  };

  const handleAddTag = (tag: string) => {
    setTags((prev) => [
      ...prev,
      {
        locationX: 0.375,
        locationY: 0.3,
        tag,
      },
    ]);
  };

  const handleRemoveEmoji = (index: number) => {
    setEmojis((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  }; // handleRemoveEmoji

  const handleRemoveTag = (index: number) => {
    setTags((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  }; // handleRemoveTag

  const handleMoveEmoji = (index: number, pos: Position) => {
    setEmojis((prev) => {
      let copy: StoryPartEmoji[] = JSON.parse(JSON.stringify(prev));
      if (index >= 0 && index < copy.length) {
        copy[index].locationX = pos.x;
        copy[index].locationY = pos.y;
      }
      return copy;
    });
  };

  const handleMoveTag = (index: number, pos: Position) => {
    setTags((prev) => {
      let copy: StoryPartTag[] = JSON.parse(JSON.stringify(prev));
      if (index >= 0 && index < tags.length) {
        tags[index].locationX = pos.x;
        tags[index].locationY = pos.y;
      }
      return copy;
    });
  };

  const handleSelectTemplate = (newTemplate: AvailableTextTemplate) => {
    setSelectedTemplate(newTemplate);
  };

  return (
    <ContainerCard upperDecorator>
      <StoryDisplaySelectionPanel>
        <StoryDisplayHeaderRow>
          <StoryDisplayQuitIcon onClick={onQuit} />
        </StoryDisplayHeaderRow>

        <ArtworkListDottedLine />

        <StoryDataContainer>
          <StoryDisplayUpperPanel>
            <StoryDisplayMainInfoPanel>
              <ArtworkTitle>{artwork.title}</ArtworkTitle>
              <ArtworkAuthor>{artwork.author}</ArtworkAuthor>
            </StoryDisplayMainInfoPanel>
          </StoryDisplayUpperPanel>
        </StoryDataContainer>

        <ArtworkDecorationPanel
          artworkSrc={artwork.src}
          emojis={emojis}
          tags={tags}
          onAddEmoji={handleAddEmoji}
          onMoveEmoji={handleMoveEmoji}
          onAddTag={handleAddTag}
          onMoveTag={handleMoveTag}
          onRemoveEmoji={handleRemoveEmoji}
          onRemoveTag={handleRemoveTag}
        />

        <ArtworkListDottedLine />
        <StoryDataContainer>
          <TemplateRow>
            {availableTextTemplates.map((elem) => (
              <TemplateSelector
                key={elem}
                enabled={elem === selectedTemplate}
                onClick={() => handleSelectTemplate(elem)}
              >
                {templateIcons[elem]}
              </TemplateSelector>
            ))}
          </TemplateRow>

          <ArtworkListDottedLine />

          <InputArea
            placeholder={t("writeYourStoryTextHere")}
            value={`${t(selectedTemplate)} ${
              answersToTemplates[selectedTemplate]
            }`}
            onChange={(e) =>
              setAnswersToTemplates((prev) => {
                const newText = e.target.value.slice(
                  t(selectedTemplate).length + 1
                );
                const newValue = cloneDeep(prev);
                newValue[selectedTemplate] = newText;
                return newValue;
              })
            }
            rows={4}
          />
        </StoryDataContainer>
        <StoryDisplayBottomRow>
          <StoryDisplayActionButton
            onClick={handleSubmitPart}
            enabled={canSubmit()}
            title={t("done")}
          >
            <NextArrowIcon />
          </StoryDisplayActionButton>
        </StoryDisplayBottomRow>
      </StoryDisplaySelectionPanel>
    </ContainerCard>
  );
}; // CreateStoryPart

export default CreateStoryPart;

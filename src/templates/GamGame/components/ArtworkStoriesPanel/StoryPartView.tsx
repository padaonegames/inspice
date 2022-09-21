import ArtworkDecorationPanel from "./ArtworkDecorationPanel";
import ContainerCard from "../../../../components/Forms/Cards/ContainerCard";
import {
  AvailableTextTemplate,
  availableTextTemplates,
  GamGameStoryPart,
} from "../../../../services/gamGameActivity.model";
import { ArtworkData } from "../../../../services/artwork.model";
import {
  ArtworkAuthor,
  ArtworkDescription,
  ArtworkListDottedLine,
  ArtworkTitle,
  StoryDataContainer,
  StoryDisplayActionButton,
  StoryDisplayHeaderRow,
  StoryDisplayMainInfoPanel,
  StoryDisplayQuitIcon,
  StoryDisplaySelectionPanel,
  StoryDisplayUpperPanel,
} from "../generalStyles";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Thinking } from "@styled-icons/fluentui-system-regular/Thinking";
import { HeartOutlined } from "@styled-icons/entypo/HeartOutlined";
import { BackInTime } from "@styled-icons/entypo/BackInTime";
import styled, { css } from "styled-components";

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

const DisabledTemplateSelector = styled.button`
  border-radius: 15px;
  background-color: darkgray;
  color: white;
  font-weight: 500;
  font-size: 0.8em;
  padding: 0.5em 1em;
  margin: 0 0.2em;
  max-width: 33%;
  height: 4em;
  cursor: default;

  box-shadow: rgba(0, 0, 0, 0.25) 0px -4px inset;

  min-height: 40px;
  margin-top: 2px;
  padding-bottom: 2px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px -2px inset;
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
  itMakesMeFeel: <ItMakesMeFeelIcon />,
};

export interface StoryPartViewProps {
  /** Story part to be rendered */
  storyPart: GamGameStoryPart;
  /** Artwork Data for the artwork included in storyPart as artworkId */
  artworkData?: ArtworkData;
  /** Callback to parent component specifying that the next button has been pressed */
  onNextClicked?: () => void;
  /** Callback to parent specifying that the user wishes to close this story */
  onQuit?: () => void;
}

export const StoryPartView = (props: StoryPartViewProps): JSX.Element => {
  const { storyPart, artworkData, onNextClicked, onQuit } = props;

  const [selectedTemplate, setSelectedTemplate] =
    useState<AvailableTextTemplate>("itMakesMeThinkAbout");

  useEffect(() => {
    for (let template of availableTextTemplates) {
      // initialize pressed button to first template that has an answer associated to it
      const answer = storyPart.multimediaData.answersToTemplates[template];
      // found a valid option
      if (answer && answer.length > 0) {
        setSelectedTemplate(template);
        return;
      }
    }
    setSelectedTemplate("itMakesMeThinkAbout");
  }, [storyPart]);

  const { t } = useTranslation("gamGame");

  return (
    <ContainerCard upperDecorator>
      <StoryDisplaySelectionPanel>
        <StoryDisplayHeaderRow>
          <StoryDisplayQuitIcon onClick={onQuit} />
          <StoryDisplayActionButton onClick={onNextClicked} enabled>
            {t("next")}
          </StoryDisplayActionButton>
        </StoryDisplayHeaderRow>

        <ArtworkListDottedLine />

        <StoryDataContainer>
          <StoryDisplayUpperPanel>
            <StoryDisplayMainInfoPanel>
              <ArtworkTitle>
                {artworkData
                  ? artworkData.title
                  : t("artworkNoLongerInCollection")}
              </ArtworkTitle>
              <ArtworkAuthor>{artworkData?.author}</ArtworkAuthor>
            </StoryDisplayMainInfoPanel>
          </StoryDisplayUpperPanel>

          <ArtworkListDottedLine />

          <TemplateRow>
            {availableTextTemplates.map((elem) => {
              const answer = storyPart.multimediaData.answersToTemplates[elem];
              if (answer && answer.length > 0) {
                return (
                  <TemplateSelector
                    key={elem}
                    enabled={elem === selectedTemplate}
                    onClick={() => setSelectedTemplate(elem)}
                  >
                    {templateIcons[elem]}
                  </TemplateSelector>
                );
              } else {
                return (
                  <DisabledTemplateSelector key={elem}>
                    {templateIcons[elem]}
                  </DisabledTemplateSelector>
                );
              }
            })}
          </TemplateRow>

          <ArtworkListDottedLine />

          <ArtworkDescription>
            <b>{t(selectedTemplate)}...</b>{" "}
            {storyPart.multimediaData.answersToTemplates[selectedTemplate]}
          </ArtworkDescription>
        </StoryDataContainer>
        <ArtworkDecorationPanel
          editEnabled={false}
          artworkSrc={
            artworkData?.src ??
            "https://img.buzzfeed.com/buzzfeed-static/static/2014-08/28/11/enhanced/webdr04/anigif_enhanced-7021-1409238769-1.gif?output-format=mp4"
          }
          emojis={storyPart.multimediaData.emojis}
          tags={storyPart.multimediaData.tags}
        />
      </StoryDisplaySelectionPanel>
    </ContainerCard>
  );
};

export default StoryPartView;

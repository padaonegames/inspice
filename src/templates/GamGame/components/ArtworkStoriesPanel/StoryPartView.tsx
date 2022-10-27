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
import { HandThumbsUp } from "@styled-icons/bootstrap/HandThumbsUp";
import { HandThumbsUpFill } from "@styled-icons/bootstrap/HandThumbsUpFill";
import { Explore } from "@styled-icons/material-outlined/Explore";
import { BackInTime } from "@styled-icons/entypo/BackInTime";
import { Equals } from "@styled-icons/fa-solid/Equals";
import { NotEqual } from "@styled-icons/fa-solid/NotEqual";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";

const StoryActionsButtonStyle = css`
  height: 1.75em;
  width: 1.75em;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  margin-left: 0.75em;
`;

const LikeIcon = styled(HandThumbsUp)`
  ${StoryActionsButtonStyle}
`;

const LikeIconFilled = styled(HandThumbsUpFill)`
  ${StoryActionsButtonStyle}
`;

const ExploreStoriesIcon = styled(Explore)`
  height: 1.75em;
  width: 1.75em;
  color: ${(props) => props.theme.textColor};
`;

const ExploreStoriesContainer = styled.div`
  ${StoryActionsButtonStyle}
  position: relative;
`;

const SimilarOppositeOverlayStyle = css`
  position: absolute;
  bottom: 2.5%;
  right: -0.2em;
  height: 0.85em;
  width: 0.85em;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.textColor};
  padding: 0.075em;
`;

const SimilarOverlayIcon = styled(Equals)`
  ${SimilarOppositeOverlayStyle}
`;

const OppositeOverlayIcon = styled(NotEqual)`
  ${SimilarOppositeOverlayStyle}
`;

const StoryActionsRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;

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
  /** Callback to parent specifying that the user wishes to close this story */
  onQuit?: () => void;

  /** whether previous artwork button is enabled */
  hasPrevious?: boolean;
  /** whether next artwork button is enabled */
  hasNext?: boolean;
  /** Callback to parent specifying that the user wishes to move to the previous artwork */
  onPreviousArtworkClicked?: () => void;
  /** Callback to parent specifying that the user wishes to move to the next artwork */
  onNextArtworkClicked?: () => void;
  /** whether this story has been liked by the user */
  liked?: boolean;
  /** callback to parent specifying that user wishes to change whether they like the current story or not */
  onLikeStatusChanged?: (value: boolean) => void;
} // StoryPartViewProps

export const StoryPartView = (props: StoryPartViewProps): JSX.Element => {
  const {
    storyPart,
    artworkData,
    onQuit,
    hasNext,
    hasPrevious,
    onPreviousArtworkClicked,
    onNextArtworkClicked,
    liked,
    onLikeStatusChanged,
  } = props;

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

  const handleLikeStatusChanged = (status: boolean) => {
    if (!onLikeStatusChanged) return;
    onLikeStatusChanged(status);
  }; // handleLikeClicked

  const { t } = useTranslation("gamGame");
  const navigate = useNavigate();

  return (
    <ContainerCard upperDecorator>
      <StoryDisplaySelectionPanel>
        <StoryDisplayHeaderRow>
          <StoryDisplayQuitIcon onClick={onQuit} />
          <StoryActionsRow>
            <ExploreStoriesContainer
              title={t("exploreSimilarStories")}
              onClick={() => navigate("recommend-stories?relation=similar")}
            >
              <ExploreStoriesIcon />
              <SimilarOverlayIcon />
            </ExploreStoriesContainer>
            <ExploreStoriesContainer
              title={t("exploreOppositeStories")}
              onClick={() => navigate("recommend-stories?relation=opposite")}
            >
              <ExploreStoriesIcon />
              <OppositeOverlayIcon />
            </ExploreStoriesContainer>

            {!liked && (
              <LikeIcon
                title={t("likeThisStory")}
                onClick={() => handleLikeStatusChanged(true)}
              />
            )}
            {liked && (
              <LikeIconFilled
                title={t("dislikeThisStory")}
                onClick={() => handleLikeStatusChanged(false)}
              />
            )}
          </StoryActionsRow>
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
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          onNextArtworkClicked={onNextArtworkClicked}
          onPreviousArtworkClicked={onPreviousArtworkClicked}
        />
      </StoryDisplaySelectionPanel>
    </ContainerCard>
  );
};

export default StoryPartView;

import styled, { css } from "styled-components";
import ActivityCard, { ActivityCardProps } from "../components/ActivityCard";
import { CreateFromTemplateCard } from "../components/CreateFromTemplateCard";
import { FormNew } from "@styled-icons/fluentui-system-regular/FormNew";
import { Unity } from "@styled-icons/simple-icons/Unity";
import { Museum } from "@styled-icons/material-rounded/Museum";

const Root = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ActivityTemplatesRow = styled.div`
  width: 100%;
  height: auto;
  background-color: ${(props) => props.theme.bodyBackground};
`;

const ActivityTemplatesContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  padding: 1em 0;
`;

const templateIcon = css`
  color: ${(props) => props.theme.textColor};
  height: 50%;
  width: auto;
  margin: auto;
`;

const MultistageFormIcon = styled(FormNew)`
  ${templateIcon}
  color: #fecb00;
`;

const EscapeRoomIcon = styled(Unity)`
  ${templateIcon}
`;

const GamGameIcon = styled(Museum)`
  ${templateIcon}
  color: #0060a9;
`;

const WidthLimiter = styled.div`
  min-width: 684px;
  width: 85%;
  align-self: center;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ActivityCardGrid = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: left;
  padding: 1em 0;
`;

const RecentActivitiesHeader = styled.div`
  font-family: ${(props) => props.theme.contentFont};
  color: ${(props) => props.theme.textColor};
  font-size: 1.15em;
  margin-left: 0;
  padding-top: 1.75em;
  padding-bottom: 0.5em;
  padding-right: 0;
`;

interface BaseDashboardProps {
  activityCardData: (ActivityCardProps & { key: string })[];
} // BaseDashboardProps

export const BaseDashboard = (props: BaseDashboardProps): JSX.Element => {
  const { activityCardData } = props;

  const handleCreateGamGameClicked = () => {
    window.open(`/gam-game/curator/create`);
  }; // handleCreateGamGameClicked

  const handleCreateMultistageFormClicked = () => {
    window.open(`/multistage-form/curator/new-activity`);
  }; // handleCreateGamGameClicked

  const handleCreateEscapeRoomClicked = () => {
    window.open(`/escape-room/curator/new-activity`);
  }; // handleCreateGamGameClicked

  return (
    <Root>
      <ActivityTemplatesRow>
        <WidthLimiter>
          <RecentActivitiesHeader>Create an activity</RecentActivitiesHeader>
          <ActivityTemplatesContainer>
            <CreateFromTemplateCard
              title="GAM game"
              cardContent={<GamGameIcon />}
              onCardClicked={handleCreateGamGameClicked}
            />
            <CreateFromTemplateCard
              title="Multistage form"
              cardContent={<MultistageFormIcon />}
              onCardClicked={handleCreateMultistageFormClicked}
            />
            <CreateFromTemplateCard
              title="Escape room"
              cardContent={<EscapeRoomIcon />}
              onCardClicked={handleCreateEscapeRoomClicked}
            />
          </ActivityTemplatesContainer>
        </WidthLimiter>
      </ActivityTemplatesRow>
      <WidthLimiter>
        <RecentActivitiesHeader>Recent activities</RecentActivitiesHeader>
        <ActivityCardGrid>
          {activityCardData.map((activityCard) => (
            <ActivityCard {...activityCard} />
          ))}
        </ActivityCardGrid>
      </WidthLimiter>
    </Root>
  );
}; // TemplateDashBoardView

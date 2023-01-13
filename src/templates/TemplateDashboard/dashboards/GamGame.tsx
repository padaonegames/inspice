import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Plus } from "styled-icons/bootstrap";
import LoadingOverlay from "../../../components/Layout/LoadingOverlay";
import { gamGameApi } from "../../../services";
import {
  GamGameActivityDefinition,
  CompletedGamGameActivityDefinition,
} from "../../../services/gamGameActivity.model";
import { useAsyncRequest } from "../../../services/useAsyncRequest";
import { useScrollBlock } from "../../../utils/useScrollBlock";
import ActivityCard from "../components/ActivityCard";
import ActivitySessionsPopup from "../components/ActivitySessionsPopup";
import NewActivityPopup from "../components/NewActivityPopup";

const Root = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const WidthLimiter = styled.div`
  min-width: 684px;
  width: 85%;
  align-self: center;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
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

const NewActivityButton = styled.div`
  width: 70%;
  height: 48px;
  background-color: ${(props) =>
    `hsl(10, 80%, ${props.theme.textReadableLuminosity}%)`};
  border-radius: 50px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 0.5rem 0px;
  }
`;

const NewActivityIcon = styled(Plus)`
  color: white;
  height: 42px;
  width: 42px;
  margin-left: 7px;
`;

const NewActivityText = styled.span`
  color: white;
  font-weight: bold;
  font-family: ${(props) => props.theme.contentFont};
  font-size: 0.875rem;
  margin-left: 7px;
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

export const GamGameDashboard = (): JSX.Element => {
  const [activityToDelete, setActivityToDelete] =
    useState<string | undefined>(undefined);

  const fetchGamGameActivities = async () => {
    return gamGameApi.getGamGameActivityDefinitions();
  }; // fetchGamGameActivities

  const deleteActivity = async () => {
    if (!activityToDelete) return;
    const res = await gamGameApi.deleteGamGameActivityDefinitionById(
      activityToDelete
    );
    setActivityToDelete(undefined);
    triggerFetchGamGameActivities();
    return res;
  }; // deleteActivity

  const [fetchGamGameActivitiesRequest, triggerFetchGamGameActivities] =
    useAsyncRequest(fetchGamGameActivities, []);
  const [deleteActivityRequest] = useAsyncRequest(
    deleteActivity,
    [activityToDelete],
    false
  );

  if (fetchGamGameActivitiesRequest.kind !== "success") {
    return <LoadingOverlay message="Fetching activity definitions" />;
  }

  if (fetchGamGameActivitiesRequest.result.kind !== "ok") {
    return (
      <LoadingOverlay message="There was an error while fetching the activities from the LDH" />
    );
  }

  if (deleteActivityRequest.kind === "running") {
    return <LoadingOverlay message="Deleting activity definition" />;
  }

  return (
    <TemplateDashBoardView
      activities={[...fetchGamGameActivitiesRequest.result.data]}
      onDeleteActivity={(id) => setActivityToDelete(id)}
    />
  );
}; // GamGameDashboard

interface TemplateDashboardViewProps {
  activities: GamGameActivityDefinition[];
  onDeleteActivity?: (activityId: string) => void;
} // TemplateDashboardViewProps

const TemplateDashBoardView = (
  props: TemplateDashboardViewProps
): JSX.Element => {
  const { activities, onDeleteActivity } = props;

  const navigate = useNavigate();

  // whether new activity popup should be open
  const [newActivityPopupOpen, setNewActivityPopupOpen] =
    useState<boolean>(false);
  // which activity has been selected to manage sessions, if any
  const [selectedActivitySessions, setSelectedActivitySessions] =
    useState<string | undefined>(undefined);

  useScrollBlock(
    newActivityPopupOpen || selectedActivitySessions !== undefined
  );

  const handleOpenActivity = (activity: GamGameActivityDefinition) => {
    navigate(`/gam-game/consumer/visit/${activity._id}`);
  }; // handleOpenActivity

  const handleEditActivity = (activity: GamGameActivityDefinition) => {
    navigate(`/gam-game/curator/create`, {
      state: activity,
    });
  }; // handleEditActivity

  const handleDuplicateActivity = (activity: GamGameActivityDefinition) => {
    const { _id, ...duplicatedActivity } = activity;
    navigate(`/gam-game/curator/create`, {
      state: duplicatedActivity as CompletedGamGameActivityDefinition,
    });
  }; // handleDuplicateActivity

  const handleOpenTemplate = () => {
    navigate(`/gam-game/curator/create`);
  }; // handleOpenTemplate

  const handleDeleteActivity = (activity: GamGameActivityDefinition) => {
    if (onDeleteActivity) {
      onDeleteActivity(activity._id ?? "");
    }
  }; // handleDeleteActivity

  const handleOpenActivitySessions = (sessionId: string) => {
    setSelectedActivitySessions(sessionId);
  }; // handleOpenActivitySessions

  return (
    <Root>
      <WidthLimiter>
        <RecentActivitiesHeader>Recent Activities</RecentActivitiesHeader>
        <ActivityCardGrid>
          {activities.flatMap((activity) => (
            <ActivityCard
              key={activity._id}
              title={activity.activityTitle}
              author={activity.activityAuthor}
              thumbnailSrc={activity.imageSrc}
              activityActions={[]}
            />
          ))}
        </ActivityCardGrid>
      </WidthLimiter>

      {newActivityPopupOpen && (
        <NewActivityPopup
          onPopupClose={() => setNewActivityPopupOpen(false)}
          onTemplateSelected={handleOpenTemplate}
        />
      )}
      {selectedActivitySessions && (
        <ActivitySessionsPopup
          activityId={selectedActivitySessions}
          onPopupClose={() => setSelectedActivitySessions(undefined)}
        />
      )}
    </Root>
  );
}; // TemplateDashBoardView

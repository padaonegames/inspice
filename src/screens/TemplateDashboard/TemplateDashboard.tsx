import styled from "styled-components";
import CheckBoxInput from "../../components/Forms/CheckBoxInput";
import { ActivityCard, EmptyCard } from "./components/ActivityCard";
import { ActivityInstance, supportedActivities, SupportedActivity } from "../../services/activity.model";
import { useAsyncRequest } from "../../services/useAsyncRequest";
import { api, gamGameApi } from "../../services";
import LoadingOverlay from "../../components/Layout/LoadingOverlay";
import { useNavigate } from "react-router-dom";
import { FindArtworkActivityDefinition } from "../../services/findArtworkActivity.model";
import { GamGameActivityDefinition } from "../../services/gamGameActivity.model";
import { Plus } from "styled-icons/bootstrap";
import NewActivityPopup from "./components/NewActivityPopup";
import { useEffect, useState } from "react";

const GridContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100% !important;
  height: 100%;
  width: 100%;
  margin-top: 1rem;
  border-top: solid 1px #D5DBDB;
`;

const GridFilters = styled.div`
  padding-left: 20px;
  padding-bottom: 10px;
  padding-top: 20px;
  border-right: solid 1px #D5DBDB;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  width: 20%;
  min-width: 170px;
  max-width: 250px;
  background-color: ${props => props.theme.cardBackground};
`;

const GridFilterHeader = styled.div`
  padding-top: 20px;
  padding-bottom: 5px;
  font-weight: bold;
  width: 100%;
  color: ${props => props.theme.textColor};
  font-family: ${props => props.theme.contentFont};
`;

const GridFilterOption = styled.div`
  margin-top: 2px;
  border-top: none;
`;

const ActivityCardGrid = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  -moz-box-pack: center;
  justify-content: center;
  padding: 1rem 0;
  background-color: ${props => props.theme.selectArtworkChoicesBackground};
`;

const NewActivityButton = styled.div`
  width: 70%;
  height: 48px;
  background-color: ${props => `hsl(10, 80%, ${props.theme.textReadableLuminosity}%)`};
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
  font-family: ${props => props.theme.contentFont};
  font-size: 0.875rem;
  margin-left: 7px;
`;


export const TemplateDashboard = (): JSX.Element => {

  const fetchTreasureHuntActivities = async () => {
    return api.getFindArtworkActivityDefinitions();
  };

  const fetchGamGameActivities = async () => {
    return gamGameApi.getGamGameActivityDefinitions();
  };

  const [fetchTreasureHuntActivitiesRequest] = useAsyncRequest(fetchTreasureHuntActivities, []);
  const [fetchGamGameActivitiesRequest] = useAsyncRequest(fetchGamGameActivities, []);

  if (fetchTreasureHuntActivitiesRequest.kind !== 'success' || fetchGamGameActivitiesRequest.kind !== 'success') {
    return <LoadingOverlay message="Fetching activity definitions" />;
  }

  if (fetchTreasureHuntActivitiesRequest.result.kind !== 'ok' || fetchGamGameActivitiesRequest.result.kind !== 'ok') {
    return <LoadingOverlay message="There was an error while fetching the activities from the LDH" />;
  }

  return (
    <TemplateDashBoardView
      activities={[
        ...fetchTreasureHuntActivitiesRequest.result.data,
        ...fetchGamGameActivitiesRequest.result.data,
      ]}
    />
  );
};


interface TemplateDashboardViewProps {
  activities: ActivityInstance[]
}

const TemplateDashBoardView = (props: TemplateDashboardViewProps): JSX.Element => {

  const { activities: acts } = props;

  const navigate = useNavigate();
  const [newActivityPopupOpen, setNewActivityPopupOpen] = useState<boolean>(false);

  const activities: ActivityInstance[] = acts.map(elem => ({
    ...elem,
    beginsOn: new Date(elem.beginsOn),
    endsOn: new Date(elem.endsOn),
    activityType: (elem as Object).hasOwnProperty('huntDefinitionsDatasetUuid') ? 'Treasure Hunt' : 'GAM Game',
  }));

  const handleOpenActivity = (activity: ActivityInstance) => {
    switch (activity.activityType) {
      case 'Treasure Hunt':
        navigate(`/find-artwork/consumer/explore/${activity._id}`);
        break;
      case 'GAM Game':
        navigate(`/gam-game/consumer/visit/${activity._id}`);
        break;
      default: return;
    }
  };

  const handleEditActivity = (activity: ActivityInstance) => {
    switch (activity.activityType) {
      case 'Treasure Hunt':
        navigate(`/find-artwork/curator/create`, { state: activity as FindArtworkActivityDefinition });
        break;
      case 'GAM Game':
        navigate(`/gam-game/curator/create`, { state: activity as GamGameActivityDefinition });
        break;
      default: return;
    }
  };

  const handleOpenTemplate = (template: SupportedActivity) => {
    window.removeEventListener("scroll", noScroll);
    document.body.style.overflow = 'visible';
    switch (template) {
      case 'Treasure Hunt':
        navigate(`/find-artwork/curator/create`);
        break;
      case 'GAM Game':
        navigate(`/gam-game/curator/create`);
        break;
      default: return;
    }
  };

  const noScroll = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (newActivityPopupOpen) {
      window.addEventListener("scroll", noScroll);
      document.body.style.overflow = 'hidden';
    }
    else {
      window.removeEventListener("scroll", noScroll);
      document.body.style.overflow = 'visible';
    }

    return () => window.removeEventListener("scroll", noScroll);

  }, [newActivityPopupOpen]);

  return (
    <>
      <GridContainer>
        <GridFilters>
          <NewActivityButton
            title='Create a new Activity'
            onClick={() => setNewActivityPopupOpen(true)}
          >
            <NewActivityIcon />
            <NewActivityText>
              New Activity
            </NewActivityText>
          </NewActivityButton>
          <GridFilterHeader>Activity Type</GridFilterHeader>
          {supportedActivities.map(elem => (
            <GridFilterOption key={elem}>
              <CheckBoxInput
                labelText={elem}
                boxSize='15px'
                onCheckedChange={() => { }}
              />
            </GridFilterOption>
          ))}
        </GridFilters>
        <ActivityCardGrid>
          {activities.map(activity => (
            <ActivityCard
              key={activity._id}
              activityTemplate={activity}
              onOpenClicked={() => handleOpenActivity(activity)}
              onEditClicked={() => handleEditActivity(activity)}
            />
          ))}
          {[...Array(10)].map(i => <EmptyCard key={i} />) /* Hacky but does the trick */}
        </ActivityCardGrid>
      </GridContainer>
      {newActivityPopupOpen &&
        <NewActivityPopup
          onPopupClose={() => setNewActivityPopupOpen(false)}
          onTemplateSelected={handleOpenTemplate}
        />
      }
    </>
  );
};

const sample: ActivityInstance = {
  beginsOn: new Date(),
  endsOn: new Date(),
  activityAuthor: 'Alejandro',
  activityTitle: 'Flores de Cerezo',
  activityType: 'GAM Game',
  _id: 'dqeiuwhduiehwfiudwe'
};

const sample2: ActivityInstance = {
  beginsOn: new Date(),
  endsOn: new Date(),
  activityAuthor: 'Pedro',
  activityTitle: 'Flores de Manzano',
  activityType: 'Treasure Hunt',
  _id: 'dqeiuwhduiehwfiudwe'
};


const samples = [sample, sample2, sample, sample, sample2, sample2, sample];
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import LoadingOverlay from "../../../components/Layout/LoadingOverlay";
import { useGetMultistageFormActivitiesQuery } from "../../../services/multistageForm/common.api";
import { MultistageFormActivity } from "../../../services/multistageFormActivity.model";
import { useScrollBlock } from "../../../utils/useScrollBlock";
import { Open } from "@styled-icons/fluentui-system-filled/Open";
import { QuestionAnswer } from "@styled-icons/material-outlined/QuestionAnswer";
import { Edit } from "@styled-icons/boxicons-regular/Edit";
import { Duplicate } from "@styled-icons/ionicons-outline/Duplicate";
import { Delete } from "@styled-icons/fluentui-system-regular/Delete";
import { UsersCog } from "@styled-icons/fa-solid/UsersCog";
import { Museum } from "@styled-icons/material-rounded/Museum";
import { FormNew } from "@styled-icons/fluentui-system-regular/FormNew";
import { ActivityCardProps } from "../components/ActivityCard";
import ActivitySessionsPopup from "../components/ActivitySessionsPopup";
import { BaseDashboard } from "./BaseDashboard";
import { useGamGameActivities } from "./useGamGameActivities";
import {
  CompletedGamGameActivityDefinition,
  GamGameActivityDefinition,
} from "../../../services/gamGameActivity.model";

const activityTypeIcon = css`
  color: ${(props) => props.theme.textColor};
  display: inline-block;
  vertical-align: bottom;
  height: 1.5em;
  width: 1.5em;
  margin-right: 5px;
`;

const GamGameActivityIcon = styled(Museum)`
  ${activityTypeIcon}
  color: #0060a9;
`;

const MultistageFormActivityIcon = styled(FormNew)`
  ${activityTypeIcon}
  color: #fecb00;
`;

const menuItemIcon = css`
  color: ${(props) => props.theme.textColor};
  height: 20px;
  width: 20px;
  margin-right: 10px;
`;

const OpenActivityIcon = styled(Open)`
  ${menuItemIcon}
`;

const EditActivityIcon = styled(Edit)`
  ${menuItemIcon}
`;

const DuplicateActivityIcon = styled(Duplicate)`
  ${menuItemIcon}
`;

const DeleteActivityIcon = styled(Delete)`
  ${menuItemIcon}
`;

const SessionsActivityIcon = styled(UsersCog)`
  ${menuItemIcon}
`;

const ViewActivityResponesIcon = styled(QuestionAnswer)`
  ${menuItemIcon}
`;

export const MultistageFormDashboard = (): JSX.Element => {
  // which activity has been selected to manage sessions, if any
  const [selectedActivitySessions, setSelectedActivitySessions] =
    useState<string | undefined>(undefined);

  useScrollBlock(selectedActivitySessions !== undefined);
  const navigate = useNavigate();

  const {
    data: multistageFormActivities,
    isLoading: isGetMultistageFormActivitiesLoading,
    isSuccess: isGetMultistageFormActivitiesSuccess,
    isError: isGetMultistageFormActivitiesError,
  } = useGetMultistageFormActivitiesQuery();

  const {
    data: gamGameActivities,
    isLoading: isGetGamGameActivitiesLoading,
    isError: isGetGamGameActivitiesError,
  } = useGamGameActivities();

  if (isGetMultistageFormActivitiesLoading || isGetGamGameActivitiesLoading) {
    return <LoadingOverlay message="Fetching activity definitions" />;
  }

  if (
    isGetMultistageFormActivitiesError ||
    isGetGamGameActivitiesError ||
    (isGetMultistageFormActivitiesSuccess && !multistageFormActivities) ||
    !multistageFormActivities ||
    !gamGameActivities
  ) {
    return (
      <LoadingOverlay message="There was an error while fetching the activities from the LDH" />
    );
  }

  const generateGamGameActivityData = (): (ActivityCardProps & {
    key: string;
  })[] => {
    const handleOpenActivityInNewTab = (
      activity: GamGameActivityDefinition
    ) => {
      window.open(`/gam-game/consumer/visit/${activity._id}`);
    }; // handleOpenActivityInNewTab

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

    const handleOpenActivitySessions = (sessionId: string) => {
      setSelectedActivitySessions(sessionId);
    }; // handleOpenActivitySessions

    return gamGameActivities.map((activity) => ({
      key: activity._id,
      title: activity.activityTitle,
      author: activity.activityAuthor,
      thumbnailSrc: activity.imageSrc,
      activityIcon: <GamGameActivityIcon />,
      onCardClicked: () => handleEditActivity(activity),
      activityActions: [
        {
          displayName: "Open activity in new tab",
          iconComponent: <OpenActivityIcon />,
          onOptionSelected: () => handleOpenActivityInNewTab(activity),
        },
        {
          displayName: "Edit",
          iconComponent: <EditActivityIcon />,
          onOptionSelected: () => handleEditActivity(activity),
        },
        {
          displayName: "Duplicate",
          iconComponent: <DuplicateActivityIcon />,
          onOptionSelected: () => handleDuplicateActivity(activity),
        },
        {
          displayName: "Sessions",
          iconComponent: <SessionsActivityIcon />,
          onOptionSelected: () => handleOpenActivitySessions(activity._id),
        },
      ],
    }));
  }; // generateGamGamActivityData

  const generateMultistageFormActivityCardData = (): (ActivityCardProps & {
    key: string;
  })[] => {
    const handleOpenActivityInNewTab = (activity: MultistageFormActivity) => {
      window.open(`/multistage-form/consumer/view/${activity._id}`);
    }; // handleOpenActivityInNewTab

    const handleEditActivity = (activity: MultistageFormActivity) => {
      navigate(`/multistage-form/curator/create/${activity._id}`);
    }; // handleEditActivity

    const handleEditActivityInNewTab = (activity: MultistageFormActivity) => {
      window.open(`/multistage-form/curator/create/${activity._id}`);
    }; // handleEditActivityInNewTab

    const handleOpenViewResponsesInNewTab = (activityId: string) => {
      window.open(`/multistage-form/curator/view-responses/${activityId}`);
    }; // handleOpenViewRespones

    const handleOpenActivitySessions = (activityId: string) => {
      setSelectedActivitySessions(activityId);
    }; // handleOpenActivitySessions

    return multistageFormActivities.map((activity) => ({
      key: activity._id,
      title: activity.title,
      author: activity.author,
      thumbnailSrc: activity.thumbnailSrc,
      activityIcon: <MultistageFormActivityIcon />,
      onCardClicked: () => handleEditActivity(activity),
      activityActions: [
        {
          displayName: "Open Form in new Tab",
          iconComponent: <OpenActivityIcon />,
          onOptionSelected: () => handleOpenActivityInNewTab(activity),
        },
        {
          displayName: "View Responses in new Tab",
          iconComponent: <ViewActivityResponesIcon />,
          onOptionSelected: () => handleOpenViewResponsesInNewTab(activity._id),
        },
        {
          displayName: "Edit in new Tab",
          iconComponent: <EditActivityIcon />,
          onOptionSelected: () => handleEditActivityInNewTab(activity),
        },
        {
          displayName: "Sessions",
          iconComponent: <SessionsActivityIcon />,
          onOptionSelected: () => handleOpenActivitySessions(activity._id),
        },
      ],
    }));
  }; // generateMultistageFormActivityCardData

  const activityCardData = [
    ...generateGamGameActivityData(),
    ...generateMultistageFormActivityCardData(),
  ];

  return (
    <>
      <BaseDashboard activityCardData={activityCardData} />
      {selectedActivitySessions && (
        <ActivitySessionsPopup
          activityId={selectedActivitySessions}
          onPopupClose={() => setSelectedActivitySessions(undefined)}
        />
      )}
    </>
  );
}; // MultistageFormDashboard

/*
      {
        displayName: "Delete",
        iconComponent: <DeleteActivityIcon />,
        onOptionSelected: () => handleDeleteActivity(activity),
      },
*/

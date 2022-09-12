import { useState } from "react";
import styled, { css } from "styled-components";
import { ThreeDotsVertical } from "styled-icons/bootstrap";
import { UserCircle } from "styled-icons/boxicons-regular";
import { ActivityInstance } from "../../../services/activity.model";
import { Open } from "@styled-icons/fluentui-system-filled/Open";
import { Edit } from "@styled-icons/boxicons-regular/Edit";
import { Duplicate } from "@styled-icons/ionicons-outline/Duplicate";
import { Delete } from "@styled-icons/fluentui-system-regular/Delete";
import { UsersCog } from "@styled-icons/fa-solid/UsersCog";

const ActivityCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
  cursor: pointer;
  width: calc(100% - 1rem);
  margin: 0.6em;
  min-width: 290px;
  max-width: 18rem;
  border-radius: 0.35rem 0.25rem;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 0.5rem 0px;
  }
`;

export const EmptyCard = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: calc(100% - 1rem);
  margin: 0.6em;
  min-width: 290px;
  max-width: 18rem;
`;

const ActivityCardImage = styled.img`
  cursor: pointer;
  max-height: 200px;
  width: 100%;
  object-fit: cover;
`;

const ActivityImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.35rem 0.25rem 0 0;
  overflow: hidden;

  width: 100%;
  align-self: center;
  margin: 0 auto;
  position: relative;
`;

interface ActivityCardContentProps {
  hue?: number;
}
const ActivityCardContent = styled.div<ActivityCardContentProps>`
  height: 100%;
  flex: 1 1 0%;
  display: flex;
  flex-direction: row;
  -moz-box-pack: justify;
  justify-content: space-between;
  padding: 0.5rem 0.5rem 1rem;
  min-height: 3.5rem;
  background-color: ${(props) =>
    props.hue
      ? `hsl(${props.hue}, 80%, ${props.theme.textReadableLuminosity}%)`
      : props.theme.cardBackground};
  border-radius: 0 0 0.25rem 0.25rem;

  margin: 0px;
  padding: 0px;
  border: 0px none;
  font: inherit;

  backfrop-filter: brightness(300%);
`;

const ActivityTypeIcon = styled(UserCircle)`
  margin: auto 0.5rem;
  color: ${(props) => props.theme.textColor};
  display: inline-block;
  height: 2.5rem;
  width: 2.5rem;
`;

const ActivityTextContainer = styled.div`
  display: flex;
  margin: auto;
  min-width: 0px;
  width: 100%;
  flex-direction: column;
  max-height: 3.5rem;
`;

const ActivityTitle = styled.a`
  overflow: hidden;
  line-height: 1rem;
  font-weight: 700;
  color: ${(props) => props.theme.textColor};
  font-family: ${(props) => props.theme.clickableTextFont};
  width: 100%;
  text-overflow: ellipsis;
  align-self: flex-start;
  font-size: 0.95rem;
  text-decoration: none;
  letter-spacing: 0.75px;
  margin-bottom: 0.1rem;
`;

const ActivityAuthor = styled.a`
  display: flex;
  -moz-box-align: center;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  font-family: ${(props) => props.theme.clickableTextFont};
  overflow: hidden;
  text-decoration: none;
  font-weight: normal;
  font-size: 0.75em;
`;

const ActivityOptionsIcon = styled(ThreeDotsVertical)`
  color: ${(props) => props.theme.textColor};
  height: 100%;
  width: 100%;
  margin: auto;
  cursor: pointer;
  &:hover {
    transform: scale(1.25);
  }
`;

const ActivityOptionsContainer = styled.div`
  align-self: flex-end;
  height: 1.75em;
  width: 1.75em;
  margin: auto 10px;
  position: relative;
`;

interface ActivityTypeSpanProps {
  hue?: number;
}
const ActivityTypeSpan = styled.span<ActivityTypeSpanProps>`
  font-family: ${(props) => props.theme.clickableTextFont};
  font-size: 0.625em;
  font-weight: bold;
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 0.25rem 0.75rem;
  display: flex;
  -moz-box-align: center;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) =>
    props.hue
      ? `hsl(${props.hue}, 80%, ${props.theme.textReadableLuminosity}%)`
      : "#4a90e2"};
  border-radius: 0 0 0.25rem 0;
  box-shadow: rgba(37, 7, 107, 0.35) 0px 2px 4px 0px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  background-color: ${(props) => props.theme.cardBackground};
  min-width: 160px;
  box-shadow: rgba(37, 7, 107, 0.35) 0px 2px 4px 0px;
  z-index: 25;
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
`;

const DropdownMenuItem = styled.a`
  color: ${(props) => props.theme.textColor};
  padding: 12px 16px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  font-family: ${(props) => props.theme.contentFont};

  &:hover {
    background-color: darkgray;
  }
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

const DateSpan = styled.span`
  margin: 0.5rem;
  position: absolute;
  right: 0.2rem;
  bottom: 0px;

  font-family: ${(props) => props.theme.clickableTextFont};
  font-size: 0.625em;
  font-weight: bold;
  padding: 0.25rem 0.75rem;
  display: flex;
  -moz-box-align: center;
  align-items: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 0.25rem;
`;

export interface ActivityCardProps {
  /** Description and features about the activity. */
  activityTemplate: ActivityInstance;
  /** Callback to notify the parent when the card has been opened. */
  onOpenClicked?: () => void;
  /** Callback to notify the parent when the user wishes to manage the activity's sessions and users */
  onSessionsClicked?: () => void;
  /** Callback to notify the parent when the card is going to be edited. */
  onEditClicked?: () => void;
  /** Callback to notify the parent when the card is being duplicated. */
  onDuplicateClicked?: () => void;
  /** Callback to notify the parent when the card is being deleted. */
  onDeleteClicked?: () => void;
}

export const ActivityCard = (props: ActivityCardProps): JSX.Element => {
  const {
    activityTemplate,
    onOpenClicked,
    onSessionsClicked,
    onEditClicked,
    onDuplicateClicked,
    onDeleteClicked,
  } = props;

  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const hue = intToHue(hashCode(activityTemplate.activityType));
  const dateOpts: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
  };

  const handleOpenClicked = () => {
    setOpenMenu(false);
    if (onOpenClicked) onOpenClicked();
  }; // handleOpenClicked

  const handleSessionsClicked = () => {
    setOpenMenu(false);
    if (onSessionsClicked) onSessionsClicked();
  }; // handleSessionsClicked

  const handleEditClicked = () => {
    setOpenMenu(false);
    if (onEditClicked) onEditClicked();
  }; // handleEditClicked

  const handleDuplicateClicked = () => {
    setOpenMenu(false);
    if (onDuplicateClicked) onDuplicateClicked();
  }; // handleDuplicateClicked

  const handleDeleteClicked = () => {
    setOpenMenu(false);
    if (onDeleteClicked) onDeleteClicked();
  }; // handleDeleteClicked

  return (
    <ActivityCardContainer>
      <ActivityImageContainer>
        <ActivityCardImage
          src={
            activityTemplate.imageSrc ??
            "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
          }
        />
        <ActivityTypeSpan hue={hue}>
          {activityTemplate.activityType}
        </ActivityTypeSpan>
        <DateSpan>
          {`${activityTemplate.beginsOn.toLocaleDateString(
            undefined,
            dateOpts
          )} to ${activityTemplate.endsOn.toLocaleDateString(
            undefined,
            dateOpts
          )}`}
        </DateSpan>
      </ActivityImageContainer>
      <ActivityCardContent hue={hue}>
        <ActivityTypeIcon />
        <ActivityTextContainer>
          <ActivityTitle>{activityTemplate.activityTitle}</ActivityTitle>
          <ActivityAuthor>{activityTemplate.activityAuthor}</ActivityAuthor>
        </ActivityTextContainer>
        <ActivityOptionsContainer>
          <ActivityOptionsIcon onClick={() => setOpenMenu((prev) => !prev)} />
          {openMenu && (
            <DropdownMenu>
              <DropdownMenuItem onClick={handleOpenClicked}>
                <OpenActivityIcon />
                Open
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSessionsClicked}>
                <SessionsActivityIcon />
                Sessions
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleEditClicked}>
                <EditActivityIcon />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDuplicateClicked}>
                <DuplicateActivityIcon />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDeleteClicked}>
                <DeleteActivityIcon />
                Delete
              </DropdownMenuItem>
            </DropdownMenu>
          )}
        </ActivityOptionsContainer>
      </ActivityCardContent>
    </ActivityCardContainer>
  );
};

export default ActivityCard;

function hashCode(str: string | undefined) {
  // java String#hashCode
  if (!str) return 0;

  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 4) - hash);
  }
  return hash;
}

function intToHue(i: number) {
  var h = i % 360;
  return h;
}

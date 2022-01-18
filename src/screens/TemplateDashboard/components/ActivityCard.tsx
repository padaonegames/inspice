import { useState } from "react";
import styled from "styled-components";
import { ThreeDotsVertical } from "styled-icons/bootstrap";
import { UserCircle } from "styled-icons/boxicons-regular";
import { ActivityInstance } from "../../../services/activity.model";

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
  background-color: ${props => props.hue ? `hsl(${props.hue}, 80%, ${props.theme.textReadableLuminosity}%)` : props.theme.cardBackground};
  border-radius: 0 0 0.25rem 0.25rem;

  margin: 0px;
  padding: 0px;
  border: 0px none;
  font: inherit;

  backfrop-filter: brightness(300%);
`;

const ActivityTypeIcon = styled(UserCircle)`
  margin: auto 0.5rem;
  color: ${props => props.theme.textColor};
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
  max-height: 2.25rem;
  overflow: hidden;
  line-height: 1.25rem;
  font-weight: 700;
  color: ${props => props.theme.textColor};
  font-family: ${props => props.theme.clickableTextFont};
  width: 100%;
  text-overflow: ellipsis;
  align-self: flex-start;
  font-size: 0.95rem;
  text-decoration: none;
  letter-spacing: 0.75px;
`;

const ActivityAuthor = styled.a`
  display: flex;
  -moz-box-align: center;
  align-items: center;
  color: ${props => props.theme.textColor};
  font-family: ${props => props.theme.clickableTextFont};
  overflow: hidden;
  text-decoration: none;
  font-weight: normal;
  font-size: 0.75em;
`;

const ActivityOptionsIcon = styled(ThreeDotsVertical)`
  color: ${props => props.theme.textColor};
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
  font-family: ${props => props.theme.clickableTextFont};
  font-size: 0.625em;
  font-weight: bold;
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 0.25rem 0.75rem;
  display: flex;
  -moz-box-align: center;
  align-items: center;
  color: ${props => props.theme.textColor};
  background-color: ${props => props.hue ? `hsl(${props.hue}, 80%, ${props.theme.textReadableLuminosity}%)` : '#4a90e2'};
  border-radius: 0 0 0.25rem 0;
  box-shadow: rgba(37, 7, 107, 0.35) 0px 2px 4px 0px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  background-color: ${props => props.theme.cardBackground};
  min-width: 160px;
  box-shadow: rgba(37, 7, 107, 0.35) 0px 2px 4px 0px;
  z-index: 5;
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
`;

const DropdownMenuItem = styled.a`
  color: ${props => props.theme.textColor};
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-family: ${props => props.theme.contentFont};

  &:hover {
    background-color: darkgray;
  }
`;

export interface ActivityCardProps {
  activityTemplate: ActivityInstance;
}

export const ActivityCard = (props: ActivityCardProps): JSX.Element => {

  const { activityTemplate } = props;

  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const hue = intToHue(hashCode(activityTemplate.activityDefinitionsDatasetUuid));

  return (
    <ActivityCardContainer>
      <ActivityImageContainer>
        <ActivityCardImage src="https://images-cdn.kahoot.it/de070b9f-3d86-40e3-a8ab-6ad708e509c7?auto=webp&width=350" />
        <ActivityTypeSpan hue={hue}>
          {activityTemplate.activityDefinitionsDatasetUuid}
        </ActivityTypeSpan>
      </ActivityImageContainer>
      <ActivityCardContent hue={hue}>
        <ActivityTypeIcon />
        <ActivityTextContainer>
          <ActivityTitle>{activityTemplate.activityTitle}</ActivityTitle>
          <ActivityAuthor>{activityTemplate.activityAuthor}</ActivityAuthor>
        </ActivityTextContainer>
        <ActivityOptionsContainer>
          <ActivityOptionsIcon onClick={() => setOpenMenu(prev => !prev)}/>
          {openMenu && (
            <DropdownMenu>
              <DropdownMenuItem href="#">Details</DropdownMenuItem>
              <DropdownMenuItem href="#">Edit</DropdownMenuItem>
              <DropdownMenuItem href="#">Duplicate</DropdownMenuItem>
            </DropdownMenu>
          )}
        </ActivityOptionsContainer>
      </ActivityCardContent>
    </ActivityCardContainer>
  );
};

export default ActivityCard;

function hashCode(str: string) { // java String#hashCode
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

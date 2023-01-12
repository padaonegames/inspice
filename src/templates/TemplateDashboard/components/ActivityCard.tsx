import { useState } from "react";
import styled, { css } from "styled-components";
import { ThreeDotsVertical } from "styled-icons/bootstrap";
import { Open } from "@styled-icons/fluentui-system-filled/Open";
import { Edit } from "@styled-icons/boxicons-regular/Edit";
import { Duplicate } from "@styled-icons/ionicons-outline/Duplicate";
import { Delete } from "@styled-icons/fluentui-system-regular/Delete";
import { UsersCog } from "@styled-icons/fa-solid/UsersCog";
import DropdownMenu, {
  DropdownMenuOption,
} from "../../../components/Forms/DropdownMenu";

const ActivityCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 245px;
  cursor: pointer;
  margin-bottom: 20px;
  margin-right: 20px;
  width: 208px;
  border-radius: 0.35rem;
  border: 1px solid #dfe1e5;

  &:hover {
    border: 1px solid ${(props) => props.theme.secondaryButtonColor};
  }
`;

export const EmptyCard = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  margin-bottom: 20px;
  margin-right: 20px;
  width: 208px;
`;

interface ActivityCardImageProps {
  imgSrc: string;
}
const ActivityImageContainer = styled.div<ActivityCardImageProps>`
  border-top-left-radius: 0.35em;
  border-top-right-radius: 0.35em;
  height: 169px;
  width: 208px;
  overflow: hidden;
  align-self: center;
  margin: 0 auto;

  background-image: url(${(props) => props.imgSrc});
  background-repeat: no-repeat;
  background-size: 203px auto;
  background-position: 50% 50%;
  border: none;
  display: block;
  position: relative;
`;

const ActivityCardContent = styled.div`
  border-top: 1px solid #e2e2e2;
  padding: 16px 8px 14px 16px;
  position: relative;

  height: 74px;
  display: flex;
  flex-direction: row;
  -moz-box-pack: justify;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 0 0 0.35rem 0.35rem;

  font: inherit;
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
  line-height: 18px;
  font-weight: 500;
  color: ${(props) => props.theme.textColor};
  font-family: ${(props) => props.theme.clickableTextFont};
  width: 100%;
  text-overflow: ellipsis;
  align-self: flex-start;
  font-size: 0.75em;
  text-decoration: none;
  letter-spacing: 0.15px;
  margin-bottom: 0.1rem;
  white-space: nowrap;
`;

const ActivityAuthor = styled.a`
  display: inline-block;
  -moz-box-align: center;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  font-family: ${(props) => props.theme.clickableTextFont};
  overflow: hidden;
  text-decoration: none;
  font-weight: normal;
  font-size: 0.7em;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
`;

const ActivityOptionsIcon = styled(ThreeDotsVertical)`
  color: ${(props) => props.theme.textColor};
  height: 2em;
  width: 2em;
  margin: auto;
  padding: 0.4em;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    background-color: ${(props) => props.theme.hoverAreaColor};
  }
`;

const ActivityOptionsContainer = styled.div`
  align-self: flex-end;
  height: 1.75em;
  width: 1.75em;
  margin: auto 10px;
  position: relative;
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

const OverlaySpan = styled.span`
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
  /** Name of the activity. */
  title: string;
  /** Activity's author. */
  author: string;
  /** Preview image to show as a way to represent the image. */
  thumbnailSrc?: string;
  /** List of supported actions for this activity card. */
  activityActions: DropdownMenuOption[];
  /** icon component to be placed next to the author when rendering this card. Should be representative of activity type. */
  activityIcon?: JSX.Element;
  /** Callback to notify the parent when the card has been clicked. */
  onCardClicked?: () => void;
} // ActivityCardProps

export const ActivityCard = (props: ActivityCardProps): JSX.Element => {
  const {
    title,
    author,
    thumbnailSrc,
    activityActions,
    activityIcon,
    onCardClicked,
  } = props;

  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleOptionsClicked = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenu((prev) => !prev);
  }; // handleOptionsClicked

  return (
    <ActivityCardContainer onClick={onCardClicked}>
      <ActivityImageContainer
        imgSrc={
          thumbnailSrc ??
          "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
        }
      ></ActivityImageContainer>
      <ActivityCardContent>
        <ActivityTextContainer>
          <ActivityTitle>{title}</ActivityTitle>
          <ActivityAuthor>
            {activityIcon !== undefined && activityIcon}
            {author}
          </ActivityAuthor>
        </ActivityTextContainer>
        <ActivityOptionsContainer>
          <ActivityOptionsIcon onClick={handleOptionsClicked} />
          {openMenu && (
            <DropdownMenu
              width="250px"
              onCloseDropdown={() => setOpenMenu(false)}
              options={activityActions}
              positioning={{ bottom: "35px", left: "-100px" }}
            />
          )}
        </ActivityOptionsContainer>
      </ActivityCardContent>
    </ActivityCardContainer>
  );
};

export default ActivityCard;

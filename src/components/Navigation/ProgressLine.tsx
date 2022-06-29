import React from 'react';
import styled, { css } from 'styled-components';

import { CloudUpload } from '@styled-icons/boxicons-regular/CloudUpload';
import { ClockOutline } from '@styled-icons/evaicons-outline/ClockOutline';
import { DoneAllOutline } from '@styled-icons/evaicons-outline/DoneAllOutline';
import { MapPin } from '@styled-icons/boxicons-regular/MapPin';
import { XCircle } from '@styled-icons/boxicons-regular/XCircle';

const RoadLineWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 95%;
  max-width: 1200px;
  min-width: 780px;
  height: 65px;
  margin: auto;
`;

interface StageWrapperProps {
  width: number;
};

const StageWrapper = styled.div<StageWrapperProps>`
  width: ${props => props.width}%;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  align-self: center;
`;

const iconStyle = css`
  color: white;
  height: 27px;
  width: 27px;
  margin: 5px;
`;

const LocationIcon = styled(MapPin)`
  ${iconStyle}
`;

const PendingIcon = styled(ClockOutline)`
  ${iconStyle}
`;

const DoneIcon = styled(DoneAllOutline)`
  ${iconStyle}
`;

const RemoveStageButtonTooltip = styled.span`
  visibility: hidden;
  width: 130px;
  background-color: darkgray;
  color: white;
  text-align: center;
  padding: 7px;
  border-radius: 6px;

  font-size: 0.75em;
  font-style: italic;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1000;
  top: -11px;
  right: -150px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.5s;

  &::after {
    content: "";
    position: absolute;
    top: 20%;
    left: 0%;
    margin-left: -9px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent darkgray transparent transparent;
  }
`;

interface RemoveStageButtonIconProps {
  removalAllowed: boolean;
};
const RemoveStageButtonIcon = styled(XCircle) <RemoveStageButtonIconProps>`
  position: absolute;
  top: -15.5%;
  z-index: 1000;
  right: -16.5%;
  color: ${props => props.removalAllowed ? 'black' : 'darkgray'};
  background-color: #f3f3f3; /* Hack */
  height: 18px;
  width: 18px;
  transform: scale(1.0);
  transition: transform 0.5s ease;

  /* Fade in icon */
  opacity: 1;
  transition: opacity 0.5s;

  cursor: ${props => props.removalAllowed ? 'pointer' : 'default'};

  &:hover {
    transform: ${props => props.removalAllowed ? 'scale(1.25)' : 'scale(1.0)'};
  }
`;

interface StageNumberProps {
  selected: boolean;
  completed: boolean;
  editing: boolean;
};

const StageNumber = styled.div<StageNumberProps>`
  border-radius: 50%;
  background-color: ${props => props.selected ? '#c44c49' : (props.completed ? '#f49997' : '#a9a9a9')};
  width: 45px;
  height: 45px;
  text-align: center;
  margin-bottom: 9px;
  z-index: 2;
  transform: ${props => (!props.selected || props.editing) ? 'scale(1)' : 'scale(1.2)'};
  transition: transform 0.5s ease;

  &:hover {
    cursor: ${props => (props.selected || props.editing) ? 'default' : 'pointer'};
    transform: ${props => (props.editing) ? 'scale(1)' : 'scale(1.2)'};
  }
`;

interface FlagStageProps {
  active: boolean;
};

const FlagStage = styled.div<FlagStageProps>`
  border-radius: 50%;
  background-color: ${props => props.active ? '#b7625e' : 'lightgray'};
  width: 45px;
  height: 45px;
  text-align: center;
  margin-bottom: 7px;
  z-index: 2;

  transform: ${props => props.active ? 'scale(1)' : 'scale(0.9)'};
  transition: transform 0.5s ease;
  &:hover {
    cursor: ${props => props.active ? 'pointer' : 'default'};
    transform: ${props => props.active ? 'scale(1.1)' : 'scale(0.9)'};
  }
`;

const FlagIcon = styled(CloudUpload)`
  color: white;
  height: 27px;
  width: 27px;
  margin: 5px;
`;

interface StageDataContainerProps {
  removalEnabled: boolean;
}
const StageDataContainer = styled.div<StageDataContainerProps>`
  height: 70px;
  padding: 10px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  align-self: center;
  transition: border 0s;
  margin-bottom: 5px;

  ${props => props.removalEnabled && 'border: 2px dashed #c44c49'};

  &:hover {
    ${RemoveStageButtonTooltip} {
      ${props => props.removalEnabled && 'visibility: visible;'}
      ${props => props.removalEnabled && 'opacity: 1;'}
    }
  }
`;

interface StageDescriptionProps {
  selected: boolean;
};

const StageDescription = styled.div<StageDescriptionProps>`
  font-size: ${props => props.selected ? '0.675em' : '0.6em'};
  font-weight: 400;
  letter-spacing: +1px;
  font-family: 'EB Garamond';
  align-self: center;
`;

interface DividerLineProps {
  width: number;
  active: boolean;
  last: boolean;
};

const DividerLine = styled.div<DividerLineProps>`
  height: 1px;
  z-index: 0;
  width: ${props => props.width}%;
  border-top: ${props => props.active ? `3px solid ${props.last ? '#b7625e' : '#f49997'}` : '2px dotted darkgray'};
  position: absolute;
  top: 13px;
  left: 50%;
`;

export interface ProgressLineProps {
  /**
   * Currently active item, which will be highlighted to set it apart from the rest of items.
   */
  currentItem: number;
  /**
   * List of available stages to select from. Each entry contains information about the 
   * name of the stage and whether it has already been completed by the user or not.
   * Also specifies if stage can be removed when clicking on edit stages.
   * Names will be used to display the label for each stage.
   */
  items: { name: string, completed: boolean, canBeRemoved?: boolean }[];
  /**
   * Caption/label for the last button at the end of the stage sequence, generally used as a submission
   * button for the activity built during the creation process. If not provided, this last button 
   * will not be rendered.
   */
  finalItemCaption?: string;
  /**
   * Whether we are in edit mode, allowing reorder/remove items (if removalAllowed == true).
   */
  editing?: boolean;
  /**
   * Whether we are allow to remove elements in edit mode or not.
   */
  removalAllowed?: boolean;
  /**
   * Callback to notify the parent component about a specific item being selected (by index).
   */
  onItemSelected?: (index: number) => void;
  /**
   * Callback to notify the parent component about the removal of an item from the list by the user (by index).
   */
  onRemoveItem?: (index: number) => void;
  /**
   * Callback to notify the parent component about the task being submitted (submit button clicked).
   */
  onSubmit?: () => void;
};

/**
 * + Not editing, no removal or addition enabled.
 * 
 * <img src="media://ProgressLineNoEdit.PNG" alt="ProgressLineNoEdit">
 * 
 * + Not editing, no removal or addition enabled.
 * 
 * <img src="media://ProgressLineEditing.PNG" alt="ProgressLineEditing">
 */
export const ProgressLine: React.FC<ProgressLineProps> = ({
  currentItem,
  items,
  finalItemCaption,
  editing = false,
  removalAllowed = true,
  onItemSelected,
  onRemoveItem,
  onSubmit,
}) => {

  return (
    <RoadLineWrapper>
      {items.map((item, index) => {
        return (
          <StageWrapper
            width={100 / (items.length + 1)}
            key={index}
          >
            <StageDataContainer removalEnabled={editing && (item.canBeRemoved ?? false)}>
              <StageNumber
                editing={editing}
                selected={index === currentItem}
                completed={item.completed}
                onClick={() => {
                  if (onItemSelected && !editing)
                    onItemSelected(index);
                }}
              >
                {index === currentItem ? <LocationIcon /> : (
                  item.completed ? <DoneIcon /> : <PendingIcon />
                )}
              </StageNumber>
              <StageDescription
                selected={index === currentItem}
              >
                {item.name}
              </StageDescription>
              {editing && item.canBeRemoved && (
                <>
                  <RemoveStageButtonIcon
                    removalAllowed={removalAllowed}
                    onClick={() => {
                      if (onRemoveItem && removalAllowed)
                        onRemoveItem(index);
                    }}
                  />
                  {!removalAllowed && (
                    <RemoveStageButtonTooltip>
                      This activity must have at least {items.length} items.
                    </RemoveStageButtonTooltip>
                  )}
                </>
              )}
            </StageDataContainer>
            {(index !== items.length - 1 || (index === items.length - 1 && finalItemCaption)) && (
              <DividerLine
                last={index === items.length - 1}
                width={100}
                active={index === items.length - 1 ? items.every(elem => elem.completed) : item.completed}
              />
            )}
          </StageWrapper>
        );
      })}
      {finalItemCaption && (
        <StageWrapper
          width={100 / (items.length + 1)}
          key={items.length}
        >
          <FlagStage
            active={items.every(item => item.completed)}
            onClick={() => {
              if (items.every(item => item.completed) && onSubmit) {
                onSubmit();
              }
            }}
          >
            <FlagIcon />
          </FlagStage>
          <StageDescription
            selected={false}
          >
            {finalItemCaption}
          </StageDescription>
        </StageWrapper>
      )}
    </RoadLineWrapper>
  );
}

export default ProgressLine;
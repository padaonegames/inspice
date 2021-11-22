import React from 'react';
import styled, { css } from 'styled-components';

import { PlusCircle } from '@styled-icons/boxicons-regular/PlusCircle';
import { Edit } from '@styled-icons/boxicons-regular/Edit';
import { XCircle } from '@styled-icons/boxicons-regular/XCircle';

const StageButtonText = styled.p`
  font-size: 0.7em;
  font-weight: 400;
  letter-spacing: +1px;
  font-family: 'EB Garamond';
`;

const stageButtonIconStyle = css`
  color: black;
  height: 35px;
  weight: 35px;
  align-self: center;
  margin-bottom: 8px;
`;

const AddStageButtonIcon = styled(PlusCircle)`
  ${stageButtonIconStyle}
`;

const EditStagesButtonIcon = styled(Edit)`
  ${stageButtonIconStyle}
`;

const CancelEditStagesButtonIcon = styled(XCircle)`
  ${stageButtonIconStyle}
`;

interface StageButtonCornerProps {
  enabled: boolean;
};

const StageButtonCorner = styled.div<StageButtonCornerProps>`
  width: 115px;
  height: 100%;
  display: flex;
  margin: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: scale(0.9);
  transition: transform ease 0.5s;

  ${AddStageButtonIcon} {
    color: ${props => props.enabled ? 'black' : 'darkgray'}
  }

  ${EditStagesButtonIcon} {
    color: ${props => props.enabled ? 'black' : 'darkgray'}
  }

  ${StageButtonText} {
    color: ${props => props.enabled ? 'black' : 'darkgray'}
  }

  ${props => props.enabled &&
    `
    &:hover {
      cursor: pointer;
      transform: scale(1);
      transition: transform ease 0.5s;
    }
    `
  }
`;

export interface StageButtonPanelProps {
  /**
   * Whether this panel will react to user clicks (and be rendered as if it does).
   */
  enabled: boolean;
  /**
   * Text to display beneath panel's icon.
   */
  panelText?: string;
  /**
   * Icon to display in this panel.
   */
  panelIconType: 'edit' | 'add' | 'cancel';
  /**
   * Callback to parent component to notify about user clicking on the stage button.
   */
  onButtonClicked?: () => void;
};

export const StageButtonPanel: React.FC<StageButtonPanelProps> = ({
  onButtonClicked,
  enabled,
  panelText,
  panelIconType
}) => {

  const renderIcon = () => {
    switch (panelIconType) {
      case 'add': return <AddStageButtonIcon />;
      case 'edit': return <EditStagesButtonIcon />;
      case 'cancel': return <CancelEditStagesButtonIcon />;
    }
  }

  return (
    <StageButtonCorner
      enabled={enabled}
      onClick={() => {
        if (enabled && onButtonClicked) {
          onButtonClicked();
        }
      }}
    >
      {renderIcon()}
      <StageButtonText>
        {panelText}
      </StageButtonText>
    </StageButtonCorner>
  );
}

export default StageButtonPanel;
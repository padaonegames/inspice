import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const PointsCornerScore = styled.p`
  font-size: 2.2em;
  font-weight: 500;
  letter-spacing: +1px;
  font-family: 'EB Garamond';
`;

const PointsCornerText = styled.p`
  font-size: 0.8em;
  font-weight: 400;
  letter-spacing: +1px;
  font-family: 'EB Garamond';
`;

const PointsCorner = styled.div`
  width: 24.5%;
  margin-left: 0;
  margin-right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: scale(0.9);
  transition: transform linear 0.3s;

  &:hover {
    transform: scale(1);
    transition: transform linear 0.3s;
  }
`;

export interface PointsPanelProps {
  /** Score of the user updated. */
  points: number
};

/**
 * A simple box to show the user the total points that they have.
 */
export const PointsPanel: React.FC<PointsPanelProps> = ({ points }) => {

  const { t } = useTranslation('app');

  return (
    <PointsCorner>
      <PointsCornerScore>
        {points}
      </PointsCornerScore>
      <PointsCornerText>
        {t('points')}
      </PointsCornerText>
    </PointsCorner>
  );
}

export default PointsPanel;
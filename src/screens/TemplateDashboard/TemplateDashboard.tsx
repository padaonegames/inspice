import { useState } from "react";
import styled from "styled-components";
import { UserCircle } from "styled-icons/boxicons-regular";
import CheckBoxInput from "../../components/Forms/CheckBoxInput";
import { ThreeDotsVertical } from "styled-icons/bootstrap";
import { ActivityCard } from "./components/ActivityCard";
import { ActivityInstance } from "../../services/activity.model";

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
  background-color: ${props => props.theme.headerBackground};
`;


export interface ActivitySource {
  /**
   * UUID from Linked Data Hub where activities from this source are stored.
   */
  activityDefinitionsDatasetUuid: string;
  /**
   * Display name for this source's activities. This is what will get rendered
   * when the application prompts the user to select an activity template, as well
   * as whenever a component renders what activity template is being used for a particular
   * activity instance.
   */
  sourceName: string;
}

export const TemplateDashboard = (): JSX.Element => {

  const [sources, setSources] = useState<ActivitySource[]>([]);

  const activityTypes = ['Treasure Hunt', 'Gam Game'];

  const sample: ActivityInstance = {
    beginsOn: new Date(),
    endsOn: new Date(),
    activityAuthor: 'Alejandro',
    activityTitle: 'Flores de Cerezo',
    activityDefinitionsDatasetUuid: 'GAM Game',
    _id: 'dqeiuwhduiehwfiudwe'
  };

  const sample2: ActivityInstance = {
    beginsOn: new Date(),
    endsOn: new Date(),
    activityAuthor: 'Pedro',
    activityTitle: 'Flores de Manzano',
    activityDefinitionsDatasetUuid: 'Treasure Hunt',
    _id: 'dqeiuwhduiehwfiudwe'
  };

  const sample3: ActivityInstance = {
    beginsOn: new Date(),
    endsOn: new Date(),
    activityAuthor: 'Pedro',
    activityTitle: 'Flores de Manzano',
    activityDefinitionsDatasetUuid: 'Gam Viewpoints',
    _id: 'dqeiuwhduiehwfiudwe'
  };

  return (
    <GridContainer>
      <GridFilters>
        <GridFilterHeader>Activity Type</GridFilterHeader>
        {activityTypes.map(elem => (
          <GridFilterOption>
            <CheckBoxInput
              labelText={elem}
              boxSize='15px'
              onCheckedChange={() => { }}
            />
          </GridFilterOption>
        ))}
      </GridFilters>
      <ActivityCardGrid>
        {[sample, sample2, sample, sample3, sample, sample2, sample3, sample].map(elem => (
          <ActivityCard
            activityTemplate={elem}
          />
        ))}
      </ActivityCardGrid>
    </GridContainer>
  );

};
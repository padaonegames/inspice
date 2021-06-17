import React from 'react';
import styled from 'styled-components';
import { useAsyncRequest } from '../services/useAsyncRequest';
import { api } from '../services';

const Root = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  font-family: Raleway;
`;

const LinksColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2%;
  height: auto;
  width: 33.33%;
`;

const Link = styled.a`
  &:hover{
    text-decoration: underline;
  }
  margin-bottom: 10px;
  font-size: 0.75em;
`;

const BrowseDefinitionsScreen: React.FC = () => {

  const fetchActivityDefinitions = async () => {
    return await api.getFindArtworkActivityDefinitions();
  };

  const fetchTreasureHuntDefinitions = async () => {
    return await api.getTreasureHuntDefinitions();
  };

  const [fetchActivityDefinitionStatus] = useAsyncRequest(fetchActivityDefinitions, []);
  const [fetchTreasureHuntDefinitionStatus] = useAsyncRequest(fetchTreasureHuntDefinitions, []);


  if (!(fetchActivityDefinitionStatus.kind === 'success' && fetchActivityDefinitionStatus.result.kind === 'ok')) {
    return <p>Fetching activity definitions...</p>;
  }

  if (!(fetchTreasureHuntDefinitionStatus.kind === 'success' && fetchTreasureHuntDefinitionStatus.result.kind === 'ok')) {
    return <p>Fetching treasure hunt definitions...</p>;
  }

  const activities = fetchActivityDefinitionStatus.result.data;
  const hunts = fetchTreasureHuntDefinitionStatus.result.data;

  return (
    <Root>
      <LinksColumn>
        <h2>Link to create activity screen</h2>
        <Link href={window.location.origin + '/curator/create'}>
          Create Find Artwork Activity
          </Link>
      </LinksColumn>
      <LinksColumn>
        <h2>Links to activities</h2>
        {activities.map((elem, i) =>
          <Link key={elem._id} href={window.location.origin + '/consumer/create/' + elem._id}>
            {i}. {elem.activityTitle || 'unnamed'} (id: {elem._id})
          </Link>)}
      </LinksColumn>
      <LinksColumn>
        <h2>Links to treasure hunts</h2>
        {hunts.map((elem, i) =>
          <Link key={elem._id} href={window.location.origin + '/consumer/play/' + elem._id}>
            {i}. id: {elem._id} from activity {activities.find(act => act._id === elem.activityId)?.activityTitle} ({elem.stages.length} stages)
          </Link>
        )}
      </LinksColumn>
    </Root>
  );
}

export default BrowseDefinitionsScreen;
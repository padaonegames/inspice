import React from 'react';
import styled from 'styled-components';
import { useAsyncRequest } from '../services/useAsyncRequest';
import { api } from '../services';
import { useHistory, useParams } from 'react-router-dom';
import lineBackground from './../components/line-header-point.png'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 35px;
  justify-content: center;
  align-items: center;
`;

const VerticalSeparator = styled.div`
  width: 85%;
  max-width: 960px;
  height: 1px;
  background: url(${lineBackground}) repeat-x 0 center;
  margin-bottom: 25px;
  margin-top: 25px;
`;

const TitleText = styled.h2`
  align-self: center;
  color: #3f3c2d;
  letter-spacing: +0.5px;
  font-family: Raleway;
  margin-top: 10px;
  text-transform: uppercase;
`;

const ExplanatoryText = styled.p`
  max-width: 960px;
  width: 85%;
  align-self: center;
  text-align: justify;
  font-size: 1em;
  color: #3f3c2d;
  letter-spacing: +0.2px;
  font-family: Raleway;
  line-height: 25px;
  margin-bottom: 25px;
  b {
    font-weight: 700;
  }
`;

const TreasureHuntListHeader = styled.h3`
  width: 50%;
  max-width: 600px;
  font-size: 1.2em;
  text-align: center;
  background: url(${lineBackground}) repeat-x 0 center;
  margin-bottom: 10px;
  span {
    background: #f9f9f9;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const TreasureHuntGrid = styled.div`
  position: relative;
  height: fit-content;
  width: 85%;
  max-width: 960px;
  min-width: 580px;
  display: flex;
  flex-wrap: wrap;
  align-self: top;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 20px;
`;

const TreasureHuntBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  color: #878787;
  justify-content: center;
  width: 230px;
  height: 65px;
  margin-right: 10px;
  margin-bottom: 10px;
  border: 1px solid #a71c15;
  cursor: pointer;
  transition: background-color 0.4s,color 0.4s;

  &:hover {
    color: white;
    background-color: #a71c15;
  }
`;

const TreasureHuntText = styled.p`
  font-size: 0.9em;
  width: 85%;
  overflow-wrap: break-word;
  margin: auto;
  text-transform: uppercase;
`;

const ExploreActivityScreen: React.FC = () => {

  let { id } = useParams<{ id: string }>();
  let history = useHistory();

  const fetchActivityDefinition = async () => {
    return await api.getFindArtworkActivityDefinitionById(id);
  };

  const fetchTreasureHuntDefinitions = async () => {
    return await api.getTreasureHuntDefinitionsByActivityId(id);
  };

  const [fetchActivityDefinitionStatus] = useAsyncRequest(fetchActivityDefinition, []);
  const [fetchTreasureHuntDefinitionsStatus] = useAsyncRequest(fetchTreasureHuntDefinitions, []);


  if (!(fetchActivityDefinitionStatus.kind === 'success' && fetchActivityDefinitionStatus.result.kind === 'ok')) {
    return <p>Fetching activity definition...</p>;
  }

  if (!(fetchTreasureHuntDefinitionsStatus.kind === 'success' && fetchTreasureHuntDefinitionsStatus.result.kind === 'ok')) {
    return <p>Fetching treasure hunt definitions...</p>;
  }

  const activities = fetchActivityDefinitionStatus.result.data;
  const hunts = fetchTreasureHuntDefinitionsStatus.result.data;

  return (
    <Root>
      <TitleText>Create a Treasure Hunt</TitleText>
      <ExplanatoryText>
        The museum is hosting the activity "{fetchActivityDefinitionStatus.result.data[0].activityTitle}", in which visitors may create their own
        treasure hunts to share with others. To participate in the activity, you may click on the <b>Create new game</b> button bellow, where you will be
        guided through the process of selecting different artworks from a given art collection, writing hints to help other visitors find your paintings,
        and adding your personalised messages to the treasure hunt as a reward for completing your game.
      </ExplanatoryText>
      <TreasureHuntBox onClick={() => history.push('/consumer/create/' + activities[0]._id)}>
        <TreasureHuntText>
          Create new game
        </TreasureHuntText>
      </TreasureHuntBox>
      <VerticalSeparator />
      <TitleText>Explore other users' treasure hunts</TitleText>
      <ExplanatoryText>
        Alternatively, you may choose to play one of the treasure hunts created by other visitors by selecting a game of your choice from the list below.
        The game will take you through different stages in which you will need to use the provided hints to figure out what artwork the treasure hunt creator
        was thinking of when picking the piece. The first clue will always be free, but subsequent hints will require you to forfeit some of your points to get
        them, so do your best to find the correct artworks with as few clues as possible!
      </ExplanatoryText>

      <TreasureHuntListHeader>
        <span>
          Available hunts
        </span>
      </TreasureHuntListHeader>
      <TreasureHuntGrid>
        {hunts.map((elem, _) =>
          <TreasureHuntBox
            onClick={() => history.push('/consumer/play/' + elem._id)}
            key={elem._id}
          >
            <TreasureHuntText>
              {elem.treasureHuntTitle || 'Unnamed Game'}
            </TreasureHuntText>
          </TreasureHuntBox>)}
      </TreasureHuntGrid>
    </Root>
  );
}

export default ExploreActivityScreen;
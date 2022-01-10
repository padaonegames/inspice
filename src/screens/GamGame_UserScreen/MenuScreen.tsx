import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Outlet, useParams } from 'react-router';
import { useAsyncRequest } from '../../services/useAsyncRequest';
import { artworksService, gamGameApi } from '../../services';
import LoadingOverlay from '../../components/Layout/LoadingOverlay';
import { ArtworkData } from '../../services/artwork.model';
import { GamGameActivityDefinition, GamGameStoryDefinition } from '../../services/gamGameActivity.model';
import NavigationFooter from '../../components/Layout/NavigationFooter';
import { State, Step, Steps, StepsConfig } from '../../components/Navigation/Steps';
import BasicInformationStep from '../CreateTreasureHunt/Steps/BasicInformationStep';
import GeneralInformationStep from './Steps/GeneralInformationStep';
import CollectionStep from './Steps/CollectionStep';
import ScanQrStep from './Steps/ScanQrStep';
import InspectArtworkStep from './Steps/InspectArtworkStep';
import { Navigate, Route, Routes } from 'react-router-dom';
import GeneralArtworkDetail from './components/GeneralArtworkDetail';
import ArtworkStoriesPanel from './components/ArtworkStoriesPanel';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

/**
 * Screen used to manage the flow of a user navigating through the application.
 * (Gam Game)
 */
//------------------------------------------------------------------
//             FIRST STAGE: Fetch activity definition
//------------------------------------------------------------------
export const GamGameUserMenuScreen = () => {

  // fetch id from url
  let { id } = useParams() as { id: string };

  //-----------------------------------------------
  //          Fetch Activity Definition
  //-----------------------------------------------

  // Fetch activity definition from server by url params' id
  const fetchActivityDefinition = async () => {
    return await gamGameApi.getGamGameActivityDefinitionById(id);
  };

  // Make request on first render
  const [fetchActivityDefinitionStatus] = useAsyncRequest(fetchActivityDefinition, []);

  if (!(fetchActivityDefinitionStatus.kind === 'success' && fetchActivityDefinitionStatus.result.kind === 'ok')) {
    return <LoadingOverlay message='Fetching activity definition' />;
  }

  // cache the value of our activityDefinition after it is found.
  const activityDefinition = fetchActivityDefinitionStatus.result.data[0];
  return <LoadActivityArtworks activityDefinition={activityDefinition} />
};

//------------------------------------------------------------------
//                 SECOND STAGE: Fetch artworks
//------------------------------------------------------------------
interface LoadActivityArtworksProps {
  activityDefinition: GamGameActivityDefinition;
};

const LoadActivityArtworks = ({ activityDefinition }: LoadActivityArtworksProps): JSX.Element => {

  //-----------------------------------------------
  //          Fetch Activity Artworks
  //-----------------------------------------------

  // Use activity's definition to request the corresponding artworks from server
  const fetchActivityArtworks = async () => {
    return artworksService.fetchArtworks({ filter: { ids: activityDefinition.artworks } });
  };

  // Make request only after having a valid activity definition.
  const [fetchActivityArtworksStatus] = useAsyncRequest(fetchActivityArtworks, []);

  if (!(fetchActivityArtworksStatus.kind === 'success' && fetchActivityArtworksStatus.result.kind === 'ok')) {
    return <LoadingOverlay message='Fetching activity artworks' />;
  }

  // cache the value of our activityArtworks after they are fetched.
  const { artworks, count: artworkCount } = fetchActivityArtworksStatus.result.data;

  return (
    <GamGameUserFlow
      activityDefinition={activityDefinition}
      artworks={artworks}
      artworkCount={artworkCount}
    />
  );
};

//------------------------------------------------------------------
//               THIRD STAGE: User Flow
//------------------------------------------------------------------
interface GamGameUserFlowProps {
  activityDefinition: GamGameActivityDefinition;
  artworks: ArtworkData[];
  artworkCount: number;
};

const story: GamGameStoryDefinition = {
  _id: '',
  GamGameStoryAuthor: 'Pablo Gutiérrez',
  GamGameStoryTitle: 'Mi nueva historia de prueba',
  activityId: '',
  artworkId: '',
  multimediaData: {
    tags: [
      { tag: '#divertido', locationX: 0.15, locationY: 0.15 },
      { tag: '#guay', locationX: 0.85, locationY: 0.85 },
    ],
    emojis: [
      { emoji: '🤩', locationX: 0.25, locationY: 0.25 },
      { emoji: '🥰', locationX: 0.5, locationY: 0.25 }
    ],
    text: 'Me ha gustado mucho esta obra'
  }
};

const GamGameUserFlow = ({ activityDefinition, artworks, artworkCount }: GamGameUserFlowProps): JSX.Element => {

  return (
    <Root>
      <Routes>
        <Route path='home' element={<GeneralInformationStep />} />
        <Route path='collection' element={<CollectionStep artworks={artworks} />} />
        <Route path='collection/:artworkId' element={<InspectArtworkStep artworks={artworks} />}>
          <Route path='detail' element={
            <GeneralArtworkDetail artworks={artworks} />} />
          <Route path='stories' element={
            <ArtworkStoriesPanel artworks={artworks} stories={[story, story, story]} />} />
          <Route path='' element={<Navigate replace to='detail' />} />
        </Route>
        <Route path='scan-qr' element={<ScanQrStep />} />
        <Route path='my-stories' element={<GeneralInformationStep />} />
        <Route path='' element={<Navigate replace to='home' />} />
      </Routes>
      <NavigationFooter />
    </Root>
  );
};

export default GamGameUserMenuScreen;
import { createContext } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useAsyncRequest } from '../../services/useAsyncRequest';
import { artworksService, gamGameApi } from '../../services';
import LoadingOverlay from '../../components/Layout/LoadingOverlay';
import { ArtworkData } from '../../services/artwork.model';
import { GamGameActivityDefinition } from '../../services/gamGameActivity.model';
import NavigationFooter from '../../components/Layout/NavigationFooter';
import GeneralInformationStep from './Steps/GeneralInformationStep';
import CollectionStep from './Steps/CollectionStep';
import ScanQrStep from './Steps/ScanQrStep';
import InspectArtworkStep from './Steps/InspectArtworkStep';
import { Navigate, Route, Routes } from 'react-router-dom';
import GeneralArtworkDetail from './components/GeneralArtworkDetail';
import ArtworkStoriesPanel from './components/ArtworkStoriesPanel';
import ArtworkStoryView from './components/ArtworkStoriesPanel/ArtworkStoryView';
import ArtworkStoriesList from './components/ArtworkStoriesPanel/ArtworkStoriesList';
import CreateArtworkStory from './components/ArtworkStoriesPanel/CreateArtworkStory';

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

export interface ArtworksContext {
  activity: GamGameActivityDefinition;
  artworks: ArtworkData[];
}

export const ArtworksContext = createContext<ArtworksContext>({
  artworks: [],
  activity: {
    _id: '',
    activityTitle: '',
    activityAuthor: '',
    activityDefinitionsDatasetUuid: '',
    artworksDatasetUuid: '',
    storyDefinitionsDatasetUuid: '',
    beginsOn: new Date(),
    endsOn: new Date(),
    minArtworks: 0,
    maxArtworks: 0,
    artworks: [],
    allowedResponseTypes: []
  }
});

const GamGameUserFlow = ({ activityDefinition, artworks, artworkCount }: GamGameUserFlowProps): JSX.Element => {

  return (
    <Root>
      <ArtworksContext.Provider value={{ artworks, activity: activityDefinition }}>
        <Routes>
          <Route path='home' element={<GeneralInformationStep />} />
          <Route path='collection' element={<CollectionStep />} />
          <Route path='collection/:artworkId/*' element={<InspectArtworkStep />}>
            <Route path='detail' element={<GeneralArtworkDetail artworks={artworks} />} />
            <Route path='stories/*' element={<ArtworkStoriesPanel />}>
              <Route path='all' element={<ArtworkStoriesList />} />
              <Route path='create' element={<CreateArtworkStory />} />
              <Route path=':storyId' element={<ArtworkStoryView />} />
              <Route path='' element={<Navigate replace to='all' />} />
            </Route>
            <Route path='' element={<Navigate replace to='detail' />} />
          </Route>
          <Route path='scan-qr' element={<ScanQrStep />} />
          <Route path='my-stories' element={<GeneralInformationStep />} />
          <Route path='' element={<Navigate replace to='home' />} />
        </Routes>
      </ArtworksContext.Provider>
      <NavigationFooter />
    </Root>
  );
};

export default GamGameUserMenuScreen;
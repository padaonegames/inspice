import { createContext } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useAsyncRequest } from '../../../services/useAsyncRequest';
import { artworksService, gamGameApi } from '../../../services';
import LoadingOverlay from '../../../components/Layout/LoadingOverlay';
import { ArtworkData } from '../../../services/artwork.model';
import { GamGameActivityDefinition } from '../../../services/gamGameActivity.model';
import GeneralInformationStep from './Steps/GeneralInformationStep';
import CollectionStep from './Steps/CollectionStep';
import ScanQrStep from './Steps/ScanQrStep';
import InspectArtworkStep from './Steps/InspectArtworkStep';
import { Navigate, Route, Routes } from 'react-router-dom';
import ArtworkStoriesPanel from '../components/ArtworkStoriesPanel';
import ArtworkStoriesList from '../components/ArtworkStoriesPanel/ArtworkStoriesList';
import ArtworkStoryView from '../components/ArtworkStoriesPanel/ArtworkStoryView';
import CreateArtworkStory from '../components/ArtworkStoriesPanel/CreateArtworkStory';
import GeneralArtworkDetail from '../components/GeneralArtworkDetail';
import { NavMenuElem } from '../../../components/Layout/SideMenu';
import ActivityScreen from '../../../screens/ActivityScreen';
import { QrCode } from 'styled-icons/remix-line';
import { Home } from '@styled-icons/boxicons-regular/Home';
import { Gallery } from '@styled-icons/remix-line/Gallery';
import { Books } from '@styled-icons/icomoon/Books';

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

export interface IGamGameActivityContext {
  activity: GamGameActivityDefinition;
  artworks: ArtworkData[];
}

export const GamGameActivityContext = createContext<IGamGameActivityContext>({
  artworks: [],
  activity: {
    _id: '',
    activityType: 'GAM Game',
    activityTitle: '',
    activityAuthor: '',
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

const gamGameNavigationConfig: NavMenuElem[] = [
  {
    title: 'Home',
    to: 'home',
    icon: Home
  },
  {
    title: 'Collection',
    to: 'collection',
    icon: Gallery
  },
  {
    title: 'Scan QR',
    to: 'scan-qr',
    icon: QrCode
  },
  {
    title: 'My Stories',
    to: 'my-stories',
    icon: Books
  },
];

const GamGameUserFlow = ({ activityDefinition, artworks, artworkCount }: GamGameUserFlowProps): JSX.Element => {

  return (
    <Root>
      <GamGameActivityContext.Provider value={{ artworks, activity: activityDefinition }}>
        <Routes>
          <Route
            path=''
            element={<ActivityScreen
              guarded
              activityTitle='GAM - GAM Game'
              navigationEntries={gamGameNavigationConfig}
            />}>
            <Route path='home' element={<GeneralInformationStep />} />
            <Route path='collection' element={<CollectionStep />} />
            <Route path='collection/:artworkId/*' element={<InspectArtworkStep />}>
              <Route path='detail' element={<GeneralArtworkDetail artworks={artworks} />} />
              <Route path='stories/*' element={<ArtworkStoriesPanel />}>
                <Route path='all' element={<ArtworkStoriesList />} />
                <Route path='create' element={<CreateArtworkStory />} />
                <Route path=':storyId' element={<ArtworkStoryView />} />
                <Route index element={<ArtworkStoriesList />} />
              </Route>
              <Route path='' element={<Navigate replace to='detail' />} />
            </Route>
            <Route path='scan-qr' element={<ScanQrStep />} />
            <Route path='my-stories' element={<GeneralInformationStep />} />
            <Route path='' element={<Navigate replace to='home' />} />
          </Route>
        </Routes>
      </GamGameActivityContext.Provider>
    </Root>
  );
};

export default GamGameUserMenuScreen;
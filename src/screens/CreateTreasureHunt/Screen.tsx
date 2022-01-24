import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useAsyncRequest } from '../../services/useAsyncRequest';
import { api, artworksService } from '../../services';
import { useNavigate } from 'react-router-dom';
import { BasicInformationStep } from './Steps/BasicInformationStep';
import LoadingOverlay from '../../components/Layout/LoadingOverlay';
import { ArtworkData } from '../../services/artwork.model';
import { InProgressTreasureHuntStage, CompletedTreasureHuntDefinition, InProgressTreasureHuntDefinition, FindArtworkActivityDefinition } from '../../services/findArtworkActivity.model';
import { useTranslation } from 'react-i18next';
import ActivityCreationOverviewPanel, { ActivityCreationOverviewPanelProps } from '../../components/Navigation/ActivityCreationOverviewPanel';
import { State, Step, StepComponentProps, StepProps, Steps, StepsConfig } from '../../components/Navigation/Steps';
import CreateStageStep from './Steps/CreateStageStep';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

/**
 * Screen used to manage a treasure hunt creation flow. When loaded, component will attempt to extract
 * an activity id from the browser's active url parameters and, if sucessful, will perform subsequent API
 * calls to the activity and treasure hunt backends to retrieve all relevant information to render the page.
 * 
 * + Input basic information:
 * 
 * <img src="media://FindArtwork-consumer-create-dark-01.PNG" alt="FindArtwork [consumer-create-dark-01]">
 * 
 * + Select Artwork:
 * 
 * <img src="media://FindArtwork-consumer-create-dark-02.PNG" alt="FindArtwork [consumer-create-dark-02]">
 * 
 * + Write Hints:
 * 
 * <img src="media://FindArtwork-consumer-create-dark-03.PNG" alt="FindArtwork [consumer-create-dark-03]">
 * 
 * + Write Prizes:
 * 
 * <img src="media://FindArtwork-consumer-create-dark-04.PNG" alt="FindArtwork [consumer-create-dark-04]">
 * 
 */
//------------------------------------------------------------------
//             FIRST STAGE: Fetch activity definition
//------------------------------------------------------------------
export const CreateTreasureHuntScreen = () => {

  // fetch id from url
  let { id } = useParams() as { id: string };

  //-----------------------------------------------
  //          Fetch Activity Definition
  //-----------------------------------------------

  // Fetch activity definition from server by url params' id
  const fetchActivityDefinition = async () => {
    return await api.getFindArtworkActivityDefinitionById(id);
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
  activityDefinition: FindArtworkActivityDefinition;
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
    <BuildTreasureHuntDefinition
      activityDefinition={activityDefinition}
      artworks={artworks}
      artworkCount={artworkCount}
    />
  );
};

const isStageCompleted = (stage: InProgressTreasureHuntStage): boolean => {
  return stage.artworkId !== undefined &&
    stage.clues !== undefined && stage.clues.length > 0 && stage.clues.every(elem => elem.length > 0) &&
    stage.multimediaData !== undefined && stage.multimediaData.length > 0 &&
    stage.multimediaData.length > 0 && stage.multimediaData.every(
      elem => elem.kind === 'Text' ?
        (elem.text && elem.text.length > 0) :
        (elem.src && elem.src.length > 0)
    );
};

//------------------------------------------------------------------
//               THIRD STAGE: Build Definition
//------------------------------------------------------------------
interface BuildTreasureHuntDefinitionProps {
  activityDefinition: FindArtworkActivityDefinition;
  artworks: ArtworkData[];
  artworkCount: number;
};

const BuildTreasureHuntDefinition = ({ activityDefinition, artworks, artworkCount }: BuildTreasureHuntDefinitionProps): JSX.Element => {

  let navigate = useNavigate();
  const { t } = useTranslation();

  //-----------------------------------------------
  //       Submit a Treasure Hunt definition
  //-----------------------------------------------

  // Make request to server to submit the current game definition
  const submitDefinition = () => {
    const parsedTreasureHuntDefinition = treasureHuntDefinition as CompletedTreasureHuntDefinition;
    if (!submitGame || parsedTreasureHuntDefinition === undefined) return Promise.reject();
    setSubmitGame(false);
    return api.submitTreasureHuntDefinition({ ...(treasureHuntDefinition as CompletedTreasureHuntDefinition) });
  };

  // boolean variable that will trigger a submit game action when set to true
  const [submitGame, setSubmitGame] = useState<boolean>(false);
  // Make request after submitGame is activated
  const [submitGameStatus] = useAsyncRequest(submitDefinition, [submitGame]);

  //-----------------------------------------------
  //       Build Treasure Hunt Definition
  //-----------------------------------------------

  // Current state of the treasure hunt definition.
  const [treasureHuntDefinition, setTreasureHuntDefinition] = useState<State>({
    treasureHuntTitle: '',
    treasureHuntAuthor: '',
    activityId: activityDefinition._id,
    stages: Array.from(Array(activityDefinition.minStages).keys()).map(_ => ({
      artworkId: undefined,
      clues: Array.from(Array(activityDefinition.minCluesPerStage).keys()).map(_ => ''),
      multimediaData: [{ kind: 'Text', text: '' }]
    }))
  });

  // Add an additional stage to the treasure hunt
  const handleAddStage = () => {
    setTreasureHuntDefinition(prev => {
      const newDef = Object.assign({}, prev);
      newDef['stages'] = [...newDef['stages'] as InProgressTreasureHuntStage[], {
        artworkId: undefined,
        clues: Array.from(Array(activityDefinition.minCluesPerStage).keys()).map(_ => ''),
        multimediaData: [{ kind: 'Text', text: '' }]
      }];
      return newDef;
    });
  };

  // Remove a stage from the treasure hunt
  const handleRemoveStage = (index: number) => {
    // index here is stage index (not counting basic information)
    setTreasureHuntDefinition(prev => {
      let aux: InProgressTreasureHuntStage[] = JSON.parse(JSON.stringify(prev['stages']));
      const filtStages = aux.filter((_, ind) => ind !== index);
      return { ...prev, stages: filtStages };
    });
  };

  // check if basic information is completed
  const isBasicInformationCompleted = () => {
    return (!!treasureHuntDefinition.treasureHuntAuthor && (treasureHuntDefinition['treasureHuntAuthor'] as string ?? '').length > 0 &&
      !!treasureHuntDefinition.treasureHuntTitle && (treasureHuntDefinition['treasureHuntTitle'] as string ?? '').length > 0);
  };

  useEffect(() => {
    if (submitGameStatus.kind === 'success' && submitGameStatus.result.kind === 'ok') {
      window.alert('Your treasure hunt was successfully uploaded to the linked data hub.');
      navigate('/find-artwork/consumer/explore/' + activityDefinition._id);
    }
  }, [submitGameStatus, navigate, activityDefinition._id]);

  const computeStageData = (): {
    name: string;
    completed: boolean;
    canBeRemoved?: boolean;
  }[] => {
    return [
      {
        name: 'Basic Information'.toUpperCase(),
        completed: isBasicInformationCompleted(),
      },
      ...((treasureHuntDefinition['stages'] ?? []) as InProgressTreasureHuntStage[]).map((stage, i) => ({
        name: `Phase ${i + 1}`.toUpperCase(),
        completed: isStageCompleted(stage),
        canBeRemoved: true
      }))
    ];
  };


  const config: StepsConfig = {
    navigation: {
      location: 'before',
      component: (props: ActivityCreationOverviewPanelProps) =>
        <ActivityCreationOverviewPanel
          {...props}
          stages={computeStageData()}
          minStages={activityDefinition.minStages}
          maxStages={activityDefinition.maxStages}
          onAddNewStage={handleAddStage}
          onRemoveStage={(index) => handleRemoveStage(index - 1)}
          onSubmitActivity={() => setSubmitGame(true)}
          addStagePanelText={t('newPhase')}
          editStagesPanelText={t('editItems')}
          cancelEditStagesPanelText={t('cancelEditing')}
          finaItemCaption={t('submitGame')}
          enableStageAddition
        />
    }
  };

  const stageSteps: ReactElement<StepProps<StepComponentProps>>[] =
    ((treasureHuntDefinition['stages'] ?? []) as InProgressTreasureHuntStage[])
      .map((stage, i) => (
        <Step
          key={i}
          title={`Create Stage ${i + 1}`}
          component={CreateStageStep}
          artworks={artworks}
          activityDefinition={activityDefinition}
        />
      ));

  return (
    <Root>
      <Steps
        config={config}
        genState={treasureHuntDefinition}
        setGenState={setTreasureHuntDefinition}
      >
        {[
          <Step title='Input Basic Information' component={BasicInformationStep} />,
          ...stageSteps
        ]}
      </Steps>
    </Root>
  );
};

export default CreateTreasureHuntScreen;
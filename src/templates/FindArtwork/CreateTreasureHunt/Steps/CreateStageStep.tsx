import { useEffect, useState } from "react";
import ActivityCreationOverviewPanel, { ActivityCreationOverviewPanelProps } from "../../../../components/Navigation/ActivityCreationOverviewPanel";
import { State, Step, StepComponentProps, Steps, StepsConfig } from "../../../../components/Navigation/Steps";
import { ArtworkData } from "../../../../services/artwork.model";
import { FindArtworkActivityDefinition, TreasureHuntMutimediaData } from "../../../../services/findArtworkActivity.model";
import SelectArtworkStep from "./CreateStageSubSteps/SelectArtworkStep";
import { WriteHintsStep } from "./CreateStageSubSteps/WriteHintsStep";
import { WritePrizesStep } from "./CreateStageSubSteps/WritePrizesStep";

export interface CreateStageStepProps extends StepComponentProps {
  activityDefinition: FindArtworkActivityDefinition;
  artworks: ArtworkData[];
};

const defaultState = {
  artworkId: undefined, // string | undefined
  clues: [], // string[]
  multimediaData: [] // TreasureHuntMutimediaData[]
};

export const CreateStageStep = (props: CreateStageStepProps): JSX.Element => {

  const { activityDefinition, artworks, getState, setState, order } = props;

  const [stageState, setStageState] = useState<State>(
    getState<State[]>(`stages`, [])[order - 1] ?? defaultState);

  useEffect(() => {
    setState<State[]>(`stages`,
      (prevStages) => {
        prevStages[order - 1] = stageState;
        return prevStages;
      },
      [stageState]);
  }, [stageState]);

  const selectArtworkCompleted = (): boolean => {
    return stageState['artworkId'] !== undefined;
  };

  const writeHintsCompleted = (): boolean => {
    const hints = stageState['clues'] as string[] ?? [];
    return hints.length >= activityDefinition.minCluesPerStage &&
      hints.length <= activityDefinition.maxCluesPerStage &&
      hints.every(h => h.length > 0);
  };

  const writePrizesCompleted = (): boolean => {
    const prizes = stageState['multimediaData'] as TreasureHuntMutimediaData[] ?? [];
    return prizes.length >= 1 &&
    prizes.every(p => p.kind === 'Text' && p.text.length > 0);
  };

  const config: StepsConfig = {
    navigation: {
      location: 'before',
      component: (navProps: ActivityCreationOverviewPanelProps) =>
        <ActivityCreationOverviewPanel
          {...navProps}
          stages={[
            { name: 'Select Artwork'.toUpperCase(), completed: selectArtworkCompleted() },
            { name: 'Write Hints'.toUpperCase(), completed: writeHintsCompleted() },
            { name: 'Write Prizes'.toUpperCase(), completed: writePrizesCompleted() },
          ]}
        />
    }
  };

  return (
    <Steps
      config={config}
      genState={stageState}
      setGenState={setStageState}
    >
      <Step
        title='Select Artwork'
        component={SelectArtworkStep}
        activityTitle={activityDefinition.activityTitle}
        artworks={artworks}
      />
      <Step
        title='Write Hints'
        component={WriteHintsStep}
        imageSrc={artworks.find(elem => elem.id === (stageState['artworkId'] as string))?.src ?? ''}
        minHints={activityDefinition.minCluesPerStage}
        maxHints={activityDefinition.maxCluesPerStage}
      />
      <Step
        title='Write Prizes'
        component={WritePrizesStep}
        imageSrc={artworks.find(elem => elem.id === (stageState['artworkId'] as string))?.src ?? ''}
      />
    </Steps>
  )
};

export default CreateStageStep;




/**
 
{displayedState === 'input-basic-information' &&
        <Fader
          show={displayedState === 'input-basic-information'}
          transitionTime={1.25}
          onAnimationCompleted={() => setActiveStageStatus(displayedState)}
        >
          <InputBasicInformation
            key={activeStage || ''}
            initialAuthor={treasureHuntDefinition.treasureHuntAuthor || ''}
            initialTitle={treasureHuntDefinition.treasureHuntTitle || ''}
            onAuthorChange={(author) => setTreasureHuntDefinition(prev => ({ ...prev, treasureHuntAuthor: author }))}
            onTitleChange={(title) => setTreasureHuntDefinition(prev => ({ ...prev, treasureHuntTitle: title }))}
            enabled={isBasicInformationCompleted()}
            onNextClicked={() => {
              setActiveStageStatus('select-artwork');
              setDisplayedState('select-artwork');
              setActiveStage(0);
            }}
          />
        </Fader>
      }

      {activeStageStatus === 'select-artwork' &&
        <Fader
          show={displayedState === 'select-artwork'}
          transitionTime={1.25}
          onAnimationCompleted={() => setActiveStageStatus(displayedState)}
        >
          <SelectArtwork
            key={activeStage || ''}
            titleText={fetchActivityDefinitionStatus.result.data[0].activityTitle}
            imagesData={fetchActivityArtworksStatus.result.data.artworks}
            selectedArtwork={treasureHuntDefinition.stages[activeStage]?.artworkId}
            onArtworkSelected={handleSelectArtwork}
            onNextClicked={() => setDisplayedState('write-hints')}
          />
        </Fader>
      }

      {activeStageStatus === 'write-hints' &&
        <Fader
          show={displayedState === 'write-hints'}
          transitionTime={1.25}
          onAnimationCompleted={() => setActiveStageStatus(displayedState)}
        >
          <WriteHints
            hints={treasureHuntDefinition.stages[activeStage].clues}
            imageSrc={retrieveArtworkById(treasureHuntDefinition.stages[activeStage].artworkId)?.src || ''}
            onAddNewHint={handleAddHint}
            onRemoveHint={handleRemoveHint}
            onUpdateHint={handleUpdateHint}
            onNextClicked={() => setDisplayedState('write-prizes')}
            onBackClicked={() => setDisplayedState('select-artwork')}
            minHints={fetchActivityDefinitionStatus.result.data[0]?.minCluesPerStage || 1}
            maxHints={fetchActivityDefinitionStatus.result.data[0]?.maxCluesPerStage || 10}
          />
        </Fader>
      }


      {activeStageStatus === 'write-prizes' &&
        <Fader
          show={displayedState === 'write-prizes'}
          transitionTime={1.25}
          onAnimationCompleted={() => {
            if (displayedState === 'select-artwork') {
              setActiveStage(prev => prev + 1);
            }
            setActiveStageStatus(displayedState);
          }}
        >
          <WritePrizes
            prizes={treasureHuntDefinition.stages[activeStage]?.multimediaData.map(elem => elem.kind === 'Text' ? elem.text : elem.src) || []}
            imageSrc={retrieveArtworkById(treasureHuntDefinition.stages[activeStage].artworkId!)!.src}
            onAddNewPrize={handleAddPrize}
            onRemovePrize={(ind: number) => handleRemovePrize(ind)}
            onUpdatePrize={handleUpdatePrize}
            onNextClicked={() => {
              setDisplayedState('select-artwork')
            }}
            onBackClicked={() => setDisplayedState('write-hints')}
            canClickNext={activeStage + 1 < treasureHuntDefinition.stages.length}
          />
        </Fader>
      }

      {activeStageStatus === 'record-audio' &&
        <Fader
          show={displayedState === 'record-audio'}
          transitionTime={1.25}
          onAnimationCompleted={() => {
            if (displayedState === 'select-artwork') {
              setActiveStage(prev => prev + 1);
            }
            setActiveStageStatus(displayedState);
          }}
        >
          <RecordAudio
            imageSrc={retrieveArtworkById(treasureHuntDefinition.stages[activeStage].artworkId!)!.src}
            onRecordingReady={() => { }}
            canClickNext={activeStage + 1 < treasureHuntDefinition.stages.length}
            onNextClicked={() => setDisplayedState('select-artwork')}
            onBackClicked={() => setDisplayedState('write-hints')}
          />
        </Fader>
      }
 */
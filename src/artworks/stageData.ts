import { StageData, TreasureHuntMutimediaData } from '../services/commonDefinitions';
//import arachne from './arachne.mp3';
//import vulcano from './vulcano.mp3';

// Ejemplos
const clues0 = ['clue0_0', 'clue0_1', 'clue0_2'];
const multimedia0: TreasureHuntMutimediaData[] = [
  { kind: 'Text', text: 'gift0_0' },
  { kind: 'Text', text: 'gift0_1' },
  { kind: 'Text', text: 'gift0_2' }
];

export const stage0: StageData = {
  artworkId: 'arachne',
  clues: clues0,
  multimediaData: multimedia0,
};

const clues1 = ['clue1_0', 'clue1_1'];
const multimedia1: TreasureHuntMutimediaData[] = [
  { kind: 'Text', text: 'gift1_0' },
  { kind: 'Text', text: 'gift1_1' },
];

export const stage1: StageData = {
  artworkId: 'vulcano',
  clues: clues1,
  multimediaData: multimedia1,
};

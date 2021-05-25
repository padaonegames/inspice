import { StageData } from '../services/commonDefinitions';
import arachne from './arachne.mp3';
import vulcano from './vulcano.mp3';

// Ejemplos
const clues0 = [
  'clue0_0', 'clue0_1', 'clue0_2'
];

export const stage0: StageData = {
  artworkId: 'arachne',
  recordingPath: arachne,
  clues: clues0
};

const clues1 = [
  'clue1_0', 'clue1_1'
];

export const stage1: StageData = {
  artworkId: 'vulcano',
  recordingPath: vulcano,
  clues: clues1
};
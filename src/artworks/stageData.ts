import arachne from './arachne.mp3';
import vulcano from './vulcano.mp3';

export interface StageData {
  artworkId: string; // id del artwork seleccionado
  recordingPath: string; // path de la grabación a emplear
  clues: string[]; // pistas a mostrar al jugador
};

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
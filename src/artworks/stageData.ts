import arachne from './arachne.mp3';
import vulcano from './vulcano.mp3';

export interface StageData {
  artworkId: string; // id del artwork seleccionado
  recordingPath: string; // path de la grabación a emplear
  clues: string[]; // pistas a mostrar al jugador
};

// Ejemplos
const clues0 = [
  'En esta obra se narra un duelo entre personajes mitológicos, incluyendo una diosa muy orgullosa...',
  'La diosa en cuestión no es otra que Atenea, diosa de la sabiduría...',
  'Irritada por no ser capaz de derrotar a Arachne en su duelo, ¡Atenea transformó a su rival en araña!'
];

export const stage0: StageData = {
  artworkId: 'arachne',
  recordingPath: arachne,
  clues: clues0
};

const clues1 = [
  'En esta obra se narra la visita de Apolo, el resplandeciente dios del sol, al taller del herrero de los dioses del Olimpo...',
  'Su objetivo era darle al herrero la humillante noticia de que su mujer, Venus, estaba cometiendo adulterio con el dios guerrero Marte.',
];

export const stage1: StageData = {
  artworkId: 'vulcano',
  recordingPath: vulcano,
  clues: clues1
};
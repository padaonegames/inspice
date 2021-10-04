//------------------------------------------
//         GENERAL DEFINITIONS
//------------------------------------------

export interface ArtworkData {
  src: string; // path de la imagen a usar
  id: string; // id único que identifique a la obra
  title: string; // título de la obra
  author: string; // autor de la obra
  date: string; // año o época en la que se creó
  location: string; // museo y sala donde se encuentra la obra
  info: string; // cualquier otro tipo de info adicional
}

export type ArtworkFieldMapping = Record<keyof ArtworkData, string[]>;

export interface GetArtworkByIdResponse {
  artwork?: ArtworkData;
}
import { ArtworkData } from "../artworks/artworkData";

export type AllowedInputs =
  | 'Text'
  | 'Audio'
  ;

export interface GetArtworkByIdResponse {
  artwork?: ArtworkData;
};
import axios, { AxiosResponse } from 'axios';
import { Artwork } from './viewpointsArtwork.model';

export type ApiResult<T> =
  | { kind: 'ok', data: T }
  | ApiError;

export type ApiError =
  | { kind: 'axios-error', error: Error }
  | { kind: 'http-error', response: Response }
  | { kind: 'parse-error', errors: ParseError }
  | { kind: 'unhandled-error', error: Error }
  ;

export type ParseError =
  | 'InvalidJson'
  ;

/**
 * The Api is responsible for all communication with the Project's Apis and Backends. (Artwork-related)
 * Ideally, we should incorporate a schema validator to all requests to ensure that
 * the data that gets fetched from the endpoints strictly matches the structures defined
 * in the specification (which ought to be included as a JSON schema elsewhere in every 
 * frontend/ backend side).
 */
export class ViewpointsArtworksService {

  /**
   * We will eventually need more than just one apiUrl to distinguish between persistence,
   * recommendation, personalization, user management and so on.
   */
  public constructor(
    private apiUrl: string = 'https://spice.kmi.open.ac.uk/demos/imma_api/main.php',
  ) { }

  public async fetchArtworks(): Promise<ApiResult<Artwork[]>> {
    const artworksPath = '?action=artworklist';
    return getApiResult<Artwork[]>(this.apiUrl + artworksPath);
  };


  public async fetchArtwork(id: string): Promise<ApiResult<Artwork>> {
    const artworksPath = '?action=artworkdetails&id=' + id;
    return getApiResult<Artwork[]>(this.apiUrl + artworksPath)
      .then(elem => elem.kind === 'ok' ? ({ ...elem, data: elem.data[0] }) : elem);
  };

}

// IMMA format
async function getApiResult<T>(url: string): Promise<ApiResult<T>> {
  let response: AxiosResponse<T>;
  try {
    // we attempt to perform a GET request to the specified url and save the
    // corresponding response within the response variable.
    response = await axios.get<T>(url);
  } catch (error: any) {
    if (error.response) {
      // if the error has a response, then this means that server responded
      // with an error status (4xx, 5xx), which leads us to categorize it 
      // as an http error
      return { kind: 'http-error', response: error.response };
    }
    else if (error.request) {
      // if an error were to happen where we have a request but no response, 
      // we can categorize it as an axios error (the request wasn't performed
      // correctly or the server did not respond at all).
      return { kind: 'axios-error', error: error };
    }
    else {
      // in any other case, we categorize this as an unhandled error
      return { kind: 'unhandled-error', error: error };
    }

  }

  if (response.data) {
    console.log(response.data);
    return { kind: 'ok', data: response.data };
  }
  else {
    return { kind: 'parse-error', errors: 'InvalidJson' };
  }
};
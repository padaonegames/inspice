import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResult, getApiResult } from './apiRequestUtils';
import { ArtworkData } from './artwork.model';
import { GetArtworksOptions, retrieveArtworksWithAtLeastAnEmotionInCommon, retrieveAvailableArtworksWithEmotions } from './queries';


/**
 * The Api is responsible for all communication with the Project's Apis and Backends. (Artwork-related)
 * Ideally, we should incorporate a schema validator to all requests to ensure that
 * the data that gets fetched from the endpoints strictly matches the structures defined
 * in the specification (which ought to be included as a JSON schema elsewhere in every 
 * frontend/ backend side).
 */
export class GamArtworksService {

  /**
   * We will eventually need more than just one apiUrl to distinguish between persistence,
   * recommendation, personalization, user management and so on.
   */
  public constructor(
    private apiUrl: string,
  ) { }

  public async fetchUniqueFieldValues(field: 'date' | 'author' | 'info', artworksSubset?: string[]): Promise<ApiResult<{ value: string, count: number }[]>> {
    const url = `${this.apiUrl}/gam-artwork/fields`;

    const opts: AxiosRequestConfig = {
      params: {
        field: field,
        artworksSubset: artworksSubset
      }
    };

    return getApiResult<{ value: string, count: number }[]>(url, opts);
  };

  /**
   * @param relation What sort of relationship you want to query for between our artwork and the rest
   * @param artworkId Artwork for which we want to query similar/ opposite items
   * @returns 
   */
  public async fetchRecommendationsByEmotion(relation: 'opposite' | 'similar', artworkId: string): Promise<ApiResult<ArtworkData[]>> {
    const url = `${this.apiUrl}/gam-artwork/${relation === 'opposite' ? 'opposite-emotions' : 'similar-emotions'}`;

    const opts: AxiosRequestConfig = {
      params: {
        artworkId: artworkId
      }
    };

    return getApiResult<ArtworkData[]>(url, opts);
  };

  public async fetchAvailableArtworksWithEmotions(): Promise<ApiResult<string[]>> {
    const url = 'http://130.192.212.225/fuseki/Test_SPICE_DEGARI_Reasoner/query';
    const opts: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    let params = new URLSearchParams();
    params.append('query', retrieveAvailableArtworksWithEmotions());

    return await getRecommendationsResultRDF(url, opts, params);
  };

  /*
  public async fetchAvailableArtworksWithEmotions(): Promise<ApiResult<string[]>> {
    const url = 'http://130.192.212.225/fuseki/Test_SPICE_DEGARI_Reasoner/query';
    const opts: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    let params = new URLSearchParams();
    params.append('query', retrieveAvailableArtworksWithEmotions());

    return await getRecommendationsResultRDF(url, opts, params);
  };
  */

  public async fetchArtworks(queryOpts: GetArtworksOptions): Promise<ApiResult<{ artworks: ArtworkData[], count: number }>> {

    const url = `${this.apiUrl}/gam-artwork/query`;

    const opts: AxiosRequestConfig = {
      params: {
        pageNumber: queryOpts.pageNumber,
        pageSize: queryOpts.pageSize,
        sortingField: queryOpts.sortingField,
        filter: JSON.stringify(queryOpts.filter)
      }
    };

    return getApiResult<{ artworks: ArtworkData[], count: number }>(url, opts);
  };

  public async fetchArtworksById(artworksSubset: string[]): Promise<ApiResult<ArtworkData[]>> {

    const url = `${this.apiUrl}/gam-artwork/artworks`;

    const opts: AxiosRequestConfig = {
      params: {
        artworksSubset: artworksSubset
      }
    };

    return getApiResult<ArtworkData[]>(url, opts);
  };
}

// IMMA format
async function getRecommendationsResultRDF(url: string, config: AxiosRequestConfig = {}, params: URLSearchParams): Promise<ApiResult<string[]>> {
  let response: AxiosResponse<any>;
  try {
    // we attempt to perform a GET request to the specified url and save the
    // corresponding response within the response variable.
    response = await axios.post<any>(url, params, config);
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

  // Validation
  const data = response.data;

  if (!(data as Object).hasOwnProperty('results') ||
    !(data.results as Object).hasOwnProperty('bindings') ||
    !Array.isArray(data.results.bindings)) {
    return { kind: 'parse-error', errors: 'InvalidJson' };
  }

  let parsedDataAux = (data.results.bindings as any[]).map((elem: any) =>
    elem.id?.value?.slice(elem.id?.value?.lastIndexOf('/') + 'spiceartefact'.length + 1)) as string[];

  const parsedData = parsedDataAux.filter(elem => elem.length);

  if (parsedData) {
    console.log(parsedData);
    return { kind: 'ok', data: parsedData };
  }
  else {
    return { kind: 'parse-error', errors: 'InvalidJson' };
  }
};

// RDF Unique fields
async function getUniqueFieldValuesRDF(url: string, field: 'date' | 'author' | 'info', config: AxiosRequestConfig = {}):
  Promise<ApiResult<{ value: string, count: number }[]>> {
  let response: AxiosResponse<any>;
  try {
    // we attempt to perform a GET request to the specified url and save the
    // corresponding response within the response variable.
    response = await axios.get<any>(url, config);
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

  // Validation
  const data = response.data;

  if (!(data as Object).hasOwnProperty('results') ||
    !(data.results as Object).hasOwnProperty('bindings') ||
    !Array.isArray(data.results.bindings)) {
    return { kind: 'parse-error', errors: 'InvalidJson' };
  }

  const parsedData = (data.results.bindings as any[]).map((elem: any) =>
    ({ value: elem[field].value, count: elem.count?.value })
  ) as { value: string, count: number }[];

  if (parsedData) {
    return { kind: 'ok', data: parsedData };
  }
  else {
    return { kind: 'parse-error', errors: 'InvalidJson' };
  }
};
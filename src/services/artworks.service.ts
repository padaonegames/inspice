import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ArtworkData, ArtworkFieldMapping } from './artwork.model';
import { GetArtworksOptions, retrieveAllArtworksQuery, retrieveArtworksWithAtLeastAnEmotionInCommon, retrieveAvailableArtworksWithEmotions, retrieveDistinctAuthorValuesQuery, retrieveDistinctDateValuesQuery, retrieveDistinctInfoValuesQuery } from './queries';

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

export type MappingMode =
  | { mode: 'JSON', mapping: ArtworkFieldMapping }
  | { mode: 'RDF' }
  ;

/**
 * The Api is responsible for all communication with the Project's Apis and Backends. (Artwork-related)
 * Ideally, we should incorporate a schema validator to all requests to ensure that
 * the data that gets fetched from the endpoints strictly matches the structures defined
 * in the specification (which ought to be included as a JSON schema elsewhere in every 
 * frontend/ backend side).
 */
export class ArtworksService {

  /**
   * We will eventually need more than just one apiUrl to distinguish between persistence,
   * recommendation, personalization, user management and so on.
   */
  public constructor(
    private apiUrl: string,
    private datasetUuid: string,
    private apiKey: string,
    private mapping: ArtworkFieldMapping,
  ) { }

  public async fetchUniqueFieldValues(field: 'date' | 'author' | 'info', artworksSubset?: string[]): Promise<ApiResult<{ value: string, count: number }[]>> {
    const url = `${this.apiUrl}/query/${this.datasetUuid}/sparql`;

    const query =
      field === 'author' ?
        retrieveDistinctAuthorValuesQuery(this.mapping, artworksSubset)
        : field === 'date' ?
          retrieveDistinctDateValuesQuery(this.mapping, artworksSubset)
          : retrieveDistinctInfoValuesQuery(this.mapping, artworksSubset);

    const opts: AxiosRequestConfig = {
      auth: {
        username: this.apiKey,
        password: this.apiKey
      },
      params: {
        query: query
      }
    };

    return getUniqueFieldValuesRDF(url, field, opts);
  };

  public async fetchRecommendationsByEmotion(artworkId: string): Promise<ApiResult<{ artworks: ArtworkData[], count: number }>> {
    const url = 'http://130.192.212.225/fuseki/Test_SPICE_DEGARI_Reasoner/query';
    const opts: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'origin': 'x-requested-with',
        'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
      },
    };
    let params = new URLSearchParams();
    params.append('query', retrieveArtworksWithAtLeastAnEmotionInCommon('spiceartefact' + artworkId));
    const ids = await getRecommendationsResultRDF(url, opts, params);

    if (ids.kind === 'ok') {
      return this.fetchArtworks({
        filter: {
          ids: ids.data
        }
      });
    }
    else {
      return { kind: 'unhandled-error', error: new Error('test') };
    }
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

    const url = `${this.apiUrl}/query/${this.datasetUuid}/sparql`;

    // console.log(retrieveAllArtworksQuery(queryOpts, this.mapping));
    const opts: AxiosRequestConfig = {
      auth: {
        username: this.apiKey,
        password: this.apiKey
      },
      params: {
        query: retrieveAllArtworksQuery(queryOpts, this.mapping)
      }
    };

    return getArtworksResultRDF(url, this.mapping, opts);
  };

}

// IMMA format
async function getArtworksResultRDF(url: string, mapping: ArtworkFieldMapping, config: AxiosRequestConfig = {}): Promise<ApiResult<{ artworks: ArtworkData[], count: number }>> {
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

  console.log(data);

  if (!(data as Object).hasOwnProperty('results') ||
    !(data.results as Object).hasOwnProperty('bindings') ||
    !Array.isArray(data.results.bindings)) {
    return { kind: 'parse-error', errors: 'InvalidJson' };
  }

  const bindings = data.results.bindings as any[];
  const count = bindings.find(elem => Object.keys(elem).includes('count'))['count'].value as number;
  const parsedData = bindings.filter(elem => !Object.keys(elem).includes('count')).map((elem: any) => {
    let artworkInfo: Partial<ArtworkData> = {};

    for (let key in mapping) {
      // TS currently has trouble realising that key is an actual key of the ArtworkFieldMapping
      if (!(elem as Object).hasOwnProperty(key)) {
        console.log(`Invalid key in data: ${key}`);
        return { kind: 'parse-error', errors: 'InvalidJson' };
      }
      artworkInfo[key as keyof ArtworkFieldMapping] = elem[key].value;
    }
    const res = artworkInfo as ArtworkData;
    return { ...res, id: res.id.slice(res.id.lastIndexOf('/') + 1) };
  }) as ArtworkData[];

  if (parsedData) {
    console.log(parsedData);
    return { kind: 'ok', data: { artworks: parsedData, count } };
  }
  else {
    return { kind: 'parse-error', errors: 'InvalidJson' };
  }
};

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
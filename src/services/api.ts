import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ArtworkData, ArtworkFieldMapping, CompletedFindArtworkActivityDefinition, CompletedTreasureHuntDefinition, GetFindArtworkActivityDefinitionByIdResponse, GetTreasureHuntDefinitionByIdResponse, SubmitFindArtworkActivityDefinitionResponse, SubmitTreasureHuntDefinitionResponse } from './commonDefinitions';
import { GetArtworksOptions, retrieveAllArtworksQuery, retrieveArtworksWithAtLeastAnEmotionInCommon, retrieveDistinctAuthorValuesQuery, retrieveDistinctDateValuesQuery, retrieveDistinctInfoValuesQuery } from './queries';

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
 * The Api is responsible for all communication with the Project's Apis and Backends.
 * Ideally, we should incorporate a schema validator to all requests to ensure that
 * the data that gets fetched from the endpoints strictly matches the structures defined
 * in the specification (which ought to be included as a JSON schema elsewhere in every 
 * frontend/ backend side).
 */
export class Api {

  /**
   * We will eventually need more than just one apiUrl to distinguish between persistence,
   * recommendation, personalization, user management and so on.
   */
  public constructor(
    private apiUrl: string,
    private datasetUuid: string,
    private activityDefinitionsDatasetUuid: string,
    private huntDefinitionsDatasetUuid: string,
    private apiKey: string,
    private mappingMode: MappingMode,
  ) { }


  /**
   * Retrieve an artwork by its id
   */
  public async getArtworkById(artworkId: string): Promise<ApiResult<any>> {
    const url = `${this.apiUrl}/browse/${this.datasetUuid}`;

    return getApiResult<any>(url, {
      auth: {
        username: this.apiKey,
        password: this.apiKey
      }
    });
  }

  /**
   * Retrieve an activity by its id
   */
  public async getFindArtworkActivityDefinitionById(activityId: string): Promise<ApiResult<GetFindArtworkActivityDefinitionByIdResponse>> {
    const url = `${this.apiUrl}/object/${this.activityDefinitionsDatasetUuid}`;

    const query = `{ "_id": "${activityId}" }`;

    const opts: AxiosRequestConfig = {
      auth: {
        username: this.apiKey,
        password: this.apiKey
      },
      params: {
        query: query
      }
    };
    return getApiResult<GetFindArtworkActivityDefinitionByIdResponse>(url, opts);
  }

  /**
 * Retrieve a treasure hunt by its id
 */
  public async getTreasureHuntDefinitionById(treasureHuntId: string): Promise<ApiResult<GetTreasureHuntDefinitionByIdResponse>> {
    const url = `${this.apiUrl}/object/${this.huntDefinitionsDatasetUuid}`;

    const query = `{ "_id": "${treasureHuntId}" }`;

    const opts: AxiosRequestConfig = {
      auth: {
        username: this.apiKey,
        password: this.apiKey
      },
      params: {
        query: query
      }
    };
    return getApiResult<GetTreasureHuntDefinitionByIdResponse>(url, opts);
  }

  /**
   * Submit an Activity Definition to the persistence layer
   */
  public async submitFindArtworkActivityDefinition(activityDefinition: CompletedFindArtworkActivityDefinition):
    Promise<ApiResult<SubmitFindArtworkActivityDefinitionResponse>> {
    const url = `${this.apiUrl}/object/${this.activityDefinitionsDatasetUuid}`;

    const opts: AxiosRequestConfig = {
      auth: {
        username: this.apiKey,
        password: this.apiKey
      },
    };

    const apiDefinition: CompletedFindArtworkActivityDefinition = {
      ...activityDefinition,
      huntDefinitionsDatasetUuid: this.huntDefinitionsDatasetUuid,
      activityDefinitionsDatasetUuid: this.activityDefinitionsDatasetUuid,
      artworksDatasetUuid: this.datasetUuid,
    };

    return postApiResult<CompletedFindArtworkActivityDefinition, SubmitFindArtworkActivityDefinitionResponse>
      (url, apiDefinition, opts);
  }

  public async submitTreasureHuntDefinition(treasureHuntDefinition: CompletedTreasureHuntDefinition):
    Promise<ApiResult<SubmitTreasureHuntDefinitionResponse>> {
    const url = `${this.apiUrl}/object/${this.huntDefinitionsDatasetUuid}`;

    const opts: AxiosRequestConfig = {
      auth: {
        username: this.apiKey,
        password: this.apiKey
      },
    };

    const apiDefinition: CompletedTreasureHuntDefinition = {
      ...treasureHuntDefinition
    };

    return postApiResult<CompletedTreasureHuntDefinition, SubmitTreasureHuntDefinitionResponse>
      (url, apiDefinition, opts);
  }

  public async fetchUniqueFieldValues(field: 'date' | 'author' | 'info'): Promise<ApiResult<{ value: string, count: number }[]>> {
    if (this.mappingMode.mode === 'JSON') {
      // testing for now
      let demoPromise = new Promise<ApiResult<{ value: string, count: number }[]>>((resolve, _) => {
        let wait = setTimeout(() => {
          clearTimeout(wait);
          resolve({
            kind: 'ok', data: [
              { value: 'Sample A', count: 27 },
              { value: 'Sample B', count: 15 },
              { value: 'Sample C', count: 37 },
            ]
          });
        }, 200);
      });
      return demoPromise;
    }
    else {
      const url = `${this.apiUrl}/query/${this.datasetUuid}/sparql`;

      const query =
        field === 'author' ?
          retrieveDistinctAuthorValuesQuery()
          : field === 'date' ?
            retrieveDistinctDateValuesQuery()
            : retrieveDistinctInfoValuesQuery();

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
    }
  };

  public async fetchRecommendationsByEmotion(artworkId: string): Promise<ApiResult<ArtworkData[]>> {
    const url = 'http://130.192.212.225/fuseki/Test_SPICE_DEGARI_Reasoner/query';
    const opts: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
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

  public async fetchArtworks(queryOpts: GetArtworksOptions = {}): Promise<ApiResult<ArtworkData[]>> {
    if (this.mappingMode.mode === 'JSON') {
      const url = `${this.apiUrl}/browse/${this.datasetUuid}`;

      const opts: AxiosRequestConfig = {
        auth: {
          username: this.apiKey,
          password: this.apiKey
        },
      };

      return getArtworksResultJSON(url, this.mappingMode.mapping, opts);
    }
    else {
      const url = `${this.apiUrl}/query/${this.datasetUuid}/sparql`;

      const opts: AxiosRequestConfig = {
        auth: {
          username: this.apiKey,
          password: this.apiKey
        },
        params: {
          query: retrieveAllArtworksQuery(queryOpts)
        }
      };

      return getArtworksResultRDF(url, opts);
    }
  };
}

// IMMA format
async function getArtworksResultRDF(url: string, config: AxiosRequestConfig = {}): Promise<ApiResult<ArtworkData[]>> {
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

  const parsedData = (data.results.bindings as any[]).map((elem: any) => {
    let artworkInfo: Partial<ArtworkData> = {};
    for (let key of Object.keys(elem)) {
      artworkInfo[key as keyof ArtworkData] = elem[key].value;
    }
    const res = artworkInfo as ArtworkData;
    return { ...res, id: res.id.slice(res.id.lastIndexOf('/') + 1) };
  }) as ArtworkData[];

  if (parsedData) {
    console.log(parsedData);
    return { kind: 'ok', data: parsedData };
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
  console.log(data);

  if (!(data as Object).hasOwnProperty('results') ||
    !(data.results as Object).hasOwnProperty('bindings') ||
    !Array.isArray(data.results.bindings)) {
    return { kind: 'parse-error', errors: 'InvalidJson' };
  }

  const parsedData = (data.results.bindings as any[]).map((elem: any) =>
    elem.id?.value?.slice(elem.id?.value?.lastIndexOf('/') + 'spiceartefact'.length + 1)) as string[];

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

// GAM format
async function getArtworksResultJSON(url: string, mapping: ArtworkFieldMapping, config: AxiosRequestConfig = {}): Promise<ApiResult<ArtworkData[]>> {
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

  if (!(data as Object).hasOwnProperty('results') || !Array.isArray(data.results)) {
    return { kind: 'parse-error', errors: 'InvalidJson' };
  }

  // data has results field, this should be a list of artworks adhering to mapping
  const results = data.results as any[];
  let parsedResults: ArtworkData[] = [];

  for (let elem of results) {
    let artworkInfo: Partial<ArtworkData> = {};
    // for each potential artwork, we iterate over its fields to check if it has all the mapped
    // properties. For instance, if a mapping says that 'title' maps to 'Titolo', we check whether
    // the field 'Titolo' actually exists in elem, and if that's the case, we add its value to 
    // the artworkInfo auxiliary object under the standard field name.
    for (let key in mapping) {
      // TS currently has trouble realising that key is an actual key of the ArtworkFieldMapping
      if (!(elem as Object).hasOwnProperty(mapping[key as keyof ArtworkFieldMapping])) {
        return { kind: 'parse-error', errors: 'InvalidJson' };
      }
      artworkInfo[key as keyof ArtworkFieldMapping] = elem[mapping[key as keyof ArtworkFieldMapping]];
    }
    const parsedElem = artworkInfo as ArtworkData;
    if (parsedElem) {
      parsedResults.push(parsedElem);
    }
    else {
      return { kind: 'parse-error', errors: 'InvalidJson' };
    }
  }

  return { kind: 'ok', data: parsedResults };
};


/**
 * Run the given request and (TODO) parse the response according to a given schema
 */
async function getApiResult<T>(url: string, config: AxiosRequestConfig = {}): Promise<ApiResult<T>> {
  let response: AxiosResponse<T>;
  try {
    // we attempt to perform a GET request to the specified url and save the
    // corresponding response within the response variable.
    response = await axios.get<T>(url, config);
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

  // TODO: we should validate the data object here against our schema
  // As it is now, this is an unsafe type coercion
  return { kind: 'ok', data: (response.data as T) };
}


/**
 * Run the given request and (TODO) parse the response according to a given schema.
 * T refers to data type for the payload, whereas R refers to expected response type
 */
async function postApiResult<T, R>(url: string, payload: T, config: AxiosRequestConfig = {}): Promise<ApiResult<R>> {
  let response: R;
  try {
    // we attempt to perform a GET request to the specified url and save the
    // corresponding response within the response variable.
    response = await axios.post<T, R>(url, payload, config);
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

  // TODO: we should validate the data object here against our schema
  // As it is now, this is an unsafe type coercion
  return { kind: 'ok', data: response };
}

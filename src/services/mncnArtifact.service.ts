import { ApiResult, getApiResult } from './apiRequestUtils';
import { MncnArtifact } from './mncnArtifact.model';

/**
 * The Api is responsible for all communication with the Project's Apis and Backends. (Artwork-related)
 * Ideally, we should incorporate a schema validator to all requests to ensure that
 * the data that gets fetched from the endpoints strictly matches the structures defined
 * in the specification (which ought to be included as a JSON schema elsewhere in every 
 * frontend/ backend side).
 */
export class MncnArtifactService {

  /**
   * We will eventually need more than just one apiUrl to distinguish between persistence,
   * recommendation, personalization, user management and so on.
   */
  public constructor(
    private apiUrl: string,
  ) { }

  public async fetchArtifacts(): Promise<ApiResult<MncnArtifact[]>> {
    const url = `${this.apiUrl}/mncn-collection/artifacts`;
    return getApiResult<MncnArtifact[]>(url);
  };

  public async fetchArtifactById(artifactId: string): Promise<ApiResult<MncnArtifact[]>> {
    const url = `${this.apiUrl}/mncn-collection/artifacts/${artifactId}`;
    return getApiResult<MncnArtifact[]>(url);
  };
}
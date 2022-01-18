//------------------------------------------
//         GENERAL DEFINITIONS
//------------------------------------------
export interface ActivityInstance {
  /**
   * Where is this activity being stored?
   */
  activityDefinitionsDatasetUuid: string;
  activityTitle: string;
  activityAuthor: string;
  beginsOn: Date;
  endsOn: Date;
  _id: string;
  description?: string;
  imageSrc?: string;
}
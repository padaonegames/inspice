//------------------------------------------
//         GENERAL DEFINITIONS
//------------------------------------------
export interface MncnArtifact {
  /** Title of the artifact. */
  title: string;
  /** Description of the artifact. */
  description: string;
  /** Tags to categorize the artifact. Used to help with searching and filters. */
  tags?: string[];
  /** Image of the artifact. */
  image: string;
  /** Unique identifier of the artifact on the persistence layer. */
  _id: string;
}
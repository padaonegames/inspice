import { useState } from "react";

export interface ActivitySource {
  /**
   * UUID from Linked Data Hub where activities from this source are stored.
   */
  activityDefinitionsDatasetUuid: string;

}

export const TemplateDashboard = (): JSX.Element => {

  const [sources, setSources] = useState<ActivitySource[]>([]);
  return <></>;

};
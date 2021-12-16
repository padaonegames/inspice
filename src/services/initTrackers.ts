import { newTracker } from "@snowplow/browser-tracker";

export const initTracker = (trackerName: string, collectorUrl: string, appId: string) => {
  newTracker(trackerName, collectorUrl, {
    appId: appId,
    plugins: [],
    encodeBase64: false,
  });
};
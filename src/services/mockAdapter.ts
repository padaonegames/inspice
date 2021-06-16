import axios, { AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { sampleActivities } from '../activities/activitiesData';
import { sampleArtworks } from '../artworks/artworkData';
import { CompletedFindArtworkActivityDefinition, FindArtworkActivityDefinition, SubmitFindArtworkActivityDefinitionResponse } from './commonDefinitions';

export const initMockAdapter = () => {
  // this sets a new mock adapter over the default instance provided by axios
  // we add a 2 second delay to all requests using this axios instance in an attempt
  // to replicate the delay of a real server.
  let mock = new MockAdapter(axios, { delayResponse: 2000 });

  const artworksUrl = 'fakeApi/artwork';
  mock.onGet(new RegExp(`${artworksUrl}/*`)).reply((config: AxiosRequestConfig) => {
    const artworkId = config.url?.slice(artworksUrl.length + 1);
    console.log(artworkId);
    const res = sampleArtworks.find(elem => elem.id === artworkId);
    return res ? [200, { artwork: res }] : [400];
  });

  const activitiesUrl = 'fakeApi/activity';
  mock.onGet(new RegExp(`${activitiesUrl}/*`)).reply((config: AxiosRequestConfig) => {
    const activityId = config.url?.slice(activitiesUrl.length + 1);
    console.log(activityId);
    const res = sampleActivities.find(elem => elem._id === activityId);
    return res ? [200, { activity: res }] : [400];
  });

  const findArtworkActivityDefinitionUrl = 'fakeApi/findArtwork';
  mock.onPost(new RegExp(`${findArtworkActivityDefinitionUrl}*`))
  .reply((config: AxiosRequestConfig) => {
    const res = JSON.parse(config.data) as CompletedFindArtworkActivityDefinition;
    const actDef: FindArtworkActivityDefinition = { ...res, _id: '123'};
    const response: SubmitFindArtworkActivityDefinitionResponse = actDef;
    return [201, response];
  });
}
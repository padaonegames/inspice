import axios, { AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { sampleArtworks } from '../artworks/artworkData';

export const initMockAdapter = () => {
  // this sets a new mock adapter over the default instance provided by axios
  // we add a 2 second delay to all requests using this axios instance in an attempt
  // to replicate the delay of a real server.
  let mock = new MockAdapter(axios, { delayResponse: 2000 });

  const artworksUrl = new RegExp(`artworksApi/artwork/*`);
  mock.onGet(artworksUrl).reply((config: AxiosRequestConfig) => {
    const urlSplit = config.url?.split('/') || [];
    console.log(urlSplit[urlSplit?.length - 1]);
    const res = sampleArtworks.find(elem => elem.id === urlSplit[urlSplit?.length - 1]);
    return res ? [200, { artowork: res }] : [400];
  });
}
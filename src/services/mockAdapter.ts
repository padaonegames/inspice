import axios, { AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { sampleArtworks } from '../artworks/artworkData';

export const initMockAdapter = () => {
  // this sets a new mock adapter over the default instance provided by axios
  // we add a 2 second delay to all requests using this axios instance in an attempt
  // to replicate the delay of a real server.
  let mock = new MockAdapter(axios, { delayResponse: 2000 });

  const artworksUrl = 'artworksApi/artwork/';
  mock.onGet(new RegExp(`${artworksUrl}*`)).reply((config: AxiosRequestConfig) => {
    const artworkId = config.url?.slice(artworksUrl.length);
    console.log(artworkId);
    const res = sampleArtworks.find(elem => elem.id === artworkId);
    return res ? [200, { artwork: res }] : [400];
  });
}
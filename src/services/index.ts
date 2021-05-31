import { Api } from "./api";

export let api: Api;

export const initializeServices = () => {
  api = new Api('fakeApi');
};
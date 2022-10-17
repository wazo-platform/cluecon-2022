//import { ApiRequester } from '@wazo/sdk';
//import getApiClient from '@wazo/sdk/lib/service/getApiClient';

import { host } from './constants';

export const playNotification = () => {
  const audio = new Audio('/src/assets/sharp.wav');
  audio.play();
};

//export const getWazoClient = () => {
//  const client = getApiClient(host);
//  client.setClientId('hackaton-2022-group-chat');

//  // @todo refresh token mecanism
//  return client;
//};

//export const getWazoRequester = () => new ApiRequester({
//  server: host,
//  clientId: 'hackaton-2022-group-chat',
//  token: localStorage.getItem('token'),
//});

export const ascSort = (field) => (a, b) => {
  if (a?.[field] < b?.[field]) {
    return -1;
  }
  if (a?.[field] > b?.[field]) {
    return 1;
  }
  return 0;
};

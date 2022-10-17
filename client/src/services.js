//import { ApiRequester } from '@wazo/sdk';
//import getApiClient from '@wazo/sdk/lib/service/getApiClient';

import { host } from './constants';

export const playNotification = () => {
  const audio = new Audio('/assets/sharp.wav');
  audio.play();
};

export const ascSort = (field) => (a, b) => {
  if (a?.[field] < b?.[field]) {
    return -1;
  }
  if (a?.[field] > b?.[field]) {
    return 1;
  }
  return 0;
};

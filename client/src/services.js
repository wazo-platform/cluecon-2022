import { v4 as uuidv4 } from 'uuid';
import { host } from './constants';

export const getToken = async (fullname) => {
  let chatTokenPayload = {
    "ttl": 2000,
    "channels": {
      "channel-a": {
        "read": true,
        "write": true
      },
      "channel-b": {
        "read": true,
        "write": true
      }
    },
    "member_id": uuidv4(),
    "state": {
      "display_name": fullname,
    }
  };

  let config = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(chatTokenPayload),
  };

  const url = `http://${window.location.host}/api/chat/tokens`;
  const data = await fetch(url, config);
  return await data.json();
}

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

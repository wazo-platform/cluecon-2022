import { v4 as uuidv4 } from 'uuid';
import { host } from './constants';

export const getToken = async (fullname, rooms) => {
  const acl = {
    "read": true,
    "write": true
  }
  let chatTokenPayload = {
    "ttl": 2000,
    "channels": {},
    "member_id": uuidv4(),
    "state": {
      "display_name": fullname,
    }
  };

  for (const room of rooms) {
    chatTokenPayload['channels'][room] = acl;
  }

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

export const getChannels = async () => {
  let config = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'Accept': 'application/json'
    }
  };

  const url = `http://${window.location.host}/api/chat/channels`;
  const data = await fetch(url, config);
  return await data.json();
}

export const listAllowedChannels = async (client) => {
  let myRooms = [];
  const channels = await client.getAllowedChannels();
  for (let [key, value] of Object.entries(channels)) {
    myRooms.push({name: key});
    await client.subscribe([key]);
  }

  return myRooms;
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

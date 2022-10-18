import { createSignal, Show } from 'solid-js';
import { createStore } from "solid-js/store";
import { Chat } from '@signalwire/js'

import { getToken, listAllowedChannels } from "./services.js";

import Lobby from "./Lobby";
import Rooms from "./Rooms";

let client;

function App() {
  const [formState, setFormState] = createStore({
    fullname: "",
    room: ""
  });
  const [token, setToken] = createSignal(null);

  const userLogged = async (e) => {
    client = new Chat.Client({
      token: token()
    });

    client.on('session.expiring', async () => {
      const rooms = await listAllowedChannels(client);
      const newToken = await getToken(formState().fullname, rooms);
      await client.updateToken(newToken.token)
    });
  };

  return (
    <Show when={token() === null} fallback={
      <Rooms token={token}/>
    }>
      <Lobby
        formState={formState}
        setFormState={setFormState}
        token={token}
        setToken={setToken}
        handleFormSubmit={userLogged}
      />
    </Show>
  );
}

export default App;

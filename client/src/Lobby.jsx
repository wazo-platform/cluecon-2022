import { createSignal, onMount } from 'solid-js';
import { getToken, getChannels, addChannel } from './services.js';


export default function Lobby(props) {
  const [channels, setChannels] = createSignal(null);
  
  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    props.setFormState(() => ({
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fullname = event.currentTarget[0].value;
    const channels = event.target[1];
    const room = event.currentTarget[2].value;

    const chans = [];
    if (room) {
      await addChannel(room);
      chans.push(room);
    }

    for (const channel of channels) {
      if (channel.selected) {
        chans.push(channel.value);
      }
    }

    const res = await getToken(fullname, chans);
    await props.setToken(res.token);
    props.handleFormSubmit();
  };

  onMount(async () => {
    const channelsFromServer = await getChannels();
    setChannels(channelsFromServer);
  });

  return(
    <form onSubmit={handleSubmit} action="POST">
      <label>
        Username
        <input
          type="text"
          placeholder="Username"
          onChange={(evt) => handleChange(evt)}
          name="fullname"
          id="fullname"
          required
        />
      </label>
      <label>
        Rooms Name
        <select
          placeholder="Rooms Name"
          onChange={(evt) => handleChange(evt)}
          name="rooms"
          id="rooms"
          multiple
        >
          <For each={channels()} fallback={<div>Empty Chat...</div>}>
            {(channel) => (
              <option value={channel}>{channel}</option>
            )}
          </For>
        </select>
      </label>
      Or create room
      <label>
        Room Name
        <input
          type="text"
          placeholder="Room Name"
          onChange={(evt) => handleChange(evt)}
          name="room"
          id="room"
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

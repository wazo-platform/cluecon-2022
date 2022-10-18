import { v4 as uuidv4 } from 'uuid';

export default function Lobby(props) {
  
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
    const rommName = event.currentTarget[1].value;

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
    const res = await data.json();
    await props.setToken(res.token);
    props.handleFormSubmit();
  };

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
          Room Name 
          <input 
            type="text" 
            placeholder="Room Name"
            onChange={(evt) => handleChange(evt)} 
            name="room" 
            id="room" 
            required
          />
        </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

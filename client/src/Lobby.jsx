import { getToken } from './services.js';


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

    const res = await getToken(fullname);
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

import {
  createSignal, For, onMount, onCleanup,
} from 'solid-js';

let refModal;
let refName;
let refUsers;
export default (props) => {
  const client = ""; // FIX CLIENT
  const [users, setUsers] = createSignal([]);

  const handleModalClose = () => {
    props.handleFormSubmit();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const selectedUsers = [{ uuid: localStorage.getItem('currentUserUuid') }];
    for (let i = 0; i < refUsers.options; i++) {
      const option = refUsers.options[i];
      if (option.selected && Boolean(option.value) && option.value !== localStorage.getItem('currentUserUuid')) {
        selectedUsers.push({ uuid: option.value });
      }
    }

    client.chatd.createRoom(refName.value, selectedUsers);
    refModal.close();
  };

  onMount(() => {
    refModal.showModal();

    client.dird.fetchWazoSource('default').then(async (response) => {
      const defaultSource = response?.items?.[0];
      if (defaultSource) {
        // @todo no pagination (but it's an hackaton)
        const responseContacts = await client.dird.fetchWazoContacts(defaultSource, {
          order: 'firstname',
        });
        setUsers(responseContacts);
      }
    });

    refModal.addEventListener('close', handleModalClose);
  });

  onCleanup(() => {
    refModal.removeEventListener('close', handleModalClose);
  });

  return (
    <dialog id="create-room-modal" ref={refModal}>
      <form onSubmit={handleFormSubmit}>
        <p>
          <label>Room Name</label>
          <input type="text" name="name" required ref={refName} />
        </p>

        <p>
          <label>Users</label>
          <select name="users" required multiple ref={refUsers}>
            <option value="" disabled selected hidden>
              Choose users
            </option>
            <For each={users()}>
              {(user) => (
                <option value={user.uuid} disabled={user.uuid === localStorage.getItem('currentUserUuid')}>
                  {user.name}
                </option>
              )}
            </For>
          </select>
        </p>

        <button type="submit">Create</button>
      </form>
    </dialog>
  );
};

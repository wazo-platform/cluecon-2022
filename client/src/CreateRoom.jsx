import {
  For, onMount, onCleanup,
} from 'solid-js';
import { addChannel } from './services.js';

let refModal;
let refName;
let refUsers;
export default (props) => {

  const handleModalClose = () => {
    props.handleFormSubmit();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    addChannel(refName.value);
    refModal.close();
  };

  onMount(() => {
    refModal.showModal();
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
        <button type="submit">Create</button>
      </form>
    </dialog>
  );
};

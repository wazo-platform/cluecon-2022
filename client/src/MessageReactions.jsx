import { createMemo, For } from 'solid-js';
import styles from './MessageReactions.module.scss';

export default (props) => {
  const currentUserUuid = localStorage.getItem('currentUserUuid');
  const combinedReactions = createMemo(() => props?.reactions?.reduce(
    (acc, { emoji, user_uuid }) => ({
      ...acc,
      [emoji]: {
        count: (acc?.[emoji]?.count || 0) + 1,
        selected: acc?.[emoji]?.selected || currentUserUuid === user_uuid,
      },
    }),
    {},
  ));

  return (
    <p class={styles.roomMessageReaction}>
      <For each={Object.keys(combinedReactions())}>
        {(emoji) => (
          <span
            data-count={combinedReactions()[emoji].count}
            class="message-reaction"
            classList={{ selected: combinedReactions()[emoji].selected }}
          >
            {emoji}
          </span>
        )}
      </For>
    </p>
  );
};

import React, { useContext } from 'react';

import { NoteContext } from 'utils/providers/notes';
import { BaseBubbleNote, Placement } from './style';

const BubbleNotes = () => {
  const { isActive, setActive } = useContext(NoteContext);

  return (
    <Placement>
      <BaseBubbleNote
        onClick={() => {
          setActive(!isActive);
        }}
        isActive={isActive}
      >
        + New note
      </BaseBubbleNote>
    </Placement>
  );
};

export default BubbleNotes;

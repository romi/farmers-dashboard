import React, { useContext } from 'react';

import { NoteContext } from 'utils/providers/notes';
import { BubbleNote, Placement } from './style';

const Notes = () => {
  const { isActive, setActive } = useContext(NoteContext);

  return (
    <Placement>
      <BubbleNote
        onClick={() => {
          setActive(!isActive);
        }}
        isActive={isActive}
      >
        + New note
      </BubbleNote>
    </Placement>
  );
};

export default Notes;

import React, { useContext } from 'react';

import { BubbleNote, Placement } from './style';
import { NoteContext } from '../../utils/providers/notes';

const Notes = () => {
  const { isActive, setActive } = useContext(NoteContext);

  return (
    <Placement>
      <BubbleNote onClick={() => setActive(!isActive)} isActive={isActive}>
        + New note
      </BubbleNote>
    </Placement>
  );
};

export default Notes;

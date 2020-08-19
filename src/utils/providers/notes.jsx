import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const NoteContext = createContext({
  isActive: false,
  setActive: () => {},
});

const NoteProvider = ({ children }) => {
  const [isActive, setActive] = useState(false);

  return <NoteContext.Provider value={{ isActive, setActive }}>{children}</NoteContext.Provider>;
};

NoteProvider.propTypes = {
  children: PropTypes.node,
};

NoteProvider.defaultProps = {
  children: <div />,
};

export default NoteProvider;

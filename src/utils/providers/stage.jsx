import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const StageContext = createContext({
  plantId: '0',
  setPlantId: () => {},
});

const StageProvider = ({ children }) => {
  const [plantId, setPlantId] = useState('0');

  return <StageContext.Provider value={{ plantId, setPlantId }}>{children}</StageContext.Provider>;
};

StageProvider.propTypes = {
  children: PropTypes.node,
};

StageProvider.defaultProps = {
  children: <div />,
};

export default StageProvider;

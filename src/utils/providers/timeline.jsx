import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const TimelineContext = createContext({
  picView: '',
  setPicView: () => {},
});

const TimelineProvider = ({ children }) => {
  const [picView, setPicView] = useState('');

  return <TimelineContext.Provider value={{ picView, setPicView }}>{children}</TimelineContext.Provider>;
};

TimelineProvider.propTypes = {
  children: PropTypes.node,
};

TimelineProvider.defaultProps = {
  children: <div />,
};

export default TimelineProvider;

import React from 'react';
import useBreakpoint from './hooks/breakpoint';
import { BREAKPOINT } from './constants';

export const theme = {
  light: '#FAFBED',
  dark: '#282828',
  lightGrey: '#d3d3d3',
  darkGrey: '#696969',
  primary: '#00A960',
  accent: '#6FE8AE',
  secondary: '#FF8400',
};

export const withTheme = Component => props => {
  const breakpoint = useBreakpoint(BREAKPOINT);

  return <Component theme={theme} breakpoint={breakpoint} {...props} />;
};

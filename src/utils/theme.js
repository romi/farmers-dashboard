import React from 'react';

export const theme = {
  light: '#FAFBED',
  dark: '#282828',
  primary: '#00A960',
  accent: '#6FE8AE',
  secondary: '#FF8400',
};

// eslint-disable-next-line react/jsx-props-no-spreading
export const withTheme = (Component) => (props) => <Component theme={theme} {...props} />;

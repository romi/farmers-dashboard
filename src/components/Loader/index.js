import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { theme } from 'utils/theme';
import { Center } from 'components/PictureView/style';

const Loading = ({ size }) => (
  <Center>
    <Loader type="Oval" color={theme.primary} height={size} width={size} />
  </Center>
);

Loading.propTypes = {
  size: PropTypes.number,
};

Loading.defaultProps = {
  size: 80,
};

export default Loading;

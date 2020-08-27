import React from 'react';
import Loader from 'react-loader-spinner';
import { theme } from 'utils/theme';
import { Center } from 'components/PictureView/style';

const Loading = () => (
  <Center>
    <Loader type="Oval" color={theme.primary} height={80} width={80} />
  </Center>
);

export default Loading;

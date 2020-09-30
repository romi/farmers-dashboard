import React from 'react';
import PropTypes from 'prop-types';

import { Container, Title, Underline } from './style';

const TitleComponent = ({ title }) => (
  <Container>
    <Title>{title}</Title>
    <Underline />
  </Container>
);

TitleComponent.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TitleComponent;

import React from 'react';
import PropTypes from 'prop-types';

import { Container, Card, Text, Alert } from './style';
import Navbar from '../Navbar';

const ErrorComponent = ({ error }) => (
  <div className="Layout">
    <Navbar />
    <Container>
      <Card>
        <img alt="error icon" src="/error-icon.gif" />
        <Alert>Error</Alert>
        <Text>{error}</Text>
      </Card>
    </Container>
  </div>
);

ErrorComponent.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorComponent;

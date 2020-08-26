import React from 'react';
import PropTypes from 'prop-types';

import Navbar from 'components/Navbar';
import { Container, Card, Text, Alert } from './style';

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

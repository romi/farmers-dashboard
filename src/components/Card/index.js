import React from 'react';
import PropTypes from 'prop-types';
import Container, { Content } from './style';
import TitleComponent from '../Title';

const Card = ({ title, children, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Container {...props}>
    {title !== '' && <TitleComponent title={title} />}
    <Content>{children}</Content>
  </Container>
);
Card.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Card;

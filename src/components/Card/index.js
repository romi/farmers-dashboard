import React from 'react';
import PropTypes from 'prop-types';
import TitleComponent from 'components/Title';
import Container, { Content } from './style';

const Card = ({ title, children, ...props }) => (
  <Container {...props}>
    {title !== '' && <TitleComponent title={title} />}
    <Content>{children}</Content>
  </Container>
);

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

Card.defaultProps = {
  title: '',
  children: <div />,
};

export default Card;

import React from 'react';
import PropTypes from 'prop-types';
import TitleComponent from 'components/Title';
import Container, { Content } from './style';

const Card = ({ title, tooltip, children, ...props }) => (
  <Container {...props}>
    {title !== '' && <TitleComponent title={title} tooltip={tooltip} />}
    <Content>{children}</Content>
  </Container>
);

Card.propTypes = {
  title: PropTypes.string,
  tooltip: PropTypes.string,
  children: PropTypes.node,
  border: PropTypes.bool,
};

Card.defaultProps = {
  title: '',
  tooltip: '',
  children: <div />,
  border: false,
};

export default Card;

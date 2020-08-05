import React from 'react';
import PropTypes from 'prop-types';

import Title from '../../components/Title';
import { Container, PlotContainer, PlotItem, ItemTitle } from './style';

const Plot = ({ match }) => {
  return (
    <Container>
      <PlotContainer>
        <Title title={match.params.id} />
        <PlotItem>
          <ItemTitle>Planche n°1</ItemTitle>
        </PlotItem>
        <PlotItem>
          <ItemTitle>Planche n°2</ItemTitle>
        </PlotItem>
        <PlotItem>
          <ItemTitle>Planche n°3</ItemTitle>
        </PlotItem>
      </PlotContainer>
    </Container>
  );
};

Plot.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Plot;

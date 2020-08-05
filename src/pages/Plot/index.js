import React from 'react';
import PropTypes from 'prop-types';

import Title from '../../components/Title';
import { Container, BoardContainer, BoardItem, ItemTitle } from './style';

const Plot = ({ match }) => {
  return (
    <Container>
      <BoardContainer>
        <Title title={match.params.id} />
        <BoardItem>
          <ItemTitle>Planche n°1</ItemTitle>
        </BoardItem>
        <BoardItem>
          <ItemTitle>Planche n°2</ItemTitle>
        </BoardItem>
        <BoardItem>
          <ItemTitle>Planche n°3</ItemTitle>
        </BoardItem>
      </BoardContainer>
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

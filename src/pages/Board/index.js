import React from 'react';
import PropTypes from 'prop-types';

const Board = ({ match }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
      }}
    >
      <p>Board id: {match.params.id}</p>
    </div>
  );
};
Board.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Board;

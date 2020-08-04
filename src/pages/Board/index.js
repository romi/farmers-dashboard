import React from 'react';

const Board = ({ match }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center'
      }}>
      <p>Board id: {match.params.id}</p>
    </div>
  );
};

export default Board;

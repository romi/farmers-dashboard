import React from 'react';

const Plot = ({ match }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
      }}
    >
      <p>Plot id: {match.params.id}</p>
    </div>
  );
};

export default Plot;

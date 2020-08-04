import React from 'react';

const Plant = ({ match }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center'
      }}>
      <p>Plant id: {match.params.id}</p>
    </div>
  );
};

export default Plant;

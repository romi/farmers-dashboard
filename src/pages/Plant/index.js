import React from 'react';
import PropTypes from 'prop-types';

const Plant = ({ match }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
      }}
    >
      <p>Plant id: {match.params.id}</p>
    </div>
  );
};
Plant.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Plant;

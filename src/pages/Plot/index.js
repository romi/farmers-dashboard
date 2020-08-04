import React from 'react';
import PropTypes from 'prop-types';

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
Plot.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Plot;

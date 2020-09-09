import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { TimelineContext } from 'utils/providers/timeline';
import Card from 'components/Card';
import { Centered } from './style';

const Timeline = ({ scans }) => {
  const { setPicView } = useContext(TimelineContext);

  const formatDate = date => new Date(date).toISOString().split('T')[0].split('-').reverse().join('/');

  return scans.map(({ id, date }) => (
    <Card
      key={id}
      border
      onClick={() => {
        setPicView(id);
      }}
    >
      <Centered>
        <span>{formatDate(date)}</span>
      </Centered>
    </Card>
  ));
};

Timeline.propTypes = {
  scans: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, date: PropTypes.string })).isRequired,
};

export default Timeline;

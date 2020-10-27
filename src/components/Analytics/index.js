import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AnalyticsGraph } from './components/AnalyticsGraph';
import { Container, Extend, Select } from './style';

const selectMode = {
  Day: 1,
  Week: 7,
  Month: 30,
  Trimester: 90,
  Semester: 180,
  Year: 365,
};

const selectBeforeMode = {
  Day: 0,
  Week: 5,
  Month: 21,
  Trimester: 0,
  Semester: 0,
  Year: 0,
};

const reajust = num => (num * 24 * 60) / 15;

const Analytics = ({ config }) => {
  const [select, setSelect] = useState('Day');
  return (
    <Container>
      <AnalyticsGraph before={reajust(selectBeforeMode[select])} range={reajust(selectMode[select])} config={config} />
    </Container>
  );
};

Analytics.propTypes = {
  config: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      apiId: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Analytics;

import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { TimelineContext } from 'utils/providers/timeline';
import { MONTHS } from 'utils/constants';
import { Centered, SquareCardContainer, SquareCard, MonthSpan } from './style';

const Timeline = ({ scans }) => {
  const [dates, setDates] = useState([]);
  const { setPicView } = useContext(TimelineContext);

  const formatDate = date => new Date(date).toISOString().split('T')[0].split('-').reverse()[0];

  useEffect(() => {
    const months = Array.from(new Set([...scans.map(({ date }) => new Date(date).getMonth())]));

    setDates(
      months.map(month => ({
        month,
        values: scans.filter(({ date }) => new Date(date).getMonth() === month),
      })),
    );
  }, []);

  return dates.map(({ month, values }) => (
    <>
      <Centered>
        <MonthSpan key={month}>{MONTHS[month]}</MonthSpan>
      </Centered>
      <SquareCardContainer>
        {values.map(value => (
          <SquareCard
            key={value.id + value.date}
            border
            onClick={() => {
              setPicView(value.id);
            }}
          >
            <Centered>{formatDate(value.date)}</Centered>
          </SquareCard>
        ))}
      </SquareCardContainer>
    </>
  ));
};

Timeline.propTypes = {
  scans: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, date: PropTypes.string })).isRequired,
};

export default Timeline;

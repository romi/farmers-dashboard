import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { TimelineContext } from 'utils/providers/timeline';
import { MONTHS } from 'utils/constants';
import { Centered, SquareCardContainer, SquareCard, MonthSpan } from './style';

const Timeline = ({ scans }) => {
  const [dates, setDates] = useState([]);
  const { picView, setPicView } = useContext(TimelineContext);

  const formatDate = date => new Date(date).toISOString().split('T')[0].split('-').reverse()[0];

  useEffect(() => {
    const months = Array.from(new Set([...scans.map(({ date }) => new Date(date).getMonth())]));

    if (picView.length === 0) setPicView(scans[0].id);
    setDates(
      months.map(month => ({
        month,
        values: scans.filter(({ date }) => new Date(date).getMonth() === month),
      })),
    );
    // eslint-disable-next-line
  }, []);

  return dates.map(({ month, values }) => (
    <div key={month}>
      <Centered>
        <MonthSpan>{MONTHS[month]}</MonthSpan>
      </Centered>
      <SquareCardContainer>
        {values.map(value => (
          <SquareCard
            key={value.id + value.date}
            selected={picView === value.id}
            onClick={() => {
              setPicView(value.id);
            }}
          >
            <Centered>{formatDate(value.date)}</Centered>
          </SquareCard>
        ))}
      </SquareCardContainer>
    </div>
  ));
};

Timeline.propTypes = {
  scans: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, date: PropTypes.string })).isRequired,
};

export default Timeline;

import React, { useEffect, useRef, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';

import { TimelineContext } from 'utils/providers/timeline';
import { NoteContext } from 'utils/providers/notes';
import { FullLine } from './style';
import options from './config';

const Timeline = ({ scans }) => {
  const chartRef = useRef();
  let chart = useRef();
  const { isActive } = useContext(NoteContext);
  const { setPicView } = useContext(TimelineContext);

  const data = {
    datasets: [
      {
        fill: false,
        backgroundColor: 'transparent',
        pointRadius: 8,
        pointHoverRadius: 8,
        pointBorderWidth: 1,
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 3,
        pointBackgroundColor: scans.map(() => '#00A960'),
        pointBorderColor: [],
        data: scans.map(({ id, date }) => ({ y: 1, x: date.split('T')[0], id })),
      },
    ],
  };

  const clicked = useCallback((_, i) => {
    const index = i[0]?._index;
    if (typeof index !== 'number' || !chart) return;
    setPicView(chart.data.datasets[0].data[index].id);
  });

  useEffect(() => {
    chart = new Chart(chartRef.current.getContext('2d'), {
      type: 'line',
      data,
      options: {
        onClick: clicked,
        ...options,
      },
    });

    return () => {
      try {
        chart.destroy();
      } catch (e) {
        console.error(e);
      }
    };
  }, [isActive]);

  return (
    <FullLine>
      <canvas id="myChart" ref={chartRef} />
    </FullLine>
  );
};

Timeline.propTypes = {
  scans: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, date: PropTypes.string })).isRequired,
};

export default Timeline;

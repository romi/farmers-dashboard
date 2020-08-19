import React, { useEffect, useRef, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

import Chart from 'chart.js';

import { FullLine } from './style';
import { NoteContext } from '../../utils/providers/notes';

const options = {
  maintainAspectRatio: false,
  aspectRatio: 5,
  responsive: true,
  legend: {
    display: false,
  },
  tooltips: {
    enabled: false,
  },
  scales: {
    yAxes: [
      {
        type: 'category',
        labels: ['', 'Lettuce'],
        gridLines: {
          display: false,
        },
      },
    ],
    xAxes: [
      {
        type: 'time',
        time: {
          unit: 'month',
        },
        gridLines: {
          display: false,
        },
      },
    ],
  },
};

const data = {
  labels: [1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006],
  datasets: [
    {
      fill: false,
      backgroundColor: 'transparent',
      pointRadius: 8,
      pointHoverRadius: 8,
      pointBorderWidth: 1,
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 3,
      pointBackgroundColor: ['#00A960', '#00A960', '#00A960', '#00A960', '#FF8400', '#FF8400', '#6FE8AE'],
      pointBorderColor: [],
      data: [1, 1, 1, 1, 1, 1, 1],
    },
    {
      fill: false,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      pointRadius: 7,
      pointHoverRadius: 7,
      pointBorderWidth: 1,
      pointHoverBorderColor: 'transparent',
      pointHoverBorderWidth: 3,
      pointBackgroundColor: [],
      pointBorderColor: [],
      data: [0, 0, 0, 0, 0, 0, 0],
    },
  ],
};

// eslint-disable-next-line no-unused-vars
const Timeline = ({ scans }) => {
  const chartRef = useRef();
  let chart = useRef();
  const { isActive } = useContext(NoteContext);

  const clicked = useCallback(
    (_, i) => {
      const index = i[0]?._index;
      if (typeof index !== 'number' || !chart || !isActive) return;
      chart.data.datasets[1].pointBackgroundColor[index] =
        chart.data.datasets[1].pointBackgroundColor[index] === '#d3d3d3' ? 'transparent' : '#d3d3d3';
      chart.update();
    },
    [isActive],
  );

  useEffect(() => {
    console.log(scans);
    // To prevent infinite re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    chart = new Chart(chartRef.current.getContext('2d'), {
      type: 'line',
      data,
      options: {
        onClick: clicked,
        ...options,
      },
    });
  }, [isActive]);

  return (
    <FullLine>
      <canvas key={isActive} id="myChart" ref={chartRef} />
    </FullLine>
  );
};

Timeline.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  scans: PropTypes.array.isRequired,
};

export default Timeline;

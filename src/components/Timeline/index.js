import React, { useEffect, useRef, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';

import useRouter from 'utils/hooks/router';
import { NoteContext } from 'utils/providers/notes';
import { FullLine } from './style';

const options = {
  maintainAspectRatio: false,
  aspectRatio: 5,
  responsive: true,
  legend: {
    display: false,
  },
  tooltips: {
    enabled: true,
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

const Timeline = ({ scans }) => {
  const chartRef = useRef();
  let chart = useRef();
  const { isActive } = useContext(NoteContext);
  const router = useRouter();

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
        data: scans.map(({ date }) => ({ y: 0, x: date.split('T')[0] })),
      },
    ],
  };

  const clicked = useCallback(
    (_, i) => {
      const index = i[0]?._index;
      if (typeof index !== 'number' || !chart) return;
      if (isActive) {
        chart.data.datasets[1].pointBackgroundColor[index] =
          chart.data.datasets[1].pointBackgroundColor[index] === '#d3d3d3' ? 'transparent' : '#d3d3d3';
        chart.update();
      } else {
        router.push(`/plant/${chart.data.datasets[0].data[index].id}`);
      }
    },
    [isActive, router],
  );

  useEffect(() => {
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
  scans: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, date: PropTypes.string })).isRequired,
};

export default Timeline;

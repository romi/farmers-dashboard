import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Chart from 'chart.js';
import { ROMI_API } from 'utils/constants';
import { theme } from 'utils/theme';
import config from './config';

const Growth = ({ apiID }) => {
  const chartRef = useRef();
  let chart = useRef();

  const createData = async () => {
    const {
      data: {
        results: { curve },
      },
    } = await axios.get(`${ROMI_API}/analyses/${apiID}`);

    return {
      datasets: [
        {
          // TODO: When unit is available in backend modify line below
          label: 'Plant Size (px)',
          fill: false,
          data: curve.map(({ value, date }) => ({ x: date, y: value })),
          borderColor: theme.primary,
        },
        {
          label: 'Mean',
          fill: false,
          data: curve.map(({ mean, date }) => ({ x: date, y: mean })),
          borderColor: theme.secondary,
          pointRadius: 0,
          pointHoverRadius: 0,
        },
        {
          label: 'Stdev +',
          fill: false,
          data: curve.map(({ stdev, mean, date }) => ({ x: date, y: mean + stdev })),
          borderColor: '#ffd27f',
          backgroundColor: '#fff6e5',
          pointRadius: 0,
          pointHoverRadius: 0,
        },
        {
          label: 'Stdev -',
          fill: '-1',
          data: curve.map(({ stdev, mean, date }) => ({ x: date, y: mean - stdev })),
          borderColor: '#ffd27f',
          backgroundColor: '#fff6e5',
          pointRadius: 0,
          pointHoverRadius: 0,
        },
      ],
    };
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await createData();
        chart = new Chart(chartRef.current.getContext('2d'), {
          data,
          ...config,
        });
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      try {
        chart.destroy();
      } catch (e) {
        console.error(e);
      }
    };
  }, [apiID]);

  return <canvas id="growth-canvas" ref={chartRef} />;
};

Growth.propTypes = {
  apiID: PropTypes.string.isRequired,
};

export default Growth;

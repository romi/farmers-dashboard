import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Chart from 'chart.js';
import { ROMI_API } from 'utils/constants';
import { theme } from 'utils/theme';

import config from './config';
import { Container } from './style';

const Growth = ({ apiID }) => {
  const chartRef = useRef();
  const [chart, setChart] = useState(undefined);

  const createData = async () => {
    const {
      data: {
        results: {
          curve,
          unit: { name: unitName },
          observable: { name: obsName },
        },
      },
    } = await axios.get(`${ROMI_API}/analyses/${apiID}`);

    return {
      unitName,
      obsName,
      datasets: [
        {
          label: 'Plant Size',
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
        const { datasets, obsName, unitName } = await createData();
        if (chart) {
          chart.data.datasets = datasets;
          chart.update();
        } else {
          setChart(
            new Chart(chartRef.current.getContext('2d'), {
              data: { datasets },
              ...config(obsName, unitName),
            }),
          );
        }
      } catch (err) {
        console.error(err);
      }
    })();
    // eslint-disable-next-line
  }, [apiID]);

  return (
    <Container>
      <canvas id="growth-canvas" ref={chartRef} />
    </Container>
  );
};

Growth.propTypes = {
  apiID: PropTypes.string.isRequired,
};

export default Growth;

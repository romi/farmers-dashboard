import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ROMI_API } from 'utils/constants';
import { Container } from './style';
import baseConfig from './config';

export const LineChart = ({ range, config }) => {
  const chartRef = useRef();
  let chart = useRef();
  const [datastreams, setDatastreams] = useState(undefined);
  const period = (range * 24 * 60) / 15;
  const randColor = () => {
    const lRange = '0123456789abcdef';
    let color = '#';
    for (let i = 0; i < 6; i++) color += lRange[Math.floor(Math.random() * 16)];
    return color;
  };

  useEffect(() => {
    (async () => {
      const datas = config.filter(({ apiId }) => apiId);
      const response = await axios.all(datas.map(({ apiId }) => axios.get(`${ROMI_API}/datastreams/${apiId}/values`)));
      const tmp = Object.fromEntries(response.map(({ data }, i) => [datas[i].id, data]));
      setDatastreams(tmp);
      const chartConfig = {
        ...baseConfig,
        data: {
          datasets: datas.map(({ label, id, color }) => ({
            label: label || '',
            borderColor: color || randColor(),
            fill: false,
            data: tmp[id].slice(0, period).map(({ date, value }) => ({ x: date, y: value })),
          })),
        },
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
      chart = new Chart(chartRef.current.getContext('2d'), chartConfig);
    })();
    return () => {
      try {
        chart.destroy();
      } catch (e) {
        console.error(e);
      }
    };
  }, []);

  if (!datastreams) return <div>Loading...</div>;

  return (
    <Container>
      <canvas id="my_canvas" ref={chartRef} />
    </Container>
  );
};
LineChart.propTypes = {
  range: PropTypes.number,
  config: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      apiId: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
LineChart.defaultProps = {
  range: 1,
};

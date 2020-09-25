import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ROMI_API } from 'utils/constants';
import Loading from 'components/Loader';
import baseConfig from './config';
import { Container } from './style';

export const LineChart = ({ range, config, isDatastream }) => {
  const chartRef = useRef();
  const [chart, setChart] = useState(undefined);
  const [persistConfig, setPersistConfig] = useState(undefined);
  const [datastreams, setDatastreams] = useState(undefined);
  const datas = config.filter(({ apiId }) => apiId);
  const period = (range * 24 * 60) / 15;
  const randColor = () => {
    const lRange = '0123456789abcdef';
    let color = '#';
    for (let i = 0; i < 6; i++) color += lRange[Math.floor(Math.random() * 16)];
    return color;
  };

  const fetchData = async () => {
    const response = isDatastream
      ? await axios.all(datas.map(({ apiId }) => axios.get(`${ROMI_API}/datastreams/${apiId}/values`)))
      : (await axios.all(datas.map(({ apiId }) => axios.get(`${ROMI_API}/analyses/${apiId}`)))).map(({ data }) => ({
          data: data?.results?.curve,
        }));
    return Object.fromEntries(response.map(({ data }, i) => [datas[i].id, data]));
  };

  useEffect(() => {
    (async () => {
      const apiData = await fetchData();
      const chartConfig = {
        ...baseConfig,
        data: {
          datasets: datas.map(({ label, id, color }) => ({
            label: label || '',
            borderColor: color || randColor(),
            fill: false,
            data: apiData[id].slice(0, period).map(({ date, value }) => ({ x: date, y: value })),
          })),
        },
      };
      setDatastreams(apiData);
      setPersistConfig(config);
      setChart(new Chart(chartRef.current, chartConfig));
    })();
    return () => {
      try {
        // TODO: investigate why is is that an error on chart.destroy (undefined)
        // chart.destroy();
      } catch (e) {
        console.error(e);
      }
    };
  }, []);

  useEffect(() => {
    if (!chart) return;
    if (JSON.stringify(config) === JSON.stringify(persistConfig)) return;
    (async () => {
      const apiData = await fetchData();
      setDatastreams(apiData);
      chart.data.datasets = datas.map(({ label, id, color }) => ({
        label: label || '',
        borderColor: color || randColor(),
        fill: false,
        data: apiData[id].slice(0, period).map(({ date, value }) => ({ x: date, y: value })),
      }));
      chart.update();
      setPersistConfig(config);
    })();
  }, [config]);

  if (!datastreams) return <Loading />;

  return (
    <Container key="line-chart">
      <canvas id="my_canvas_growth" ref={chartRef} />
    </Container>
  );
};
LineChart.propTypes = {
  range: PropTypes.number,
  isDatastream: PropTypes.bool,
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
  isDatastream: false,
};

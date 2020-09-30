import React, { useEffect, useRef, useState, useContext } from 'react';
import Chart from 'chart.js';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ROMI_API } from 'utils/constants';
import Loading from 'components/Loader';
import { TimelineContext } from 'utils/providers/timeline';
import baseConfig from './config';
import { Container } from './style';

export const Analytics = ({ range, config }) => {
  const chartRef = useRef();
  const [chart, setChart] = useState(undefined);
  const [datastreams, setDatastreams] = useState(undefined);
  const { picView } = useContext(TimelineContext);

  const datas = config.filter(({ apiId }) => apiId);
  const randColor = () => {
    const lRange = '0123456789abcdef';
    let color = '#';
    for (let i = 0; i < 6; i++) color += lRange[Math.floor(Math.random() * 16)];
    return color;
  };

  const fetchData = async () => {
    const response = await axios.all(datas.map(({ apiId }) => axios.get(`${ROMI_API}/datastreams/${apiId}/values`)));
    return Object.fromEntries(response.map(({ data }, i) => [datas[i].id, data]));
  };

  useEffect(() => {
    (async () => {
      try {
        const apiData = await fetchData();
        const timelineData = picView && (await axios.get(`${ROMI_API}/scans/${picView}`))?.data;
        const datasets = datas.map(({ label, id, color }) => {
          const sliced = timelineData
            ? apiData[id]
                .map((val, i) => ({ ...val, i }))
                .find(({ date }) => new Date(timelineData.date).getTime() < new Date(date).getTime())?.i
            : 0;

          return {
            label: label || '',
            borderColor: color || randColor(),
            fill: false,
            data: apiData[id].splice(sliced, apiData[id].length).map(({ date, value }) => ({ x: date, y: value })),
          };
        });

        setDatastreams(apiData);
        if (!chart) {
          setChart(
            new Chart(chartRef.current, {
              ...baseConfig,
              data: {
                datasets,
              },
            }),
          );
        } else {
          chart.data.datasets = datasets;
          chart.update();
        }
      } catch (e) {
        console.error(e);
      }
    })();
    // eslint-disable-next-line
  }, [range, config]);

  if (!datastreams) return <Loading />;
  return (
    <Container>
      <canvas id="my_canvas_growth" ref={chartRef} />
    </Container>
  );
};
Analytics.propTypes = {
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
Analytics.defaultProps = {
  range: 1,
};

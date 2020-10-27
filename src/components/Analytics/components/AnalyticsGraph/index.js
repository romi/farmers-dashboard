import React, { useEffect, useRef, useState, useContext } from 'react';
import Chart from 'chart.js';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ROMI_API } from 'utils/constants';
import Loading from 'components/Loader';
import { TimelineContext } from 'utils/providers/timeline';
import baseConfig from './config';
import { CanvasArea, Container, Wrapper } from './style';

export const AnalyticsGraph = ({ before, range, config }) => {
  const chartRef = useRef();
  const [chart, setChart] = useState(undefined);
  const [persistPicView, setPersistPicView] = useState(undefined);
  const [datastreams, setDatastreams] = useState(undefined);
  const [timelineData, setTimelineData] = useState(undefined);
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

  const reajust = num => (num - before >= 0 ? 0 : (num - before) * -1);

  useEffect(() => {
    (async () => {
      try {
        if (picView === persistPicView) return;
        setPersistPicView(picView);
        const apiData = await fetchData();
        const scanData = picView && (await axios.get(`${ROMI_API}/scans/${picView}`))?.data;
        setTimelineData(scanData);
        const datasets = datas.map(({ label, id, color }) => {
          const pointColor = color || randColor();
          return {
            label: label || '',
            borderColor: pointColor,
            fill: false,
            data: apiData[id].map(({ date, value }) => ({ x: date, y: value })),
            pointRadius: 5,
            pointBackgroundColor: pointColor,
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
  }, [config, picView]);

  useEffect(() => {
    if (!chart || !datastreams) return;
    try {
      chart.data.datasets = datas.map(({ label, id, color }) => {
        const pointColor = color || randColor();
        return {
          label: label || '',
          borderColor: pointColor,
          fill: false,
          data: datastreams[id].map(({ date, value }) => ({ x: date, y: value })),
          pointRadius: 5,
          pointBackgroundColor: pointColor,
        };
      });
      chart.update();
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line
  }, [range]);

  if (!datastreams) return <Loading />;
  return (
    <Container>
      <Wrapper>
        <CanvasArea pointNb={datastreams.soil.length}>
          <canvas
            id="analytics_chart"
            ref={chartRef}
          />
        </CanvasArea>
      </Wrapper>
    </Container>
  );
};
AnalyticsGraph.propTypes = {
  before: PropTypes.number.isRequired,
  range: PropTypes.number.isRequired,
  config: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      apiId: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import axios from 'axios';
import { Container } from './style';

export const LineChart = () => {
  const chartRef = useRef();
  let chart = useRef();
  const [data, setData] = useState(undefined);
  const lastDays = 1;

  useEffect(() => {
    (async () => {
      const tmp = {
        temp: (
          await axios.get('https://db.romi-project.eu/api/datastreams/eae15b30-4776-4217-b1ca-f8afc52f6bd2/values')
        ).data.slice(0, (lastDays * 24 * 60) / 15),
        hum: (
          await axios.get('https://db.romi-project.eu/api/datastreams/dd9ccc1b-6ba2-4bf8-a925-361ca8027be0/values')
        ).data.slice(0, (lastDays * 24 * 60) / 15),
        sun: (
          await axios.get('https://db.romi-project.eu/api/datastreams/c661a874-e835-47e5-aefd-695609d876d6/values')
        ).data.slice(0, (lastDays * 24 * 60) / 15),
      };
      setData(tmp);
      const config = {
        type: 'line',
        data: {
          datasets: [
            {
              label: 'Temperature (°C)',
              borderColor: '#C7B95B',
              fill: false,
              data: tmp.temp.map(({ date, value }) => ({ x: date, y: value })),
            },
            {
              label: 'Soil humidity (%)',
              borderColor: '#23AFF9',
              fill: false,
              data: tmp.hum.map(({ date, value }) => ({ x: date, y: value })),
            },
            {
              label: 'Sunlight (umole/m²/s)',
              borderColor: '#01AA55',
              fill: false,
              data: tmp.sun.map(({ date, value }) => ({ x: date, y: value })),
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                type: 'time',
                time: {
                  unit: 'day',
                },
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Date',
                },
                ticks: {
                  major: {
                    fontStyle: 'bold',
                    fontColor: '#FF0000',
                  },
                },
              },
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'value',
                },
              },
            ],
          },
        },
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
      chart = new Chart(chartRef.current.getContext('2d'), config);
    })();
    return () => {
      try {
        chart.destroy();
      } catch (e) {
        console.error(e);
      }
    };
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <Container>
      <canvas id="my_canvas" ref={chartRef} />
    </Container>
  );
};

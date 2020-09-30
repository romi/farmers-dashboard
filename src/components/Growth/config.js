export default {
  type: 'line',
  options: {
    responsive: true,
    maintainAspectRatio: false,
    spanGaps: false,
    plugins: {
      filler: {
        propagate: false,
      },
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'day',
          },
          display: true,
          scaleLabel: {
            display: false,
            labelString: 'Date',
          },
          ticks: {
            autoSkip: false,
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
            display: false,
            labelString: 'value',
          },
        },
      ],
    },
  },
};

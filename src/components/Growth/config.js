export default {
  type: 'line',
  options: {
    responsive: true,
    maintainAspectRatio: false,
    spanGaps: false,
    tooltips: {
      filter: ({ datasetIndex }) => datasetIndex === 0,
      callbacks: {
        title: () => null,
        label: ({ index }, data) => data.datasets[0].data[index]?.y,
        titleFontSize: 16,
        bodyFontSize: 14,
        displayColors: false,
      },
    },
    // plugins: {
    //   filler: {
    //     propagate: false,
    //   },
    // },
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

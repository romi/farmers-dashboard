export default (obsName, unitName) => ({
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
    title: {
      display: true,
      text: `${obsName} (${unitName})`,
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'day',
          },
          scaleLabel: {
            display: false,
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
    },
  },
});

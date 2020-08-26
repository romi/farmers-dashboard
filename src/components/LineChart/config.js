export default {
  type: 'line',
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

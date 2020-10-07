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
            display: false,
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
            display: false,
            labelString: 'value',
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        title: data => data[0].label.split('T')[0].split('-').reverse().join('/'),
        label: ({ index, datasetIndex }, data) => {
          const value = data.datasets[datasetIndex].data[index].y.toFixed(2);
          let unit = null;
          const { label } = data.datasets[datasetIndex];
          if (label.includes('(')) {
            const [inside] = label.split('(')[1].split(')');
            unit = inside;
          }
          if (unit) return `${label.split('(')[0]}: ${value} ${unit}`;
          return value;
        },
      },
      titleFontSize: 16,
      bodyFontSize: 14,
      displayColors: false,
    },
  },
};

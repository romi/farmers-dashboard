export default {
  maintainAspectRatio: false,
  aspectRatio: 5,
  responsive: true,
  legend: {
    display: false,
  },
  layout: {
    padding: {
      left: 0,
      right: 15,
      top: 0,
      bottom: 0,
    },
  },
  scales: {
    yAxes: [
      {
        type: 'category',
        labels: ['', 'Lettuce'],
        gridLines: {
          display: false,
        },
      },
    ],
    xAxes: [
      {
        type: 'time',
        time: {
          unit: 'month',
        },
        gridLines: {
          display: false,
        },
      },
    ],
  },
  tooltips: {
    callbacks: {
      title: () => null,
      label: (item, data) => data.datasets[0].data[item.index].x.split('-').join(' '),
    },
    titleFontSize: 16,
    bodyFontSize: 14,
    displayColors: false,
  },
};

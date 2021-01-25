const colors = {
  text: '#FFFFFF',
  grid: '#2C2F33',
  background: '#23272A'
};

export const pollChart = {
  colors: {
    text: colors.text,
    grid: colors.grid,
    background: colors.background
  },
  plugins: {
    beforeDraw: (instance: Chart) => {
      const { ctx, width, height } = instance;
      if (!ctx) return;
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, width!, height!);
    }
  },
  width: 600,
  height: 60,
  options: {
    type: 'horizontalBar',
    options: {
      layout: { padding: 10 },
      legend: { display: false },
      scales: {
        xAxes: [{
          gridLines: {
            color: colors.grid,
            drawBorder: false,
            zeroLineWidth: 2,
            zeroLineColor: colors.grid
          },
          ticks: {
            fontColor: colors.text,
            padding: 5,
            beginAtZero: true,
            stepSize: 1
          }
        }],
        yAxes: [{
          gridLines: { display: false },
          ticks: { fontColor: colors.text }
        }]
      }
    }
  }
};

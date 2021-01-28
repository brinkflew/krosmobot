import { COLORS } from './colors';

/* eslint-disable @typescript-eslint/naming-convention */

export const POLL_RESULT = {
  colors: {
    text: COLORS.text,
    grid: COLORS.grid,
    background: COLORS.background
  },
  plugins: {
    beforeDraw: (instance: Chart) => {
      const { ctx, width, height } = instance;
      if (!ctx) return;
      ctx.fillStyle = COLORS.background;
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
            color: COLORS.grid,
            drawBorder: false,
            zeroLineWidth: 2,
            zeroLineColor: COLORS.grid
          },
          ticks: {
            fontColor: COLORS.text,
            padding: 5,
            beginAtZero: true,
            stepSize: 1
          }
        }],
        yAxes: [{
          gridLines: { display: false },
          ticks: { fontColor: COLORS.text }
        }]
      }
    }
  }
};

/* eslint-enable @typescript-eslint/naming-convention */

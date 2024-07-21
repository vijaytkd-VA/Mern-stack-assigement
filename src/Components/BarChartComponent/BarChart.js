
import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import './BarChart.css';

const BarChart = ({ data, month }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const filteredData = data.filter(item => new Date(item.dateOfSale).toLocaleString('default', { month: 'long' }) === month);
    const ranges = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    const counts = ranges.map((range, index) => {
      return filteredData.filter(item => item.price > range && item.price <= ranges[index + 1]).length;
    });

    const chart = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: ranges.map((range, index) => `${range} - ${ranges[index + 1] || 'above'}`),
        datasets: [{
          label: 'Number of Items',
          data: counts,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data, month]);

  return <div className="bar-chart">
    <h1>Bar Chart Stats - {month}</h1>
    <canvas ref={chartRef}></canvas></div>;
};

export default BarChart;

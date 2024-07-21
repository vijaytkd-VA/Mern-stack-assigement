
import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import './PieChart.css';

const PieChart = ({ data, month }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const filteredData = data.filter(item => new Date(item.dateOfSale).toLocaleString('default', { month: 'long' }) === month);
    const categories = [...new Set(filteredData.map(item => item.category))];
    const counts = categories.map(category => filteredData.filter(item => item.category === category).length);

    const chart = new Chart(chartRef.current, {
      type: 'pie',
      data: {
        labels: categories,
        datasets: [{
          label: 'Number of Items',
          data: counts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
        }],
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data, month]);

  return <div className="pie-chart"><canvas ref={chartRef}></canvas></div>;
};

export default PieChart;

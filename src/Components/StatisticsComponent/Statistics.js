
import React from 'react';
import './Statistics.css';

const Statistics = ({ data, month }) => {
  const filteredData = data.filter(item => new Date(item.dateOfSale).toLocaleString('default', { month: 'long' }) === month);
  const totalSales = filteredData.reduce((sum, item) => sum + item.price, 0);
  const soldItems = filteredData.length;
  const notSoldItems = data.length - soldItems;

  return (
    <div className="statistics">
      <h2>Statistics - {month}</h2>
      <div className="statistics-data">
      <p className="statistics-data1">Total Sales: {totalSales.toFixed(2)}</p>
      <p className="statistics-data1">Total Sold Items: {soldItems}</p>
      <p className="statistics-data1">Total Not Sold Items: {notSoldItems}</p>
      </div>
    </div>
  );
};

export default Statistics;

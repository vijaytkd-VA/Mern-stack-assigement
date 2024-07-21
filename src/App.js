import React, { useState, useEffect } from 'react';
import TransactionsTable from './Components/TransactionsTableComponent/TransactionsTable';
import Statistics from './Components/StatisticsComponent/Statistics';
import BarChart from './Components/BarChartComponent/BarChart';
import PieChart from './Components/PieChartComponent/PieChart';
import ClipLoader from 'react-spinners/ClipLoader';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState('January');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/roxiler.com/product_transaction.json');
        if (!response.ok) {
          throw new Error('Network response error');
        }
        const fetchedData = await response.json();
        console.log("Fetched Data:", fetchedData);
        setData(fetchedData);
      } catch (error) {
        //console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Transactions Dashboard</h1>
        <div className="select-menu">
          <select className="select-menu-inner" value={month} onChange={e => setMonth(e.target.value)}>
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
              .map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </header>
      <div className="content">
        {loading ? (
          <div className="spinner-container">
            <ClipLoader color="#123abc" loading={loading} size={50} />
          </div>
        ) : (
          <>
            <TransactionsTable data={data} month={month} />
            <Statistics data={data} month={month} />
            <BarChart data={data} month={month} />
            <PieChart data={data} month={month} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;

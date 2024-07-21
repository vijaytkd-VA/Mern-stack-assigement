
import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import './TransactionsTable.css';

const TransactionsTable = ({ data, month, loading }) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  // Filter data based on search term and month
  const filteredData = data.filter(item => {
    const date = new Date(item.dateOfSale);
    const itemMonth = date.toLocaleString('default', { month: 'long' });
    const searchLower = search.toLowerCase();
    return itemMonth === month && (
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.price.toString().includes(searchLower)
    );
  });

  // Calculate the transactions to display on the current page
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredData.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / transactionsPerPage);

  // Pagination functions
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="transactions-table">
      <h2>Transactions Table</h2>
      <input
        className="input"
        type="text"
        placeholder="Search transactions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      {loading ? (
        <div className="spinner-container">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Sold</th>
                <th>Image</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.sold}</td>
                  <td><img src={item.image} alt={item.title} width={39} height={49} /></td>
                  <td>{new Date(item.dateOfSale).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="bottom-content">
            <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
            <p>Page {currentPage} of {totalPages}</p>
            <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
            <p>Per Page: {transactionsPerPage}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionsTable;

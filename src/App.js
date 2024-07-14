import React, { useState, useEffect } from 'react';
import CustomerTable from './components/CustomerTable';
import TransactionGraph from './components/TransactionGraph';

const API_URL = 'http://localhost:3001/api/data';

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCustomers(data.customers);
      setTransactions(data.transactions);
      setFilteredTransactions(data.transactions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilter = (filterText) => {
    if (!filterText) {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter(transaction =>
        transaction.amount.toString().includes(filterText) ||
        customers.find(customer => customer.id === transaction.customer_id)?.name.toLowerCase().includes(filterText.toLowerCase())
      );
      setFilteredTransactions(filtered);
    }
  };

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomer(customerId);
  };

  return (<>
    <div className="container mt-4">
      <h1 className="mb-4">Customer Transactions Dashboard</h1>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Filter by name or amount"
        onChange={(e) => handleFilter(e.target.value)}
      />
      <div className='row'>
        <div className='col-md-6'>
          <CustomerTable
            customers={customers}
            transactions={filteredTransactions}
            onCustomerSelect={handleCustomerSelect}
          />
        </div>
        <div className='col-md-6'>
          {selectedCustomer && (
            <TransactionGraph
              customerId={selectedCustomer}
              transactions={filteredTransactions.filter(transaction => transaction.customer_id === selectedCustomer)}
            />
          )}
        </div>
      </div>
    </div>
  </>

  );
};

export default App;

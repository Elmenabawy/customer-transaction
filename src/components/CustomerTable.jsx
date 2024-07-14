import React from 'react';

const CustomerTable = ({ customers, transactions, onCustomerSelect }) => {
    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Transaction Amount</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map(transaction => (
                    <tr key={transaction.id} onClick={() => onCustomerSelect(transaction.customer_id)} style={{ cursor: 'pointer' }}>
                        <td>{transaction.customer_id}</td>
                        <td>{customers.find(customer => customer.id === transaction.customer_id)?.name}</td>
                        <td>${transaction.amount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CustomerTable;

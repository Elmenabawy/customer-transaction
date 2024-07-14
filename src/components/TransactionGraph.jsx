import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const TransactionGraph = ({ customerId, transactions }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const filteredTransactions = transactions.filter(transaction => transaction.customer_id === customerId);
            const dates = filteredTransactions.map(transaction => transaction.date);
            const amounts = filteredTransactions.map(transaction => transaction.amount);

            chartInstance.current = new Chart(chartRef.current, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [
                        {
                            label: 'Total Amount',
                            data: amounts,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1,
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Date',
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Amount',
                            },
                        },
                    },
                },
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [customerId, transactions]);

    return <canvas ref={chartRef} width={120} height={158} className="my-2 h-75"></canvas>;
};

export default TransactionGraph;

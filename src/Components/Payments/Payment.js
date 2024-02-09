import React, { useEffect, useState } from 'react';
import './payment.css';
import axios from 'axios';

const Payment = () => {
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        const Token = localStorage.getItem('token');
        console.log(Token)

        const fetchData = async () => {
            try {
                const response = await axios.get('https://eccomerce-av7e.onrender.com/api/v1/my-order', {
                    headers: { 'Authorization': `Bearer ${Token}` }
                });

                const orders = response.data.data;
                console.log('order' , orders)

                const orderDetailsPromises = orders.map(async (order) => {
                    const response = await axios.get(`https://eccomerce-av7e.onrender.com/api/v1/get-Transication-id/${order._id}`);
                    return { orderId: order._id, transitionId: response.data.data };
                });

                const resolvedOrderDetails = await Promise.all(orderDetailsPromises);
                setOrderDetails(resolvedOrderDetails);
            } catch (error) {
                console.error('Error fetching order list:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='payment-section'>
            <div className='container'>
                <h2>Payments</h2>
                <div className='payment-row'>
                    {orderDetails.map((order, index) => (
                        <div className='order-details' key={index}>
                            <h2>Order Detail</h2>
                            <div className='order-detail-bottom'>
                                <p>Order ID:</p>
                                <span>{order.orderId}</span>
                                <p>Transaction ID:</p>
                                <span>{order.transitionId}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Payment;

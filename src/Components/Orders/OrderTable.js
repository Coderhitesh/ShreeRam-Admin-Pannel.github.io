import React, { useEffect, useState } from 'react';
import './profileOptions.css';
import axios from 'axios';

const OrderTable = () => {
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const Token = localStorage.getItem('token');

  const getOrderList = async () => {
    try {
      const response = await axios.get('https://eccomerce-av7e.onrender.com/api/v1/admin-order', {
        headers: { 'Authorization': `Bearer ${Token}` }
      });
      setData(response.data.data);
      await getUserDetails(response.data.data);
    } catch (error) {
      console.error('Error fetching order list:', error);
    }
  };

  const getUserDetails = async (orders) => {
    const userIds = orders.map(order => order.user);
    try {
      const responses = await Promise.all(userIds.map(userId =>
        axios.get(`https://eccomerce-av7e.onrender.com/api/v1/finduserbyid/${userId}`)
      ));
      const usersData = responses.map(response => response.data.data);
      setUser(usersData);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleChangeStatus = (id) => {
    window.location.href = `/changeorder/${id}`;
  };

  useEffect(() => {
    getOrderList();
  }, [Token]);

  return (
    <div className='my-order'>
      <div className='container'>
        <table className='order-table'>
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Order Id</th>
              <th>Order Date</th>
              <th>Address</th>
              <th>User Name</th>
              <th>Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((order, index) => (
              <tr key={index} className='order-row'>
                <td className='p-image'>
                  <img src={order.product[0].image[0]} alt="product" />
                </td>
                <td className='p-name'>{order.product[0].name || 'Not Available'}</td>
                <td className='p-price'>Rs. {order.product[0].price || 'Not Available'}</td>
                <td className='p-status'>
                  {order.orderStatus || 'Not Available'}
                  <button className='button' onClick={() => handleChangeStatus(order._id)}>Change Status</button>
                </td>
                <td className='p-transition'>{order._id || 'Not Available'}</td>
                <td className='p-order'>{new Date(order.createdAt).toLocaleDateString() || 'Not Available'}</td>
                <td className='p-address'>{order.address[0].street}, {order.address[0].city}, {order.address[0].state} - {order.address[0].pincode || 'Not Available'}</td>
                {user && user[index] && (
                  <React.Fragment key={`${index}-user`}>
                    <td className='user-name'>{user[index].Name || 'Not Available'}</td>
                    <td className='user-contact'>{user[index].ContactNumber || 'Not Available'}</td>
                    {/* Uncomment this line if needed */}
                    {/* <td className='user-email'>{user[index].Email || 'Not Available'}</td> */}
                  </React.Fragment>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;

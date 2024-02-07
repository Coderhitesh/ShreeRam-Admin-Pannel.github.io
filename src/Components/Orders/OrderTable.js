import axios from 'axios';
import React, { useEffect } from 'react';

const OrderTable = ({ Orders }) => {
    const ProductIds = Orders && Orders.map((item) => item._id);
    // console.log(ProductIds)

    const handleFetch = async () => {
        try {
          // Use Promise.all to make multiple requests concurrently
          const responses = await Promise.all(
            ProductIds.map(async (productId) => {
              return axios.post(
                `https://eccomerce-av7e.onrender.com/api/v1/single-product/${productId}`
              );
            })
          );
    

          console.log("productData",responses.data);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      useEffect(()=>{
        handleFetch()
      },[])
  return (
    <div className='order-section-main'>
      <div className='order-container-box'>
      <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Product ID</th>
          <th>User ID</th>
          <th>Order Status</th>
        </tr>
      </thead>
      <tbody>
        {Orders && Orders.map((order) => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.product}</td>
            <td>{order.user}</td>
            <td>{order.orderStatus}</td>
          </tr>
        ))}
      </tbody>
    </table>
      </div>
    </div>
  );
};

export default OrderTable;

import React, { useEffect, useState } from 'react'
import axios from "axios"
import OrderTable from './OrderTable';
const AllOrders = () => {
  const [Orders,setOrders] = useState()
  const token = localStorage.getItem('token');

  const handleFetch = async() =>{
    try {
      const response = await axios.get('https://eccomerce-av7e.onrender.com/api/v1/admin-order',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      )
      console.log('allorder',response.data.data)
      setOrders(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    handleFetch()
  },[])
  return (
 <OrderTable  Orders={Orders}      />
  )
}

export default AllOrders
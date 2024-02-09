import React from 'react'
import Header from '../Header/Header'
import { Routes, Route } from 'react-router-dom';
import Login from '../Auth/Login';
import AddProduct from '../Add-Product/AddProduct';
import Product from '../Product/Product';
import EditProduct from '../Product/EditProduct';
import HomeScreen from './HomeScreen';
import AllOrders from '../Orders/AllOrders';
import './home.css'
import Register from '../Register/Register';
import Payment from '../Payments/Payment';
import Shipped from '../shipped/Shipped';
import ChangeOrderStatus from '../Orders/ChangeOrderStatus';

const Home = () => {
  return (

    <div className='main'>
      <div className='container'>
        <div className='main-header-side'>
          <Header />
        </div>
        <div className='main-home-side'>
          <Routes>
            <Route path="/" element={<HomeScreen />} />

            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<AddProduct />} />
            <Route path="/All-products" element={<Product />} />
            <Route path="/Edit-Product/:id" element={<EditProduct />} />
            <Route path="/All-Order" element={<AllOrders />} />
            <Route path="/register" element={<Register />} />
            <Route path="/payments" element={<Payment />} />
            <Route path="/changeorder/:id" element={<ChangeOrderStatus />} />

          </Routes>
        </div>
      </div>
    </div>





    // <div className='container'>
    //   <div className='header-side'>
    //       <Header/>
    //   </div>
    //   <div className='home-side'>
    //   <Routes>
    //   <Route path="/" element={<HomeScreen />} />

    //   <Route path="/login" element={<Login />} />
    //   <Route path="/products" element={<AddProduct />} />
    //   <Route path="/All-products" element={<Product />} />
    //   <Route path="/Edit-Product/:id" element={<EditProduct />} />
    //   <Route path="/All-Order" element={<AllOrders />} />

    //   </Routes>
    //   </div>
    // </div>
  )
}

export default Home
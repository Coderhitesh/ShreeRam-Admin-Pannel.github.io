import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './changestatus.css';

const ChangeOrderStatus = () => {
    const { id } = useParams();
    const [formdata, setFormdata] = useState({
        status: "",
        orderId: id
    });

    const handleChange = (e) => {
        setFormdata({ ...formdata, status: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formdata)
        try {
            const response = await axios.get('https://eccomerce-av7e.onrender.com/api/v1/update-order', formdata);
            console.log(response);
            toast.success("Order status updated successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update order status");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="change-order-status-form">
                <div className="order-id-input">
                    <label htmlFor="order-id">Order ID:</label>
                    <input type='text' id="order-id" value={id} readOnly />
                </div>
                <div className="status-select">
                    <label htmlFor="status">Status:</label>
                    <select id="status" value={formdata.status} onChange={handleChange}>
                        <option value="">--Select Status--</option>
                        <option value="Pending">Pending</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                </div>
                <button type="submit" className="submit-btn">Update Status</button>
            </form>
        </>
    );
};

export default ChangeOrderStatus;

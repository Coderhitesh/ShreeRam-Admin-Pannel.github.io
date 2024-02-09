import React, { useState } from 'react';
import './Addproduct.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AddProduct = () => {
    const [formdata, setFormdata] = useState({
        ProductName: "",
        ProductDescription: "",
        discountPrice: "",
        prices: "",
        tag: "",
        sizes: [], // Update to an array for multiple sizes
        color: "",
        image: "",
        inStock: "",
        category: "",
        keyword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleAddSize = () => {
        setFormdata((prevFormData) => ({
            ...prevFormData,
            sizes: [...prevFormData.sizes, { SizeNumber: "", StockNumber: 10 }],
        }));
    };

    const handleSizeChange = (index, e) => {
        const { name, value } = e.target;
        const updatedSizes = [...formdata.sizes];
        updatedSizes[index] = { ...updatedSizes[index], [name]: value };
        setFormdata((prevFormData) => ({
            ...prevFormData,
            sizes: updatedSizes,
        }));
    };

    const token = localStorage.getItem('token');
    console.log(token)

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formdata);
        try {
            const response = await axios.post(
                'https://eccomerce-av7e.onrender.com/api/v1/create-product',
                formdata,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            toast.success('Product Added Successfully');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to add product');
        }
    };

    return (
        <div className='add-product-main-box'>
            <div className='add-product-container-box'>
                <div className='ProductContainer'>
                    <div className='product-add-heading'>
                        <h3>Add Products</h3>
                    </div>
                    <div className='Add-form'>
                        <div className='forms-product'>
                            <form onSubmit={handleSubmit} className='form-main'>
                                {Object.keys(formdata).map((key) => (
                                    <div className='form-group' key={key}>
                                        <label htmlFor={key}>{key}</label>
                                        {key === 'ProductDescription' ? (
                                            <textarea
                                                onChange={handleChange}
                                                value={formdata[key]}
                                                name={key}
                                                rows="4"
                                                cols="50"
                                            />
                                        ) : key === 'inStock' ? (
                                            <select onChange={handleChange} value={formdata[key]} name={key}>
                                                <option value={true}>True</option>
                                                <option value={false}>False</option>
                                            </select>
                                        ) : (
                                            <input type="text" onChange={handleChange} value={formdata[key]} name={key} />
                                        )}
                                    </div>
                                ))}
                                <div className='form-group'>
                                    <label htmlFor="sizes">Sizes</label>
                                    {formdata.sizes.map((size, index) => (
                                        <div key={index}>
                                            <input
                                                type="text"
                                                name="SizeNumber"
                                                value={size.SizeNumber}
                                                placeholder="Size Number"
                                                onChange={(e) => handleSizeChange(index, e)}
                                            />
                                            <input
                                                type="text"
                                                name="StockNumber"
                                                value={size.StockNumber}
                                                placeholder="Stock Number"
                                                onChange={(e) => handleSizeChange(index, e)}
                                            />
                                        </div>
                                    ))}
                                    <button type="button" onClick={handleAddSize}>Add Size</button>
                                </div>
                                <div className='button-add'>
                                    <button className='button' type="submit">Add Product</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;

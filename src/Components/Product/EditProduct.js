import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import './edit.css'
const EditProduct = () => {
  const { id } = useParams();
  const [Product, setProduct] = useState([]);
  const [formdata, setFormdata] = useState({
    ProductName: "",
    ProductDescription: "",
    discoundPrice: "",
    prices: "",
    tag: "",
    sizes: "",
    color: "",
    image: "",
    inStock: "",
    category: "",
    keyword: "",
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const token = localStorage.getItem('Token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formdata)
    try {
      const response = await axios.patch(
        `https://eccomerce-av7e.onrender.com/api/v1//update-product/${id}`, formdata,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      console.log(response.data);
      toast.success('Product-update')
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleFetch = async () => {
    try {
      const response = await axios.post(
        `https://eccomerce-av7e.onrender.com/api/v1/single-product/${id}`
      );
      console.log(response.data.data);
      setProduct(response.data.data);
      const productData = response.data.data;
      setFormdata({
        ProductName: productData.ProductName || "",
        ProductDescription: productData.ProductDescription || "",
        discoundPrice: productData.discoundPrice || "",
        prices: productData.prices || "",
        tag: productData.tag || "",
        sizes: productData.sizes || "",
        color: productData.color || "",
        image: productData.image || "",
        inStock: productData.inStock || "",
        category: productData.category || "",
        keyword: productData.keyword || "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, [id]);

  return (
    <div className="edit-product">
      <div className="Old-Product">
        <div className="Product-Card">
          <div className="Productimg">
            <img src={Product.image || "No-image"} alt={Product.ProductName} />
          </div>
          <div className="Product-details">
            <p>
              <b>ProductName :</b> {Product.ProductName}
            </p>
            <p>
              <b>category: </b>
              {Product.category}
            </p>
            <p>
              <b>prices :</b> <del>{Product.prices}</del> {Product.discoundPrice}{" "}
            </p>
            <em>{Product.inStock ? "In Stock" : "Out of Stock"}</em>

            <p>
              color =
              {Product.color && Array.isArray(Product.color)
                ? Product.color.map((item) => <span key={item}>{item}</span>)
                : "No colors available"}
            </p>
            <p>
              keyword =
              {Product.keyword && Array.isArray(Product.keyword)
                ? Product.keyword.map((item) => <span key={item}>{item}, </span>)
                : "No keywords available"}
            </p>
            <p>
              Sizes =
              {Product.sizes && Array.isArray(Product.sizes)
                ? Product.sizes.map((item) => <span key={item}> {item}, </span>)
                : "No sizes available"}
            </p>
            <div className="product-tag">
              <span>{Product.tag}</span>
            </div>
          </div>

        </div>
      </div>

      <div className="Edit-Product">

        <div className='product-add-heading'>
          <h3>Edit-Products</h3>
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
              <div className='button-add'>
                <button className='button' type="submit">Add Product</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditProduct;

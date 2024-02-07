import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-hot-toast';
const Productcard = ({Product}) => {
    const token = localStorage.getItem('Token');

    const handleDelete = async (id) => {
console.log("first",id)
      try {
        const response = await axios.delete(
          `https://eccomerce-av7e.onrender.com/api/v1/delete-product/${id}`,
      
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
  
        console.log(response.data);
        toast.success('Product-Delete')
      } catch (error) {
        console.error('Error:', error);
      }
    };
  return (
    <div className='product-section-main'>
      <div className='product-container-box'>
      <div className='Product-conatiner'>
        {Product && Product.map((item,index)=>(
            <div key={index} className='Product-Card'>
                <div className='Productimg'>
                    <img src={item.image || 'No-image'} alt={item.ProductName} />
                </div>
                <div className='Product-details'>
                    <p>{item.ProductName}</p>
                    <p>{item.category}</p>
                    <p><del>{item.prices}</del> {item.discoundPrice} </p>
                    <em>{item.inStock ? 'In Stock' : 'Out of Stock'}</em>
                    <div className='product-tag'>
                        <span>{item.tag}</span>
                    </div>
                    <div className='prorud'>
                    <Link to={`/Edit-Product/${item._id}`}>Edit-Product</Link>
                    <button onClick={() => handleDelete(item._id)}>Delete-Product</button>
                    </div>
                </div>
            </div>
        ))}
    </div>
      </div>
    </div>
  )
}

export default Productcard
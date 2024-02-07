import React, { useState } from 'react'
import './register.css'
import axios from 'axios'
import toast from 'react-hot-toast'

const Register = () => {

    const [formData , setFormData] = useState({
        Name: '',
        Email:'',
        ContactNumber: '',
        Password : '',
        Role: ''
    })

    const onhandlechange = (e) =>{
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const onhandlesubmit = async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.post('https://eccomerce-av7e.onrender.com/api/v1/Register', formData);
            console.log(response)
            toast.success('Registered Successfully')
        } catch (error) {
            console.log(error)
            toast.error('Registration Failed!')
        }
    }

  return (
    <>
        <div className='registration-main-section'>
            <div className='registration-container-box'>
                <div className='registration-card'>
                    <div className='header'>
                        <span>Register</span>
                    </div>
                    <form onSubmit={onhandlesubmit} className='registration-detail'>
                        <input type='text' onChange={onhandlechange} name='Name' value={formData.Name} placeholder='Enter Your Name' required/>
                        <input type='email' onChange={onhandlechange} name='Email' value={formData.Email} placeholder='Enter Your Email' required/>
                        <input type='tel' onChange={onhandlechange} name='ContactNumber' value={formData.ContactNumber} placeholder='Enter Your Number' required />
                        <input type='password' onChange={onhandlechange} name='Password' value={formData.Password} placeholder='Enter Your Password' required/>
                        <input type='type' value="Admin" name='Role' readOnly/>
                        <button type="submit" className='submit-btn'>Sign Up</button>
                    </form>
                </div>
            </div>
        </div> 
    </>
  )
}

export default Register

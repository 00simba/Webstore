import React, { Component, useState } from 'react';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import {Link} from 'react-router-dom';
import Shipping from '../Components/Shipping.js'
import axios from 'axios';
import '../index.css'
import BackButton from '../Components/BackButton.js';

export default function Checkout(props){

  const [form, setForm] = useState({
    email: "",
    firstname: "",
    lastname: "",
    address: "",
    address_optional: "", 
    city: "",
    code: "",
  })

  const [location, setLocation] = React.useState([])

  async function sendCart(items){
    await axios.post("https://skylineculture-api.onrender.com/get-items", {items})

  }
  
  function selectCountry(val){
    setLocation({...location, country: val})
  }
  
  function selectRegion(val){
    setLocation({...location, region: val})
  }

  function handleChange(event){
      const newForm = {...form}
      newForm[event.target.id] = event.target.value
      setForm(newForm)
    }


  async function handleSubmit(event){
      event.preventDefault();
      await axios.post('https://skylineculture-api.onrender.com/collect', {form})
      setForm({
        email: "",
        firstname: "",
        lastname: "",
        address: "",
        address_optional: "", 
        city: "",
        code: "",
      })
  }
       
    return(
      <div className='checkoutContainer'>

          <div className='backContainer'><BackButton/></div>

          <h2 className='checkoutHeading'>Checkout</h2>

          <div className='formContainer'>

            <form className='checkoutForm' method='POST' action='/collect' submitForm={(event) => handleSubmit(event)}>
              

                <span className='contactInfoSpan'>Contact Information</span>

                <input onChange={(event) => handleChange(event)} placeholder="Email" id="email" name="customer_email"/>          
                <br/>

                <span  className='shippingInfoSpan'>Shipping Information</span>

                <input onChange={(event) => handleChange(event)} placeholder="First Name" id="firstname" name="first_name"/> 
                <br/>
                <input onChange={(event) => handleChange(event)} placeholder="Last Name" id="lastname" name="last_name"/>
                <br/>
                <input onChange={(event) => handleChange(event)} placeholder="Address" id="address" name="customer_address"/>
                <br/>
                <input onChange={(event) => handleChange(event)} placeholder="Apartment, Suite, etc (optional)" id="address_optional" name="customer_optional_address"/>
                <br/>
                <input onChange={(event) => handleChange(event)} placeholder="City" id="city" name="customer_city"/>
                <br/>
                <input onChange={(event) => handleChange(event)} placeholder="ZIP / Postal Code" id="code" name="code"/>
                <br/>
                <CountryDropdown className="countryDrop" value={location.country} onChange={(val) => selectCountry(val)} name="country"/>
                <br/>
                <RegionDropdown className="regionDrop" country={location.country} value={location.region} onChange={(val) => selectRegion(val)} name="region"/>

                <Shipping country={location.country}/>

                <div className='proceedDiv'>
                <button onClick={()=> sendCart(props.cartItems)} className="proceedPayment" type="submit">Proceed to Payment</button>
                </div>
            </form>

          </div>

        </div>
    )

}
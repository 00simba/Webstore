import React from 'react';
import './index.css';
import data from './Data/Data.js'
import Header from './Components/Header';
import Products from './Components/Product';
import ProductPage from './Components/ProductPage'
import { useLocation, BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import CartPage from './Components/CartPage'
import './index.css';
import Checkout from './Pages/Checkout'
import Payment from './Pages/Payment'
import Banner from './Components/Banner';

export default function Website(props){

    const products = data.map(item => {
        return(
            <Products 
                key={item.id}
                id={item.id}
                title={item.title}
                item={item}    
            />
        )
    })


    const [cartItems, setCartItems] = React.useState([]);
    const location = useLocation();   
    const [id, setId] = React.useState(null)

    React.useEffect(() => {
        const data = localStorage.getItem('cart')
        if(data){
            setCartItems(JSON.parse(data))
        }
        const uniqueID = localStorage.getItem('id')
        if(uniqueID){
            setId(uniqueID)
        }
    }, [])

    React.useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
        localStorage.setItem('id', id)
    })

    cartItems.slice(1);
    
    function addItemToCart(id, product, quantity, image, price){

        var found=0;

        cartItems.forEach((cartItem) => {
            var x = cartItem.productName; 
            var y = cartItem.productQuantity;  
            if(x == product){
                found=1;
                cartItem.productQuantity = `${quantity}`;
            }       
        })

        if(found==0){
            setCartItems([...cartItems, {productId: `${id}`, productName: `${product}`, productQuantity: `${quantity}`, productImage: `${image}`, productPrice: `${price}`}])
        }      
    }

    const [country, setCountry] = React.useState('')
    function changeCountry(country){
        setCountry(country)
    }

    return(
        <div>
            {![`/checkout/${id}`, `/collect-payment/${id}`].includes(location.pathname) && <Header/>} 
            <Routes>    
                <Route path='/' element={<div><div><Banner/></div><div className='parent'>{products}</div></div>}/>
                <Route path='product/:productUrl' element={<ProductPage addItemToCart = {addItemToCart} cart={cartItems} items={products}/>}/>
                <Route path='/cart' element={<CartPage changeId={id => setId(id)} setCartItems={setCartItems} cartItems={cartItems}/>}/>
                <Route path={`/checkout/${id}`} element={<Checkout changeCountry={changeCountry} changeId={id => setId(id)} cartItems={cartItems}/>}></Route>
                <Route path={`/collect-payment/${id}`} cartItems={cartItems} element={<Payment country={country} changeId={id => setId(id)} cartItems={cartItems}/>}></Route>
            </Routes>
        </div>
    )
}
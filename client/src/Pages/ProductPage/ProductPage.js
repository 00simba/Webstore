import React, { useEffect, useState} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Counter from '../../Components/Counter'
import AddToCart from '../../Components/AddToCart'
import '../../index.css'
import { ToastContainer } from 'react-toastify';
import { Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackButton from "../../Components/BackButton";
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css'
import ImageGallery from 'react-image-gallery';
import Dropdown from "../../Components/Dropdown/Dropdown";
import ReactStars from 'react-stars'
import './productpage.css'
import axios from "axios";
import ReactGA from 'react-ga'
import data from '../../Data/Data'
import { Ellipsis } from 'react-css-spinners'

export default function ProductPage(props){

    useEffect(() => {
        ReactGA.pageview(window.location.pathname)
    }, [])

    const params = useParams()
    const productUrl = params.productUrl
    
    if(!props.productUrl.includes(productUrl)){
        window.location.replace("/*");    
    }

    let index;

    for(const itemsIndex in props.items){
        if (props.items[itemsIndex].props.item.url === productUrl){
            index = itemsIndex
        }
    }

    const productObj = data[index]

    const [quantity, setQuantity] = React.useState(1)
    
    function add(){
        setQuantity(quantity+1)
    }

    function minus(){
        if(quantity === 1){
            return quantity
        }
        else{
            setQuantity(quantity-1)
        }
    }

    let images = []

    productObj.img.forEach((img, index) => {
        return images.push({ original: require(`../../Images/${productObj.img[index]}`) });
    })

    class MyGallery extends React.Component{
        render() {
          return <ImageGallery items={images} showFullscreenButton={true} showThumbnails={false} showPlayButton={false}/>;
        }
    }

    const [selected, setSelected] = React.useState(null);

    const [productStock, setStock] = React.useState(null);
    const [productReviews, setReviews] = React.useState(null);

    useEffect(() => {
        axios.post('https://skylineculture-api.onrender.com/get-stock', {productName: productObj.title}).then((res) => {setStock(res.data[0].stock); setReviews(res.data[0].reviews)}).catch((err) => console.error(err))
    }, [])

    let soldOut = false

    if(productStock){
        productStock.forEach((obj) => {
            for(const [key, value] of Object.entries(obj)){
                if((key === selected || key === "Default") && value == 0){
                    soldOut = true
                }
            }
        })
    }

    const firstExample = {
        size: 20,
        value: productObj.stars,
        edit: false,
        color2: "#FFB800"
    }    
    
    return(
        <div>
            <div className="backContainer">
                <BackButton/>
            </div>
            <div className="productContainer">
    
                <Link to='/cart'>
                    <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    transition={Slide}
                    />
                </Link> 
                
                    <div className="imageContainer">
                        <MyGallery/>
                    </div>
                    
                    <div className="productDesc">
                        <div className="descWrapper">
                        <div className="infoContainer">
                        <div className="productInfo">
                            <div className="infoPrice">
                                <h2 className="title">{productObj.title}</h2>
                                <ReactStars {...firstExample}/>
                                {soldOut ? <h2 className="price">SOLD OUT</h2> : <div className='productPagePrice'><h2 className="prices"><s>${productObj.price}</s></h2><h2 className="salePrice">${productObj.sale_price}</h2></div>}
                            </div>
                            <div className="addCounter">
                                <AddToCart disabled={soldOut} id={productObj.id} product={productObj.title} quantity={quantity} variant={selected} variants={productObj.variants} image={productObj.img} price={productObj.price} sale_price={productObj.sale_price} basePrice={productObj.basePrice} url={productObj.url} addItemToCart={props.addItemToCart}/>
                                <Counter quantity={quantity} add={add} minus={minus}/>
                            </div>
                        </div>
                        {productObj.hasOwnProperty('variants') && <div className="optionsContainer">
                            {(productObj.variants).map(variant => <Dropdown setSelected={setSelected} options={variant}/>)}
                        </div>}
                    </div>
                            <h3 className="descriptionHeader">Description</h3>
                            {(productObj.description).map((item) => <p>{item}<br/></p>)}
                            <h3 className="detailsHeader">Details</h3>
                            {productObj.specs}
                            <h3 className="shippingHeader">Shipping</h3>
                            {(productObj.shipping).map((item) => <p>{item}<br/></p>)}
                        </div>
                    </div>
            </div>
            <div className="reviewContainer">
                {!productReviews && 
                     <div className="reviewLoading"><Ellipsis color="#000000" size={60} thickness={3} /></div>
                    
                }
                {productReviews && <h2>Customer Reviews</h2>}
                {productReviews && 
                productReviews.map((review) => {
                    return(
                        <>               
                            <div className="reviewRow"> 
                                <div className="starDiv">
                                    <ReactStars size={20} edit={false} value={review.stars} color2={'#FFB800'}/>
                                    <span>{review.name}</span>
                                    <span>{review.date}</span>
                                </div>
                                <span>{review.desc}</span>
                               {review.images && <div className="reviewPics">{review.images.map((image) => {return(<img src={image}/>)})}</div>}
                            </div> 
                        </>
                    )})
                }
            </div>
        </div>       
    )
}

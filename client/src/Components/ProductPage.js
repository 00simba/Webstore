import React from "react";
import { useParams } from "react-router-dom";
import Counter from './Counter'
import AddToCart from './AddToCart'


export default function ProductPage(props){

    const params = useParams()
    const productUrl = params.productUrl

    let index;

    for(const items in props.items){
        if(props.items[items].props.item.url === productUrl){
            index = (props.items[items].props.item.id)-1
        }
    }

    const productObj = props.items[index].props.item;

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

    return(
        <div className="productContainer">
                <img className="productImg" src={require(`../Images/${productObj.img}`)}></img>  
                <div className="infoContainer">
                    <div className="infoPrice">
                        <h3 className="title">{productObj.title}</h3>
                        <h2 className="price">${productObj.price}</h2>
                    </div>
                    <div className="addCounter">
                        <AddToCart id={productObj.id} product={productObj.title} quantity={quantity} image={productObj.img} price={productObj.price} basePrice={productObj.basePrice} addItemToCart={props.addItemToCart}/>
                        <Counter quantity={quantity} add={add} minus={minus}/>
                    </div>
                </div>  
                <div className="productDesc">
                    <span>{productObj.description}</span>
                </div>
        </div>
        
    )
}


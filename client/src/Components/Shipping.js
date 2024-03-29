import React from "react";
import '../Pages/App.css'


function getTotal(cart){

    var total = 0.00
    
    cart.forEach((item) => {
        total += parseFloat(item.salePrice) * item.productQuantity
    })

    return total

}

export default function Shipping(props){

    var total = getTotal(props.cart)

    return(
        <div className="shippingDiv">
            {props.country === 'United States' && 
                <div className="usaDiv">
                    <span className="shippingSpan">Shipping Details</span>
                    <div className="shippingInfo">
                        <span>Method: USPS First Class Tracked </span>
                        <span>ETA: 3-6 business days</span>
                        {total < 35.00 ? <span>Flat Rate: $3.95</span> : <span>Shipping: FREE</span>}
                    </div>   
                </div>
            }
            {props.country === 'Canada' && 
                <div className="canadaDiv">
                    <span className="shippingSpan">Shipping Details</span>
                    <div className="shippingInfo">
                        <span>Method: Canada Post Tracked</span>
                        <span>ETA: 2-8 business days</span>
                        {total < 35.00 ? <span>Flat Rate: $7.95</span> : <span>Shipping: FREE</span>}
                    </div>
                </div>  
            }
            {(props.country != 'Canada' && props.country != 'United States' && props.country != '' && props.country != undefined)  && 
                <div className="internationalDiv">      
                    <span className="shippingSpan">Shipping Details</span>
                    <div className="shippingInfo">
                        <span>Method: APC or Asendia International Tracked </span>
                        <span>ETA: 6-21 business days</span>
                        {total < 35.00 ? <span>Flat Rate: $9.95</span> : <span>Shipping: FREE</span>}
                    </div>
                </div>  
            }
        </div>
    )
}
    

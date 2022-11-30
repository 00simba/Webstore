import React from "react";

export default function Summary(props){

    var shipping;
    var subTotal=0;

    function getTotal(cartItems){
        var total=0
        cartItems.forEach(item => {
            total += parseInt(item.productPrice) * parseInt(item.productQuantity)
            subTotal += parseInt(item.productPrice) * parseInt(item.productQuantity)
        })
        if(props.country === 'Canada'){
            shipping = 7.95
            total += 7.95
        }
        else if(props.country === "United States"){
            shipping = 3.95
            total += 3.95
        }
        else{
            shipping = 9.95
            total += 9.95
        }
        return total
    }

    var total = getTotal(props.cartItems)

    const items = props.cartItems.map(item => {
        return(
            <div>
                <div class="summaryItemsDiv">
                    <div class="summaryNames">
                        <span>{item.productName}</span>
                    </div>
                    <div class="summaryPriceQuantity">
                        <span>{item.productQuantity} x ${(item.productPrice)}</span> 
                    </div>
                </div>
            </div>
        )
    })


    return(
        <div className="summaryContainer">
            <h2 className="summaryHeading">Order Summary</h2>
                {items}
            <div className='breakDown'>
                <div>Subtotal: ${subTotal}</div>
                <div>Shipping: ${shipping}</div>
                <div className='totalCost'>Total: ${total}</div>
            </div>
         </div>
    )  
}

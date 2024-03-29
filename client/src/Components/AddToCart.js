import React from 'react'
import { toast } from 'react-toastify';

export default function AddToCart(props){

    const notify = () => toast.success(`Item Added! Click To View`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    async function handleSubmit(){
        if(props.variant == null || props.variant.includes('Select')){
            let dd = document.getElementById("dropdown");
            dd.style.border = `1px solid red`;
        }
    }

    return(
        <div className='addToCartBtn'>
            <button disabled={props.disabled} onClick={() => {
                if((props.variant !== null && !props.variant.includes('Select') && Object.keys(props.variants[0]).length !== 0) || (props.variant === null && Object.keys(props.variants[0]).length === 0)){
                    notify()
                    props.addItemToCart(props.id, props.product, props.quantity, props.variant, props.image, props.price, props.sale_price, props.url)
                }
                else{
                    handleSubmit()
                }}
            } className='addToCart' type="button">Add to Cart</button>
        </div>
    )
}
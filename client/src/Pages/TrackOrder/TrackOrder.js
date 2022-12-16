import axios from 'axios';
import React from 'react';
import './trackorder.css';

export default function TrackOrder(){

    const [orderID, setID] = React.useState('');

    const [shippingInfo, setInfo] = React.useState(null)

    function handleSubmit(e){
        e.preventDefault()
        axios.post("http://localhost:8080/get-tracking", {orderID : orderID}).then((res) => {setInfo(res.data.shipment)}).catch((err) => console.error(err))
    }

    return(
        <div className='trackingContainer'>
            <div className='trackingDiv'>
                <h2>Track Order</h2>
                <form className='orderForm'>
                    <input onChange={(e) => setID(e.target.value)} value={orderID} type='text' placeholder='Enter Shipment ID'></input>
                </form>
                <button onClick={(e) => handleSubmit(e)} className='trackButton'>Submit</button>
                <div className='trackingInfo'>
                    <div className='shipmentInfo'>
                        <div className='infoRow'><span className='infoLabel'>Carrier:&nbsp;</span> {shippingInfo && shippingInfo.carrier.toUpperCase()}</div>
                        <div className='infoRow'><span className='infoLabel'>Carrier Tracking Code:&nbsp;</span>{shippingInfo && shippingInfo.carrier_tracking_code}</div>
                        <div className='infoRow'><span className='infoLabel'>Postage:&nbsp;</span>{shippingInfo && shippingInfo.postage_description}</div>
                        <div className='infoRow'><span className='infoLabel'>Type:&nbsp;</span>{shippingInfo && shippingInfo.package_description}</div>
                        <div className='infoRow'><span className='infoLabel'>Weight:&nbsp;</span>{shippingInfo && shippingInfo.weight_description}</div>
                        <div className='infoRow'><span className='infoLabel'>Dimensions:&nbsp;</span>{shippingInfo && shippingInfo.size_description}</div>                    
                        <div className='infoRow'><span className='infoLabel'>Tracking URL:&nbsp;</span><a href={shippingInfo && shippingInfo.tracking_url}>{shippingInfo && shippingInfo.tracking_url}</a></div>                    
                    </div>
                    <span className='infoLabel'>Latest Updates:</span>
                    <div className='trackingHistory'>
                            {shippingInfo && shippingInfo.tracking_events.map((object) => {
                            var date = new Date( Date.parse(object.created_at)).toDateString().substring(4)
                        if(date[4] === '0'){
                            date = date.replace(date[4], '')
                        }
                            const time = new Date( Date.parse(object.created_at)).toLocaleTimeString().slice(0, -6) + ' ' + new Date( Date.parse(object.created_at)).toLocaleTimeString().slice(-2) 
                            return <div>{date} {time} - {object.title} - {object.location_description}</div>
                        })}
                    </div>
                </div>
            </div>
            <div className='shippingFAQ'>
                <h2>Shipment Information</h2>
                <p>All orders ship from Canada. Please allow 1-2 business days for fulfillment.</p>
            </div>
        </div>
    )
}
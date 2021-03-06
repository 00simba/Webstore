require('dotenv').config()
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/products')
const bodyParser = require('body-parser')
const { execPath } = require('process')
const { rmSync } = require('fs')
const app = express()
app.use(express.json())
app.use(express.static('../client/build'))
app.use(bodyParser.urlencoded({extended: false}))
const cors = require("cors")
app.use(cors())

const dbURI = process.env.DATABASE_URI;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true}).then((result) => console.log('Connected to DB')).catch((err) => console.log(err))

const storeItems = new Map()
Product.find().then((result) => result.map((item) => {
    storeItems.set(item.id, {name: item.name, price: item.price})
}))

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

let cart=[];
let customer={
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    optional_address: "",
    country: "",
    region: "",
};
let total=0;

app.get('*', (req,res) =>{
    res.sendFile(path.resolve(__dirname,'..', 'client', 'build', 'index.html'));
});

app.post("/get-items", (req,res) => {
    total = 0
    cart = req.body
})

app.post("/collect", (req, res) =>{
    customer.email = req.body.customer_email,
    customer.first_name = req.body.first_name,
    customer.last_name = req.body.last_name,
    customer.address = req.body.customer_address,
    customer.optional_address =  req.body.customer_optional_address,
    customer.country = req.body.country,
    customer.region = req.body.region,
    calculateTotal()
    res.redirect("/collect-payment")
}
)

function calculateTotal(){
    var cartArray = cart.items
    cartArray.forEach((itemObject) => {
        var price = ((storeItems.get(parseInt(itemObject.productId))).price)*(parseInt(itemObject.productQuantity))
        total += price 
    })
    if(customer.country === 'Canada'){
        total += 795
    }
    else if(customer.country === "United States"){
        total += 395
    }
    else{
        total += 995
    }
}


app.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount: total,
			currency: "USD",
			description: "Skyline Company",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
    
})

app.listen(3001, () => {
    console.log("Server is running on port 3001")
})
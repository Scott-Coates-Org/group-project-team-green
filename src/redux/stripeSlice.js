import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { useState } from "react";
import firebaseClient from "firebase/client"
const stripeAPIKey= process.env.REACT_APP_STRIPE_API_SECRET_KEY;
const stripe = require('stripe')(stripeAPIKey);

//functions
//addItemToCart
//sub: getName, getPrice, getQuantity, setTime, setDate,
//goToCheckout
//createPaymentIntent
//createOrShowInvoice
//sub: createLineItem
//createCustomerInStripe
//sub: setFirstName, setLastName, setEmail,
//showCheckoutForm
//sendReceipt
//sub: getEmail, getReceiptURL, getTime, getDate

const [itemName, setItemName]= useState('');
const [itemPrice, setItemPrice]= useState(0);
const [itemQty, setItemQty]= useState(1);
const [resTime, setResTime]= useState(1000)
const [resDate, setResDate]=useState(10.10)
const onCheckoutClicked=async ()=>{
    //collect user information,
    //create userObject,
    //pass name and email to CreateCheckoutSession
    
    
}




    //initiate checkout session, 
    //pass checkout object to stripe with cart and user information
    //receive checkout session, 
    //show invoice

    
const onCheckoutCompleted= async()=>{ 
    //receive checkoutComplete object,
    //send receipt email
}

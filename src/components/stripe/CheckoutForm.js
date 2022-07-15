import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import React from 'react'
import { firebase } from 'firebase/client';
require('firebase/functions');


const CheckoutForm = () => {

   

    const stripe= useStripe();
    const elements=useElements();
    const handleSubmit= async(event)=>{
        event.preventDefault();

        if(!stripe || ! elements){
            return;
        }

        const result = await stripe.confirmPayment({
            elements,
            confirmParams:{
                return_url:'https://localhost:3000/success',
            }
        })
        if (result.error){
            console.log(result.error.message);
        } else{

        }
    }
  return (
    <form>
        <PaymentElement/>
        <button disabled={!stripe}>Submit</button>
    </form>
  )
}

export default CheckoutForm
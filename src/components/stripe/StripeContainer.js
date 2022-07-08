import React from 'react'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'
import PaymentForm from './PaymentForm';



const PUBLIC_KEY="pk_test_51JJJ08Pe3Sdo1GEVsgqXuzcLVtOo91Y9TslQEBHS3hhbjqWbzITxyGSi5nHQUgaDA28mTvHrxwY5N25ztWlRFUuk00WGuEufHF",

stripeTestPromise= loadStripe(PUBLIC_KEY)

const StripeContainer = () => {
  return (
   <Elements stripe={stripeTestPromise}>
    <PaymentForm />
   </Elements>
  )
}

export default StripeContainer
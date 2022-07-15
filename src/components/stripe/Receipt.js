
import React, {useEffect, useState} from 'react'
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY)


const Email = () => {
const eventData={
  "object": {
    "charges": {
      "data": [
        {
          "receipt_email": "emily.s.marin@icloud.com",
          "receipt_number": null,
          "receipt_url": "https://pay.stripe.com/receipts/acct_1JJJ08Pe3Sdo1GEV/ch_3LK4AtPe3Sdo1GEV02WzXGvV/rcpt_M28T1PXWoNzD5PBghhCWWvwGjwfqdbX",
          }
      ]
    },
    },
  }
  const [customerEmail, setCustomerEmail]= useState('')
  const [receiptURL, setReceiptURL]= useState('')
  const [customerName, setCustomerName]= useState('Emily Marin')
  
  
  useEffect(()=>{setReceiptURL(eventData.object.charges.data[0].receipt_url);
    setCustomerEmail(eventData.object.charges.data[0].receipt_email)

  })
  

const handleEventData= async ()=>{
  
console.log('Thanks for your payment! You can view your reciept here:', receiptURL)}
  
  



  const msg = {
  to: customerEmail, // Change to your recipient
  from: 'emily.s.marin@icloud.com', // Change to your verified sender
  subject: `${customerName}'s Jump receipt`,
  text: `We are jumping for joy over your purchase! Please view your receipt at: ${receiptURL}`,
  
}


  const handleSendEmail= () => { sgMail
  .send(msg)
  .then((response) => {
    console.log(response[0].statusCode)
    console.log(response[0].headers)
  })
  .catch((error) => {
    console.error(error)
  })
};
  return (
    <div>Receipt
      <p>Email: {customerEmail}</p>
      <p> URL: {receiptURL}</p>
        <button onClick={handleSendEmail}>Send an Email</button>
        <button onClick={handleEventData}>Get data</button>
       
    </div>
  )
  }

export default Email


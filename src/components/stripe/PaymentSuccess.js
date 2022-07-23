import React from 'react'

const PaymentSuccess = (props) => {const url='https://dummyURL.com'
  return (
    <div>

<h1>Your payment was successful!</h1>
<h3>Thank you for your order. A receipt was sent to your email. You can view and print your reciept here: {url}</h3>

    </div>
  )
}

export default PaymentSuccess
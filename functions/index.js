// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');
const { object } = require('firebase-functions/v1/storage');
const stripe = require("stripe")('sk_test_51JJJ08Pe3Sdo1GEVWaMFL9Kv9phjBr9LDQ86kyRPrcXBNX2f5gdCKYLl5bNm3j2f901CurjCxHYtxhAW8KcISC6d004C7IMudP')
sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY);
const DOMAIN = `http://${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`




 const cartItems=[
  {
PassName: 'Jumper 7 or Older',
Price: 21,
qty: 2,
time: '11:30 am'
},
{
  Name: 'cheeseburger',
  Photo: 'photoURL',
  Price: 12,
  key: 'cheeseburger',
  qty: 1
}
]

let preparedLineItems= cartItems.map(item => convertData(item));

function convertData(original){
let obj = {
    quantity: original.qty, 
    price_data:{
      currency:'usd',
      unit_amount: original.Price * 100,
      product_data:{
        name: original.Name || original.PassName
      }
    }
  }
 return obj
}
 
 
  exports.createCheckoutSession = functions.https.onRequest(async (request, response) => {
const session = await stripe.checkout.sessions.create({
       line_items: preparedLineItems,
       mode: 'payment',
       success_url:`${DOMAIN}/success`,
       cancel_url: `${DOMAIN}/canceled`
   })
   
   response.redirect(303, session.url);
   
});
 
function setEmailParams(request){
  const emailParams= {
    customerEmail: request.data.object.charges.data[0].receipt_email,
    receiptURL: request.data.object.charges.data[0].receipt_url,
    customerName: request.data.object.charges.data[0].billing_details.name,
  }
  return emailParams;
}
exports.sendReceiptEmail= functions.https.onRequest(async(request, response)=>{


})
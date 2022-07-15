// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');
const admin = require('firebase-admin')
const sgMail = require('@sendgrid/mail')
const axios = require('axios');
const { DataSnapshot } = require('firebase-functions/v1/database');
const stripe = require("stripe")('sk_test_51JJJ08Pe3Sdo1GEVWaMFL9Kv9phjBr9LDQ86kyRPrcXBNX2f5gdCKYLl5bNm3j2f901CurjCxHYtxhAW8KcISC6d004C7IMudP')
sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY);
admin.initializeApp();

exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin.firestore().collection('messages').add({original: original});
  // Send back a message that we've successfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
    .onCreate((snap, context) => {
      // Grab the current value of what was written to Firestore.
      const original = snap.data().original;

      // Access the parameter `{documentId}` with `context.params`
      functions.logger.log('Uppercasing', context.params.documentId, original);
      
      const uppercase = original.toUpperCase();
      
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to Firestore.
      // Setting an 'uppercase' field in Firestore document returns a Promise.
      return snap.ref.set({uppercase}, {merge: true});
    });

   exports.logFunc= functions.firestore.document('/products/{documentId}').onWrite((snap, context)=>{
   var docRef= JSON.stringify(snap.after._fieldsProto)
    console.log(docRef);
return snap;
   })
   

exports.events= functions.https.onRequest((request, response)=>{
  const result = JSON.stringify(request.body)
  console.log(result);
  response.send(result)
})

 
 
  const DOMAIN= 'http://localhost:5001/team-green-6d418/us-central1'
 
  exports.createCheckoutSession = functions.https.onRequest(async (request, response) => {
const session = await stripe.checkout.sessions.create({
       line_items:[
           {
       // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
       price: 'price_1LKSC3Pe3Sdo1GEV8xfUw111',
       quantity: 1,
     },
           {price: 'price_1LIkRZPe3Sdo1GEVwR48UWAa',
       quantity: 1,}
       ],
       mode: 'payment',
       success_url:`${DOMAIN}/success`,
       cancel_url: `${DOMAIN}/canceled`
   })
   
   response.redirect(303, session.url);
   
});
 

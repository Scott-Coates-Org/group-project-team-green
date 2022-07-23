// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require("firebase-functions")
const sgMail = require("@sendgrid/mail")
//define the stripeKey variable from the secrets file
const stripeKey = process.env.REACT_APP_STRIPE_API_SECRET_KEY

//require stripe, which is installed already
const Stripe = require("stripe")
//pass the stripeKey to stripe
const stripe = new Stripe(stripeKey)
sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY)
const DOMAIN = `http://team-green-6d418.web.app`

exports.createCheckoutSession = functions.https.onRequest(
  async (request, response) => {
    // response.status(200).send("ok1213123").end()

    const preparedLineItems = await JSON.parse(request.query.data)
    // return response
    //   .status(200)
    //   .send("here is the key:" + stripeKey)
    //   .end()

    const session = await stripe.checkout.sessions.create({
      line_items: preparedLineItems,
      mode: "payment",
      success_url:
        "https://us-central1-team-green-6d418.cloudfunctions.net/createSuccessPage?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: `${DOMAIN}/canceled`,
    })

    response.redirect(303, session.url)
  }
)

exports.createSuccessPage = functions.https.onRequest(async (request, response) => {
  const session = await stripe.checkout.sessions.retrieve(request.query.session_id)
  const customer = await stripe.customers.retrieve(session.customer)
  const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent)
  function sendEmailReceipt() {
    const msg = {
      to: customer.email,
      from: "emily.s.marin@icloud.com",
      subject: `${customer.name}'s Jump Receipt`,
      text: `We are jumping for joy over your purchase! Please view your receipt at: ${paymentIntent.charges.data[0].receipt_url}`,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log("email sent")
      })
      .catch((error) => {
        console.error(error)
      })
  }
  sendEmailReceipt()
  response.send(
    `<html><body><h1>Thanks for your order, ${customer.name}!</h1>
    <p>We sent a receipt to your email: ${customer.email}. </p>
    <p>You can view your receipt at <a href=${paymentIntent.charges.data[0].receipt_url}>${paymentIntent.charges.data[0].receipt_url}</a></p></body></html>`
  )
})

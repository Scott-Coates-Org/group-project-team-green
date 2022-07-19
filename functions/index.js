// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require("firebase-functions")
const sgMail = require("@sendgrid/mail")
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_API_SECRET_KEY)
sgMail.setApiKey(REACT_APP_SENDGRID_API_KEY)
const DOMAIN = `http://${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`

exports.createCheckoutSession = functions.https.onRequest(
  async (request, response) => {
    const preparedLineItems = await JSON.parse(request.query.data)

    const session = await stripe.checkout.sessions.create({
      line_items: preparedLineItems,
      mode: "payment",
      success_url:
        "team-green-6d418.web.app/createSuccessPage?session_id={CHECKOUT_SESSION_ID}",
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

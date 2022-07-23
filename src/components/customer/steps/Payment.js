import React from "react"
import { useWizard } from "react-use-wizard"
import { Button } from "reactstrap"
import WizardStyle from "../wizard/wizard-container.module.css"
import { Link } from "react-router-dom"
// import { firebase } from "firebase/client"
// require("firebase/functions")

const Payment = ({ cartItems, getDateFromSelection }) => {
  const { previousStep, nextStep } = useWizard()
  // const callFirebaseFunction = (event) => {
  //   const createCheckoutSession = firebase.functions().httpsCallable(cartItems)
  //   createCheckoutSession()
  //     .then((result) => {
  //       console.log(result.data.output)
  //     })
  //     .catch((error) => {
  //       console.log(error.stack)
  //     })
  // }
  return (
    <div>
      <p>Placeholder for stripe integration</p>

      <hr></hr>
      <Button color="secondary" size="lg" onClick={() => previousStep()}>
        {" "}
        Previous
      </Button>
      <Link
        to={{
          pathname: "/customer/confirmation",
        }}
      >
        <Button className={WizardStyle.next_btn} color="success" size="lg">
          {" "}
          Submit{" "}
        </Button>
      </Link>
    </div>
  )
}

export default Payment

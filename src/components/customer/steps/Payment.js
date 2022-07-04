import React from "react"
import { useWizard } from "react-use-wizard"
import { Button } from "reactstrap"
import WizardStyle from "../wizard/wizard-container.module.css"

const Payment = () => {
  const { previousStep } = useWizard()
  return (
    <div>
      <p>Placeholder for stripe integration</p>
      <Button color="primary" size="lg" onClick={() => previousStep()}>
        {" "}
        Previous
      </Button>

      <Button
        className={WizardStyle.next_btn}
        color="primary"
        size="lg"
        onClick={() => alert("pressed submit!")}
      >
        {" "}
        Submit{" "}
      </Button>
    </div>
  )
}

export default Payment

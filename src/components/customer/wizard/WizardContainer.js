import React from "react"
import { Wizard } from "react-use-wizard"
import WizardHeader from "./WizardHeader"
import PassSelection from "../steps/PassSelection"
import AddOns from "../steps/AddOns"
import ContactInfo from "../steps/ContactInfo"
import Payment from "../steps/Payment"
import WizardStyle from "./wizard-container.module.css"

const WizardContainer = () => {
  return (
    <div className={WizardStyle.container}>
      <Wizard header={<WizardHeader />}>
        <PassSelection />
        <AddOns />
        <ContactInfo />
        <Payment />
      </Wizard>
    </div>
  )
}

export default WizardContainer

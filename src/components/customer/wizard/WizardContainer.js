import React from "react"
import { Wizard } from "react-use-wizard"
import WizardHeader from "./WizardHeader"
import PassSelection from "../steps/PassSelection"
import AddOns from "../steps/AddOns"
import ContactInfo from "../steps/ContactInfo"
import Payment from "../steps/Payment"
import ThankYouConfirmation from "../steps/ThankYouConfirmation"
import WizardStyle from "./wizard-container.module.css"
import { Link } from "react-router-dom"
import Waiver from "../steps/Waiver"

const WizardContainer = ({ onAdd, onRemove, hasItems, getDateFromSelection }) => {
  return (
    <div className={WizardStyle.container}>
      <Wizard header={<WizardHeader />}>
        <PassSelection
          onAdd={onAdd}
          onRemove={onRemove}
          hasItems={hasItems}
          getDateFromSelection={getDateFromSelection}
        />
        <AddOns onAdd={onAdd} onRemove={onRemove} />
        <ContactInfo />
        <Waiver />
        <Payment />
      </Wizard>
    </div>
  )
}

export default WizardContainer

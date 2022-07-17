import React from 'react';
import { useWizard } from 'react-use-wizard';
import { Button } from 'reactstrap';
import WizardStyle from '../wizard/wizard-container.module.css';

const ContactInfo = () => {
  const { nextStep, previousStep } = useWizard();

  return (
    <div>
      <p>Customer info for passes and email confirmation</p>
      <hr></hr>
      <Button color="secondary" size="lg" onClick={() => previousStep()}> Previous</Button>
      <Button className={WizardStyle.next_btn} color="success" size="lg" onClick={() => nextStep()}> Next </Button>

    </div>
  )
}

export default ContactInfo
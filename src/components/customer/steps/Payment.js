import React from 'react';
import { useWizard } from 'react-use-wizard';
import { Button } from 'reactstrap';
import WizardStyle from '../wizard/wizard-container.module.css';
import { Link } from 'react-router-dom';


const Payment = ({ cartItems, getDateFromSelection }) => {
  const { previousStep, nextStep } = useWizard();

  return (
    <div>
      <p>Placeholder for stripe integration</p>
      <hr></hr>
      <Button color="secondary" size="lg" onClick={() => previousStep()}> Previous</Button>
      <Link to={{
        pathname: '/customer/confirmation'
      }}>
        <Button className={WizardStyle.next_btn} color="success" size="lg"
        > Submit </Button>
      </Link>

    </div>
  )
}

export default Payment
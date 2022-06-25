import React from 'react'
import { useWizard } from 'react-use-wizard';
import { Button } from 'reactstrap';
import WizardStyle from '../../../css/wizard-container.module.css'


const PassSelection = () => {
  const { nextStep } = useWizard();

    return (
      <div>
        <p>This will have the date picker and the pass selection.</p>
        <Button className={WizardStyle.next_btn} color="primary" size="lg" onClick={() => nextStep()}> Next </Button>
      </div>
    )
}

export default PassSelection
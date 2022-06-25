import React from 'react'
import { useWizard } from 'react-use-wizard';
import { Button } from 'reactstrap';
import WizardStyle from '../../../css/wizard-container.module.css'


const AddOns = () => {
    const { nextStep, previousStep } = useWizard();
    return (
        <div>
            <p>This will have the add on products before checking out</p>
            <Button color="primary" size="lg" onClick={() => previousStep()}> Previous</Button>
            <Button className={WizardStyle.next_btn} color="primary" size="lg" onClick={() => nextStep()}> Next </Button>
        </div>

    )
}

export default AddOns
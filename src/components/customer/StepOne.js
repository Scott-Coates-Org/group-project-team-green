import React from 'react'
import { useWizard } from 'react-use-wizard';

const StepOne = () => {
    const { handleStep, previousStep, nextStep } = useWizard();
  

  
    return (
      <>
        <h1>Step One</h1>

        <button onClick={() => nextStep()}>Next ⏭</button>
      </>
    )
}

export default StepOne
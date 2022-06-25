import React from 'react'
import { useWizard } from 'react-use-wizard';

const StepThree = () => {
    const { handleStep, previousStep, nextStep } = useWizard();

  
    return (
      <>
        <h1>Step Three</h1>
        <button onClick={() => previousStep()}>Previous ⏮️</button>
      </>
    );
}

export default StepThree
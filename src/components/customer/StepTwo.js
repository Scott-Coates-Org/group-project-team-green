import React from 'react'
import { useWizard } from 'react-use-wizard';

const StepTwo = () => {
    const { handleStep, previousStep, nextStep } = useWizard();


    return (
        <>
        <h1>Step Two</h1>
        <button onClick={() => previousStep()}>Previous ⏮️</button>
        <button onClick={() => nextStep()}>Next ⏭</button>
        </>
    )
}

export default StepTwo
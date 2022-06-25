import React from 'react'
import { Wizard } from 'react-use-wizard';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';



const Checkout = () => {
  return (
    <Wizard >
      <StepOne />
      <StepTwo />
      <StepThree />
    </Wizard>
  )
}

export default Checkout
import React, { useState } from 'react'
import { useWizard } from 'react-use-wizard';
import { Button } from 'reactstrap';
import WizardStyle from '../wizard/wizard-container.module.css';
import DatePicker from './DatePicker';
import PassPicker from './PassPicker';


const PassSelection = () => {
  const { nextStep } = useWizard();
  const [date, setDate] = useState('');

  const getDate = (pickedDate) => {
    setDate(pickedDate);
  }

  return (
    <div>
      {date === '' ? <DatePicker getDate={getDate} /> : null}
      {date !== '' ?
        (<div>
          <PassPicker pickedDate={date} />
          <Button className={WizardStyle.next_btn} color="primary" size="lg" onClick={() => nextStep()}> Next </Button>
        </div>)
        : null}
    </div>
  )
}

export default PassSelection
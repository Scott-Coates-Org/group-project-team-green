import React, { useState } from 'react'
import { useWizard } from 'react-use-wizard';
import { Button } from 'reactstrap';
import WizardStyle from '../wizard/wizard-container.module.css';
import DatePicker from './DatePicker';
import PassPicker from './PassPicker';


const PassSelection = ({ onAdd, onRemove, hasItems }) => {
  const { nextStep } = useWizard();
  const [date, setDate] = useState('');

  const getDate = (pickedDate) => {
    setDate(pickedDate);
  }

  console.log('hasItems: ', hasItems);
  return (
    <div>
      {date === '' ? <DatePicker getDate={getDate} /> : null}
      {date !== '' ?
        (<div>
          <PassPicker pickedDate={date} onAdd={onAdd} onRemove={onRemove} />
          <Button disabled={!hasItems} className={WizardStyle.next_btn} color="primary" size="lg" onClick={() => nextStep()}> Continue </Button>
        </div>)
        : null}
    </div>
  )
}

export default PassSelection
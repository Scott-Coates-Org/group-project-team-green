import React from 'react'
import Select from 'react-select'

const options = [
  { value: '10:00 am', label: '10:00 am' },
  { value: '10:30 am', label: '10:30 am' },
  { value: '11:00 am', label: '11:00 am' },
  { value: '11:30 am', label: '11:30 am' },
  { value: '12:00 pm', label: '12:00 pm' },
  { value: '12:30 pm', label: '12:30 pm' },
  { value: '1:00 pm', label: '1:00 pm' },
  { value: '1:30 pm', label: '1:30 pm' },
  { value: '2:00 pm', label: '2:00 pm' },
  { value: '2:30 pm', label: '2:30 pm' },
  { value: '3:00 pm', label: '3:00 pm' },
  { value: '3:30 pm', label: '3:30 pm' },
  { value: '4:00 pm', label: '4:00 pm' },
  { value: '4:30 pm', label: '4:30 pm' },
  { value: '5:00 pm', label: '5:00 pm' },
  { value: '5:30 pm', label: '5:30 pm' },
  { value: '6:00 pm', label: '6:00 pm' },
  { value: '6:30 pm', label: '6:30 pm' },
  { value: '7:00 pm', label: '7:00 pm' },
]

const SelectTime = ({ sliceNumber }) => {
  return (
    <Select
      options={sliceNumber ? options.slice(0, sliceNumber) : options}
      onChange={(value) => console.log(value.value)}
    />
  )
}

export default SelectTime
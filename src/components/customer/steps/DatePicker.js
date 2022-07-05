import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DatePicker = ({ getDate }) => {
    const [value, onChange] = useState(new Date());

    return (
        <div>
            <header>
                <h1>Select your date</h1>
            </header>
            <div>
                <main>
                    <Calendar
                        onChange={onChange}
                        onClickDay={(value, error) => getDate(value.toLocaleDateString())}
                        value={value}
                        calendarType='US'
                        minDate={new Date()}
                        maxDate={new Date('December 31, 2022')}
                    />
                </main>
            </div>
        </div>
    )
}

export default DatePicker
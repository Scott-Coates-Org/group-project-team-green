import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DatePicker = () => {
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
                        value={value}
                        calendarType='US'
                        maxDetail='month'
                        minDate={new Date()}
                    />
                </main>
            </div>
        </div>
    )
}

export default DatePicker
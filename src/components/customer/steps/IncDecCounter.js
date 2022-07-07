import { useState } from "react";
import './incdeccounter.css';


function IncDecCounter({ max }) {
    const [counter, setCounter] = useState(0);
    const handleDecrement = () => {
        let value = validateValue(counter - 1);
        setCounter(value);
    }
    const handleIncrement = () => {
        let value = validateValue(counter + 1);
        setCounter(value);
    }

    const validateValue = (value) => {
        if (value < 0) {
            value = 0;
        }
        if (value > max) {
            value = max;
        }
        return value;
    }

    return (
        <div className="wrapper">
            <button className="count-btn count-down" type="button" onClick={handleDecrement}>-</button>
            <div className="counter">{counter}</div>
            <button className="count-btn count-up" type="button" onClick={handleIncrement}>+</button>
        </div>
    );

};
export default IncDecCounter;
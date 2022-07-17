import React, { useState } from 'react'
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import SelectTime from './SelectTime';
import { Button } from 'reactstrap';
import './passpicker.css'

const PassItem = ({ product, onAdd, onRemove }) => {
    const [timeVal, setTimeVal] = useState(false);

    const getTimeVal = (value) => {
        setTimeVal(value);
    }

    const createPassSelectionForm = (product, duration, numSessions, timeVal) => {
        let passForm = [];
        for (let key in product) {
            passForm.push(<div key={`${product[key].PassName}-form-${key}`} className='pass-quantity-selection'>
                <p className='pass-name'>{product[key].PassName}</p>
                {duration !== "All day" ?
                    <p>2 hours</p>
                    : <p></p>}
                <p className='price'>{`$${product[key].Price}.00`}</p>
                {numSessions ?
                    <div className='d-flex qty-btn-wrapper'>
                        <Button disabled={!timeVal} onClick={() => onRemove(product[key], timeVal)}>-</Button>
                        <Button disabled={!timeVal} onClick={() => onAdd(product[key], timeVal)}>+</Button>
                    </div>
                    :
                    <div className='d-flex qty-btn-wrapper'>
                        <Button onClick={() => onRemove(product[key], null)}>-</Button>
                        <Button onClick={() => onAdd(product[key], null)}>+</Button>
                    </div>
                }
            </div>)
        }

        return (<div className='pass-quantity-selection-wrapper'>{passForm}</div>)
    }

    return (
        <div>
            <AccordionItem className='accordion__item'>
                <AccordionItemHeading >
                    <AccordionItemButton>
                        <div className='accordion__heading'>
                            <img src={product.Photo} className='img' alt={product.Name} />
                            <div>
                                <h3>{product.Name}</h3>
                                <p>{product.Description}</p>
                            </div>
                        </div>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className='accordion__panel'>
                    {product.NumberOfSessionTimes !== 0 ? (
                        <div>
                            <p>Please select a session time</p>
                            <SelectTime sliceNumber={product.NumberOfSessionTimes} getTimeVal={getTimeVal}></SelectTime>
                        </div>
                    )
                        : null}
                    {createPassSelectionForm(product.PassType, product.Duration, product.NumberOfSessionTimes, timeVal)}
                </AccordionItemPanel>
            </AccordionItem>
        </div>
    )
}

export default PassItem
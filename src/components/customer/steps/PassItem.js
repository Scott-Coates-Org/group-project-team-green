import React, { useState } from 'react'
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import SelectTime from './SelectTime';
import { Button } from 'reactstrap';
import IncDecCounter from './IncDecCounter';

const PassItem = ({ product, onAdd, onRemove }) => {
    const [timeVal, setTimeVal] = useState(false);

    const getTimeVal = (value) => {
        setTimeVal(value);
    }

    const createPassSelectionForm = (product, duration, timeVal) => {
        let passForm = [];
        for (let key in product) {
            passForm.push(<div key={`${product[key].PassName}-form-${key}`} className='pass-quantity-selection'>
                <p className='pass-name'>{product[key].PassName}</p>
                {duration !== "All day" ?
                    <p>2 hours</p>
                    : <p></p>}
                <p className='price'>{`$${product[key].Price}.00`}</p>
                {product[key].PassName === 'Unlimited Pass 7 or Older' ?
                    <Button
                        onClick={() => { onAdd(product[key]) }
                        }>Add to Cart</Button>
                    : <Button
                        disabled={!timeVal}
                        onClick={() => { onAdd(product[key], timeVal) }
                        }>Add to Cart</Button>}
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
                            <p>Session Time</p>
                            <SelectTime sliceNumber={product.NumberOfSessionTimes} getTimeVal={getTimeVal}></SelectTime>
                        </div>
                    )
                        : null}
                    {createPassSelectionForm(product.PassType, product.Duration, timeVal)}
                </AccordionItemPanel>
            </AccordionItem>
        </div>
    )
}

export default PassItem
import React, { useState } from 'react'
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import SelectTime from './SelectTime';
import IncDecCounter from './IncDecCounter';
import { Button } from 'reactstrap';

const PassItem = ({ product, onAdd }) => {
    const [timeVal, setTimeVal] = useState(false);

    const getTimeVal = (value) => {
        console.log(value);
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
                <Button disabled={!timeVal} onClick={() => {
                    onAdd(product[key], timeVal)
                }

                }>Add to Cart</Button>
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
                            <img src={product.Photo} className='img' />
                            <div>
                                <h3>{product.Name}</h3>
                                {/* {setQuantity(product.Name, 0)} */}
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
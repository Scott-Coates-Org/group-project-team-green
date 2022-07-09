import React, { useState, useEffect } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { Button, ButtonGroup, ButtonToolbar } from 'reactstrap';

// Demo styles, see 'Styles' section below for some notes on use.
// import 'react-accessible-accordion/dist/fancy-example.css';
import './passpicker.css';
import myImage from '../../../assets/images/homepage-background.png';
import firebaseClient from '../../../firebase/client'
import IncDecCounter from './IncDecCounter';

const timeslots = [
    "10:00 am", "10:30 am", "11:00 am", "11:30 am", "12:00 pm",
    "12:30 pm", "1:00 pm", "1:30 pm", "2:00 pm", "2:30 pm",
    "3:00 pm", "3:30 pm", "4:00 pm", "4:30 pm", "5:00 pm",
    "5:30 pm", "6:00 pm", "6:30 pm", "7:00 pm"
]

const PassPicker = ({ pickedDate }) => {
    const [products, setProducts] = useState([]);
    let productsQuantity = [];

    useEffect(() => {
        const getProductsFromFirebase = [];
        const productsRef = firebaseClient
            .firestore()
            .collection("products")
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    getProductsFromFirebase.push({
                        ...doc.data(),
                        key: doc.id,
                    });

                });

                setProducts(getProductsFromFirebase);
            });

        return () => productsRef();
    }, []);

    const createSessionTimes = (name, number) => {
        let sessionTimes = [];
        for (let i = 0; i < number; i++) {
            sessionTimes.push(<Button className="session-time-btns" key={`${name}-btn-${i}`}>{timeslots[i]}</Button>)
        }
        return sessionTimes;
    }

    const setQuantity = (name, qty) => {
        let prod = productsQuantity.find(prod => prod.name === name);

        if (!prod) {
            productsQuantity.push({ name, qty });
        } else {
            prod.qty += qty;
        }
    }

    const createPassSelectionForm = (product, duration) => {
        let passForm = [];
        for (let key in product) {
            console.log(product[key].PassName, product[key].Price)
            passForm.push(<div key={`${product[key].PassName}-form-${key}`} className='pass-quantity-selection'>
                <p className='pass-name'>{product[key].PassName}</p>
                {duration !== "All day" ?
                    <p>2 hours</p>
                    : <p></p>}
                <p className='price'>{`$${product[key].Price}.00`}</p>
                <IncDecCounter />
            </div>)
        }

        return (<div className='pass-quantity-selection-wrapper'>{passForm}</div>)


    }
    return (
        <div>
            <Button className='picked-date'>{pickedDate}</Button>
            <Accordion allowZeroExpanded allowMultipleExpanded>
                {products.map((product) =>
                    <div key={product.key}>
                        <AccordionItem className='accordion__item'>
                            <AccordionItemHeading >
                                <AccordionItemButton>
                                    <div className='accordion__heading'>
                                        <img src={product.Photo} className='img' />
                                        <div>
                                            <h3>{product.Name}</h3>
                                            {setQuantity(product.Name, 0)}
                                            <p>{product.Description}</p>
                                        </div>
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className='accordion__panel'>
                                {product.NumberOfSessionTimes !== 0 ? (
                                    <div>
                                        <p>Session Time</p>
                                        <div className='session-time-btns-wrapper'>
                                            {createSessionTimes(product.Name, product.NumberOfSessionTimes)}
                                        </div>
                                    </div>
                                )
                                    : null}
                                {createPassSelectionForm(product.PassType, product.Duration)}
                                {/* <div>
                                {product.Name === 'Jr. Jump Chaperone' ? (
                                    <div>
                                        <p>Session Time</p>
                                        <div className='session-time-btns-wrapper'>
                                            {createSessionTimes('jr-chaperone', 4)}
                                        </div>
                                        <div className='pass-quantity-selection'>
                                            <p>Junior Jump Parent</p>
                                            <p>2 hours</p>
                                            <p>{`$${product.Price}.00`}</p>
                                            <IncDecCounter />
                                        </div>
                                    </div>
                                ) : null}
                                {product.Name === 'Junior Jump Pass 120 Min' ? (
                                    <div>
                                        <p>Session Time</p>
                                        <div className='session-time-btns'>
                                            {createSessionTimes('jr-kids', 4)}
                                        </div>
                                        <div className='pass-quantity-selection'>
                                            <p>Junior Jumper 6 or Under</p>
                                            <p>2 hours</p>
                                            <p>{`$${product.Price}.00`}</p>
                                            <IncDecCounter />
                                        </div>
                                    </div>
                                ) : null}
                            </div> */}
                            </AccordionItemPanel>
                        </AccordionItem>
                    </div>
                )}
            </Accordion>
        </div>
    )
}

export default PassPicker
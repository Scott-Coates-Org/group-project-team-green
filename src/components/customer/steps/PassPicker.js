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
import SelectTime from './SelectTime';
import PassItem from './PassItem';

const timeslots = [
    "10:00 am", "10:30 am", "11:00 am", "11:30 am", "12:00 pm",
    "12:30 pm", "1:00 pm", "1:30 pm", "2:00 pm", "2:30 pm",
    "3:00 pm", "3:30 pm", "4:00 pm", "4:30 pm", "5:00 pm",
    "5:30 pm", "6:00 pm", "6:30 pm", "7:00 pm"
]

const PassPicker = ({ pickedDate, onAdd }) => {
    const [products, setProducts] = useState([]);
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

    // const createSessionTimes = (name, number) => {
    //     let sessionTimes = [];
    //     for (let i = 0; i < number; i++) {
    //         sessionTimes.push(<Button className="session-time-btns" key={`${name}-btn-${i}`}>{timeslots[i]}</Button>)
    //     }
    //     return sessionTimes;
    // }

    // const setQuantity = (name, qty) => {
    //     let prod = productsQuantity.find(prod => prod.name === name);

    //     if (!prod) {
    //         productsQuantity.push({ name, qty });
    //     } else {
    //         prod.qty += qty;
    //     }
    // }


    return (
        <div>
            <Button className='picked-date'>{pickedDate}</Button>
            <Accordion allowZeroExpanded allowMultipleExpanded>
                {products.map((product) =>
                    <PassItem product={product} key={product.key} onAdd={onAdd} />
                    // <div key={product.key}>
                    //     <AccordionItem className='accordion__item'>
                    //         <AccordionItemHeading >
                    //             <AccordionItemButton>
                    //                 <div className='accordion__heading'>
                    //                     <img src={product.Photo} className='img' />
                    //                     <div>
                    //                         <h3>{product.Name}</h3>
                    //                         {setQuantity(product.Name, 0)}
                    //                         <p>{product.Description}</p>
                    //                     </div>
                    //                 </div>
                    //             </AccordionItemButton>
                    //         </AccordionItemHeading>
                    //         <AccordionItemPanel className='accordion__panel'>
                    //             {product.NumberOfSessionTimes !== 0 ? (
                    //                 <div>
                    //                     <p>Session Time</p>
                    //                     <SelectTime sliceNumber={product.NumberOfSessionTimes}></SelectTime>
                    //                 </div>
                    //             )
                    //                 : null}
                    //             {createPassSelectionForm(product.PassType, product.Duration)}
                    //         </AccordionItemPanel>
                    //     </AccordionItem>
                    // </div>
                )}
            </Accordion>
        </div>
    )
}

export default PassPicker
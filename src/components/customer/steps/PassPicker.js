import React, { useState, useEffect } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { Alert, ButtonGroup, ButtonToolbar } from 'reactstrap';

// Demo styles, see 'Styles' section below for some notes on use.
// import 'react-accessible-accordion/dist/fancy-example.css';
import './passpicker.css';
import myImage from '../../../assets/images/homepage-background.png';
import firebaseClient from '../../../firebase/client'
import SelectTime from './SelectTime';
import PassItem from './PassItem';

const timeslots = [
    "10:00 am", "10:30 am", "11:00 am", "11:30 am", "12:00 pm",
    "12:30 pm", "1:00 pm", "1:30 pm", "2:00 pm", "2:30 pm",
    "3:00 pm", "3:30 pm", "4:00 pm", "4:30 pm", "5:00 pm",
    "5:30 pm", "6:00 pm", "6:30 pm", "7:00 pm"
]

const PassPicker = ({ pickedDate, onAdd, onRemove }) => {
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

    return (
        <div>
            <h3>Select your passes</h3>
            <Alert className='d-inline-block' color='primary'>{pickedDate}</Alert>
            <Accordion allowZeroExpanded allowMultipleExpanded>
                {products.map((product) =>
                    <PassItem product={product} key={product.key} onAdd={onAdd} onRemove={onRemove} />
                )}
            </Accordion>
        </div>
    )
}

export default PassPicker
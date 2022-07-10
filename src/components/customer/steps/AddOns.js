import React, { useState, useEffect } from 'react'
import { useWizard } from 'react-use-wizard';
import { Button } from 'reactstrap';
import WizardStyle from '../wizard/wizard-container.module.css';
import firebaseClient from '../../../firebase/client'


const AddOns = ({ onAdd, onRemove }) => {
    const { nextStep, previousStep } = useWizard();
    const [addOns, setAddOns] = useState([]);

    useEffect(() => {
        const getAddOnsFromFirebase = [];
        const addOnsRef = firebaseClient
            .firestore()
            .collection("addOns")
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    getAddOnsFromFirebase.push({
                        ...doc.data(),
                        key: doc.id,
                    });

                });

                setAddOns(getAddOnsFromFirebase);

            });

        return () => addOnsRef();
    }, []);

    return (
        <div>
            <h1>Select add-ons</h1>
            {addOns.map((addOn) =>
                <div key={addOn.key}>
                    <div>
                        <img src={addOn.Photo} className='img' alt={addOn.Name} />
                        <div>{addOn.Name}</div>
                        <div>${addOn.Price}.00</div>
                    </div>
                    <div>
                        <button onClick={() => onRemove(addOn, null)}>-</button>
                        {' '}
                        <button onClick={() => onAdd(addOn, null)}>+</button>
                    </div>
                </div>
            )}
            <hr></hr>
            <Button color="secondary" size="lg" onClick={() => previousStep()}> Previous</Button>
            <Button className={WizardStyle.next_btn} color="success" size="lg" onClick={() => nextStep()}> Next </Button>
        </div>

    )
}

export default AddOns
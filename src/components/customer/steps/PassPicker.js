import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
// import 'react-accessible-accordion/dist/fancy-example.css';
import './passpicker.css';
import myImage from '../../../assets/images/homepage-background.png';

const PassPicker = ({ pickedDate }) => {
    return (
        <Accordion allowZeroExpanded allowMultipleExpanded>
            <AccordionItem className='accordion__item'>
                <AccordionItemHeading className=''>

                    <AccordionItemButton>
                        <div className='accordion__heading'>
                            <img src={myImage} className='img' />
                            <div>
                                <h3>Unlimited Pass</h3>
                                <p>All day pass!</p>
                            </div>
                        </div>

                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className='accordion__panel'>
                    <p>
                        Access to all Park attractions that are open!

                        Altitude Safety Socks Required

                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem className='accordion__item'>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        <div className='accordion__heading'>
                            <img src={myImage} className='img' />
                            <div>
                                <h3>Power Pass</h3>
                                <p>120 Minutes Jump Pass</p>
                            </div>
                        </div>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className='accordion__panel'>
                    <p>
                        120 Minutes of Jump Time! Access to all Park Features
                        that are open!

                        Altitude Safety Socks Required!
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem className='accordion__item'>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        <div className='accordion__heading'>
                            <img src={myImage} className='img' />
                            <div>
                                <h3>Junior Jumpers Jam</h3>
                                <p>Jump Pass for children 6 or Under</p>
                            </div>
                        </div>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className='accordion__panel'>
                    <p>
                        Jump area for children 6 or Under!

                        Altitude Safety Socks Required

                    </p>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    )
}

export default PassPicker
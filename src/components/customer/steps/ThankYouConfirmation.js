import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText
} from 'reactstrap'
import './thankyou.css'


const ThankYouConfirmation = () => {
  return (
    <div className='thank-you-container'>
      <div className='thank-you-wrapper'>
        <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
          <FontAwesomeIcon icon={faCheckCircle} className='check-icon' />
          <h1>Thank you for your purchase!</h1>
          <h3>Your order <b>#111111</b> has been placed!</h3>
          <h6>We sent an email to <b>[email]</b> with your order confirmation and receipt. </h6>
          <p>Time Placed: 01/23/2022 14:45 PST</p>
        </div>

        <div>
          <h2>Order Details</h2>
          <div>
            <Card>
              <CardBody className='order-item-card'>
                <img alt="Card image cap" src="https://picsum.photos/318/180" />

                <div className='item-description'>
                  <CardTitle tag="h5">
                    Junior Jumper 6 or Under Pass
                  </CardTitle>
                  <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                  >
                    <p>quantity: 1</p>
                    <p>time: 10:00 AM</p>
                    <p>duration: 2 hours</p>
                  </CardSubtitle>
                </div>
                <CardText>
                  <div>$25.00</div>
                </CardText>
              </CardBody>
            </Card>
            <Card>
              <CardBody className='order-item-card'>
                <img alt="Card image cap" src="https://picsum.photos/318/180" />

                <div className='item-description'>
                  <CardTitle tag="h5">
                    Junior Jumper Parent Pass
                  </CardTitle>
                  <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                  >
                    <p>quantity: 2</p>
                    <p>time: 10:00 AM</p>
                    <p>duration: 2 hours</p>
                  </CardSubtitle>
                </div>
                <CardText>
                  <div>$0.00</div>
                </CardText>
              </CardBody>
            </Card>
          </div>
          <hr />
          <div className='order-summary-area'>
            <h2>Order Summary</h2>
            <p>Total: $25.00</p>
          </div>
        </div>
      </div>

      <footer></footer>
    </div >
  )
}

export default ThankYouConfirmation
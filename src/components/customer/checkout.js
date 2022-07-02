import React from 'react'
import WizardContainer from './wizard/WizardContainer';
import Cart from './Cart';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Checkout = () => {
  return (
    <div>

      <div className="d-flex justify-content-center bg-primary" >
        <Link to="/">
          <Button className="mt-4">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
        </Link>
        <WizardContainer />
        <Cart />
      </div>
    </div>

  )
}

export default Checkout
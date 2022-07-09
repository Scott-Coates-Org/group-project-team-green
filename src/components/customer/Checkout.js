import React, { useState, useEffect } from 'react'
import WizardContainer from './wizard/WizardContainer';
import ShoppingCart from './ShoppingCart';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);

  const onAdd = (product, time) => {

    const exist = cartItems.find((x) => x.PassName === product.PassName && x.time === time);

    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.PassName === product.PassName && x.time === time ? { ...exist, qty: exist.qty + 1 } : x
        )
      )
    } else {
      setCartItems([...cartItems, { ...product, qty: 1, time: time }]);
    }
  }

  const onRemove = (product, time) => {
    const exist = cartItems.find((x) => x.PassName === product.PassName && x.time === time);

    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.PassName !== product.PassName || x.time !== time));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.PassName === product.PassName && x.time === time ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  }


  return (
    <div>
      <div className="d-flex justify-content-center bg-primary" >
        <Link to="/">
          <Button className="mt-4">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
        </Link>
        <WizardContainer
          onAdd={onAdd}
        />
        <ShoppingCart
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      </div>
    </div>

  )
}

export default Checkout

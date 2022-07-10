import React, { useState, useEffect } from 'react'
import WizardContainer from './wizard/WizardContainer';
import ShoppingCart from './ShoppingCart';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [dateFromSelection, setDateFromSelection] = useState('');

  const getDateFromSelection = (selectedDate) => {
    setDateFromSelection(selectedDate);
  }

  const hasItems = () => {
    return cartItems.length > 0;
  }

  const onAdd = (product, time) => {
    if (product.PassName) {
      const exist = cartItems.find((x) => (x.PassName === product.PassName || x.Name === product.Name) && x.time === time);

      if (exist) {
        setCartItems(
          cartItems.map((x) =>
            (x.PassName === product.PassName || x.Name === product.Name) && x.time === time ? { ...exist, qty: exist.qty + 1 } : x
          )
        )
      } else {
        setCartItems([...cartItems, { ...product, qty: 1, time: time }]);
      }
    }

    if (product.Name) {
      const exist = cartItems.find((x) => (x.Name === product.Name));

      if (exist) {
        setCartItems(
          cartItems.map((x) =>
            (x.Name === product.Name) ? { ...exist, qty: exist.qty + 1 } : x
          )
        )
      } else {
        setCartItems([...cartItems, { ...product, qty: 1 }]);
      }
    }
  }

  const onRemove = (product, time) => {
    if (product.PassName) {
      const exist = cartItems.find((x) =>
        (x.PassName === product.PassName) && x.time === time);

      if (exist.qty === 1) {
        setCartItems(cartItems.filter((x) =>
          (x.PassName !== product.PassName) || x.time !== time));
      } else {
        setCartItems(
          cartItems.map((x) =>
            (x.PassName === product.PassName)
              && x.time === time ? { ...exist, qty: exist.qty - 1 } : x
          )
        );
      }
    }

    if (product.Name) {
      const exist = cartItems.find((x) => (x.Name === product.Name));

      if (exist.qty === 1) {
        setCartItems(cartItems.filter((x) => (x.Name !== product.Name)));
      } else {
        setCartItems(
          cartItems.map((x) =>
            (x.Name === product.Name) ? { ...exist, qty: exist.qty - 1 } : x
          )
        );
      }
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
          onRemove={onRemove}
          hasItems={hasItems()}
          getDateFromSelection={getDateFromSelection}
        />
        <ShoppingCart
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          dateFromSelection={dateFromSelection}
        />
      </div>
    </div>

  )
}

export default Checkout

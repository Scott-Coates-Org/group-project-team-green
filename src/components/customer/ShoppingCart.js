import React from 'react'
import WizardStyle from './wizard/wizard-container.module.css';
import { Alert } from 'reactstrap';

const ShoppingCart = ({ cartItems, onAdd, onRemove, dateFromSelection }) => {

  const calcTotal = (cartItems) => {
    let total = 0;
    cartItems.map((item) => {
      total += (item.qty * item.Price);
    })

    return total;
  }

  const displayItems = (cartItems) => {
    let itemsList = [];
    cartItems.map((item) => {
      itemsList.push(
        <div key={item.PassName ? `${item.PassName}-${item.time}` : `${item.Name}`}>
          <div>
            <div>{item.PassName ? item.PassName : item.Name}</div>
            <div>{item.time ? item.time : null}</div>
            <button onClick={() => onRemove(item, item.time)}>-</button>
            {' '}
            <button onClick={() => onAdd(item, item.time)}>+</button>
          </div>
          <div>
            {item.qty} x ${item.Price}
          </div>
        </div>)
    })
    return <div>{itemsList}</div>
  }

  return (
    <div className={WizardStyle.cart}>
      <div>
        <div className='cart-header'>
          <h3>Your cart</h3>
          <hr></hr>
        </div>
        <div>
          {dateFromSelection ?
            <Alert className='d-inline-block' color="primary">
              {dateFromSelection}
            </Alert>
            : null}
        </div>

        {cartItems.length === 0 && <div>Your cart is empty</div>}
        {displayItems(cartItems)}
        {cartItems.length !== 0 ?
          <div>
            <hr></hr>
            <div>Subtotal</div>
            <div>${calcTotal(cartItems)}</div>
          </div>
          : null}
      </div>
    </div>
  )
}

export default ShoppingCart

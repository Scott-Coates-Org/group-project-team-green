import React, { useState, useEffect } from 'react'
import WizardStyle from './wizard/wizard-container.module.css';
import firebaseClient from '../../firebase/client'

const ShoppingCart = ({ cartItems, onAdd, onRemove }) => {

  const calcTotal = (cartItems) => {
    let total = 0;
    cartItems.map((item) => {
      total += (item.qty * item.Price);
    })

    return total;
  }

  const printItems = (cartItems) => {
    let itemslist = [];
    console.log(cartItems);
    cartItems.map((item) => {
      itemslist.push(
        <div key={`${item.PassName}-${item.time}`}>
          <div>
            <div>{item.PassName}</div>
            <div>{item.time}</div>
            <button onClick={() => onRemove(item, item.time)}>-</button>
            {' '}
            <button onClick={() => onAdd(item, item.time)}>+</button>
          </div>
          <div>
            {item.qty} x ${item.Price}
          </div>
        </div>)
    })
    return <div>{itemslist}</div>
  }
  return (
    <div className={WizardStyle.cart}>
      <div>
        {cartItems.length === 0 && <div>Cart is empty</div>}
        {printItems(cartItems)}
        {cartItems.length !== 0 ?
          <div>
            <div>Total Price</div>
            <div>${calcTotal(cartItems)}</div>
          </div>
          : null}
      </div>
    </div>
  )
}

export default ShoppingCart
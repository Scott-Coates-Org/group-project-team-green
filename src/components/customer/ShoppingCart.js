import React from "react"
import WizardStyle from "./wizard/wizard-container.module.css"
import { Alert, Button } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import "./shoppingcart.css"

const ShoppingCart = ({ cartItems, removeItemFromCart, dateFromSelection }) => {
  function convertData(original) {
    let obj = {
      quantity: original.qty,
      price_data: {
        currency: "usd",
        unit_amount: original.Price * 100,
        product_data: {
          name: original.Name || original.PassName,
        },
      },
    }
    return obj
  }
  let preparedLineItems = cartItems.map((item) => convertData(item))
  const myJSONData = JSON.stringify(preparedLineItems)

  const calcTotal = (cartItems) => {
    let total = 0
    cartItems.map((item) => {
      total += item.qty * item.Price
    })

    return total
  }

  const displayItems = (cartItems) => {
    let itemsList = []
    cartItems.map((item) => {
      itemsList.push(
        <div key={item.PassName ? `${item.PassName}-${item.time}` : `${item.Name}`}>
          <div className="cart-item-wrapper">
            <div>
              {`${item.qty} x ${item.PassName || item.Name} ${
                item.time ? `(${item.time} 2 hours)` : ""
              }`}
            </div>
            <div className="text-right pr-2">${item.Price}.00</div>
            <div>
              <Button
                onClick={() =>
                  removeItemFromCart(item.PassName || item.Name, item.time)
                }
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            </div>
          </div>
        </div>
      )
    })

    console.log(cartItems)
    return <div>{itemsList}</div>
  }

  return (
    <div className={WizardStyle.cart}>
      <div>
        <div className="cart-header">
          <h3>Your cart</h3>
          <hr></hr>
        </div>
        <div>
          {dateFromSelection ? (
            <Alert className="d-inline-block" color="primary">
              {dateFromSelection}
            </Alert>
          ) : null}
        </div>

        {cartItems.length === 0 && <div>Your cart is empty</div>}
        {displayItems(cartItems)}
        {cartItems.length !== 0 ? (
          <div>
            <hr></hr>
            <div>Subtotal</div>
            <div>${calcTotal(cartItems)}</div>{" "}
          </div>
        ) : null}
      </div>
      <Button
        href={`https://us-central1-team-green-6d418.cloudfunctions.net/createCheckoutSession?data=${myJSONData}`}
      >
        Check Out can you see me??
      </Button>
    </div>
  )
}

export default ShoppingCart

import React, { useState, useEffect } from "react"
import WizardContainer from "./wizard/WizardContainer"
import ShoppingCart from "./ShoppingCart"
import { Button } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import firebaseClient from "firebase/client"

const Checkout = () => {
  const [cartItems, setCartItems] = useState([])
  const [dateFromSelection, setDateFromSelection] = useState("")
  const [waiverInfo, setWaiverInfo] = useState({})

  const getDateFromSelection = (selectedDate) => {
    setDateFromSelection(selectedDate)
  }

  const hasItems = () => {
    return cartItems.length > 0
  }

  const removeItemFromCart = (name, time) => {
    setCartItems(
      cartItems.filter((x) => (x.Name || x.PassName) !== name || x.time !== time)
    )
  }

  const onAdd = (product, time) => {
    if (product.PassName) {
      const exist = cartItems.find(
        (x) => x.PassName === product.PassName && x.time === time
      )
      console.log("inside passName", exist)
      if (exist) {
        setCartItems(
          cartItems.map((x) =>
            x.PassName === product.PassName && x.time === time
              ? { ...exist, qty: exist.qty + 1 }
              : x
          )
        )
      } else {
        setCartItems([...cartItems, { ...product, qty: 1, time: time }])
      }
    }

    if (product.Name) {
      const exist = cartItems.find((x) => x.Name === product.Name)

      if (exist) {
        setCartItems(
          cartItems.map((x) =>
            x.Name === product.Name ? { ...exist, qty: exist.qty + 1 } : x
          )
        )
      } else {
        setCartItems([...cartItems, { ...product, qty: 1 }])
      }
    }
  }

  const onRemove = (product, time) => {
    if (product.PassName) {
      const exist = cartItems.find(
        (x) => x.PassName === product.PassName && x.time === time
      )
      if (!exist) {
        return
      }

      if (exist.qty === 1) {
        setCartItems(
          cartItems.filter((x) => x.PassName !== product.PassName || x.time !== time)
        )
      } else {
        setCartItems(
          cartItems.map((x) =>
            x.PassName === product.PassName && x.time === time
              ? { ...exist, qty: exist.qty - 1 }
              : x
          )
        )
      }
    }

    if (product.Name) {
      const exist = cartItems.find((x) => x.Name === product.Name)
      if (!exist) {
        return
      }

      if (exist.qty === 1) {
        setCartItems(cartItems.filter((x) => x.Name !== product.Name))
      } else {
        setCartItems(
          cartItems.map((x) =>
            x.Name === product.Name ? { ...exist, qty: exist.qty - 1 } : x
          )
        )
      }
    }
  }

  const onWaiverAccepted = (waiver) => {
    setWaiverInfo(waiver)
    process.env.NODE_ENV === "development" && console.log("waivers", waiver)
    // TODO To be fired when payment is done
    firebaseClient
      .firestore()
      .collection("waivers")
      .doc()
      .set({ ...waiver, bookingId: "PLACEHOLDER" })
      .then((val) => {
        console.log("Firebase waiver response", val)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <div>
      <div className="d-flex justify-content-center bg-primary">
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
          onWaiverAccepted={onWaiverAccepted}
        />
        <ShoppingCart
          cartItems={cartItems}
          removeItemFromCart={removeItemFromCart}
          dateFromSelection={dateFromSelection}
        />
      </div>
    </div>
  )
}

export default Checkout

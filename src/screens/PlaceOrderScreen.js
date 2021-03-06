import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import {createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

const PlaceOrderScreen = (props) => {
  const { cart } = useSelector((state) => state);
  const { shippingAddress, paymentMethod, cartItems } = cart;
  const { orderCreate } = useSelector( state => state)
  const { loading, error, order, success } = orderCreate

  const dispatch = useDispatch();

  if (!paymentMethod) {
    props.history.push("/payment");
  }

  const toPrice = (num) => Number(num.toFixed(2));

  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;


  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems}) )
  }

  useEffect( () => {
    if(success ){
      props.history.push(`/order/${order._id}`)
      dispatch({ type: ORDER_CREATE_RESET })
    }
  }, [ success, dispatch, order, props.history ])

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name: {shippingAddress.fullName}</strong>
                </p>
                <p>
                  <strong>
                    Address: {shippingAddress.address}, {shippingAddress.city},
                    {shippingAddress.postalCode}, {shippingAddress.country}
                  </strong>
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method: {paymentMethod}</strong>
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            className="small"
                            alt={item.name}
                          />
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {" "}
                            {item.name}{" "}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} = {item.price * item.qty}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h1>Order Summary</h1>
              </li>
              <li>
                <div className="row">
                  <div> Items </div>
                  <div> ${cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div> Shipping Price </div>
                  <div> ${cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div> Tax </div>
                  <div> ${cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total </strong>
                  </div>
                  <div>
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  className="primary block"
                  type="button"
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </button>
              </li>
              { loading && <LoadingBox></LoadingBox> }
              { error && <MessageBox variant='danger'>{error}</MessageBox>} 
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;

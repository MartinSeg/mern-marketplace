import "./index.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import { useDispatch, useSelector } from "react-redux";
import SignInScreen from "./screens/SignInScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import { signout } from "./actions/userActions";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";

function App() {

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems)
  const userSignIn = useSelector(state => state.userSignIn)
  const { userInfo } = userSignIn

  const signoutHandler = () => {
    dispatch(signout())
  }
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Amazona
            </Link>
          </div>
          <div>
            <Link to="/cart">Cart
              {cartItems.length > 0 && (
                <span className='badge'> {cartItems.length} </span> 
              )} 
            </Link>
            { userInfo
              ? <div className='dropdown'> 
                <Link to="#"> { userInfo.name } <i className='fa fa-caret-down'></i> </Link>
                <ul className='dropdown-content'>
                  <Link to='#signout' onClick={signoutHandler}> Sign Out </Link>
                </ul>

              </div>
              : <Link to="/signin"> Sign In </Link>
            }
          </div>
        </header>
        <main>
          
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/signin' component={SignInScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/shipping' component={ShippingAddressScreen}/>
          <Route path='/payment' component={PaymentMethodScreen}/>
          <Route path='/placeorder' component={PlaceOrderScreen}/>
          <Route path='/' exact  component={HomeScreen} />
          
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
      
    </Router>
  );
}

export default App;

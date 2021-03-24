import "./index.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import { useDispatch, useSelector } from "react-redux";
import SignInScreen from "./screens/SignInScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import OrderScreen from './screens/OrderScreen';
import { signout } from "./actions/userActions";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import { OrderListScreen } from "./screens/OrderListScreen";

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
                  <li>
                    <Link to='/profile'> User Profile </Link>
                  </li>
                  <li>
                    <Link to='/orderhistory'> Order History </Link>
                  </li>
                  <li>
                    <Link to='#signout' onClick={signoutHandler}> Sign Out </Link>
                  </li>
                  
                </ul>

              </div>
              : <Link to="/signin"> Sign In </Link>
            }
            { userInfo?.isAdmin && 
              <div className='dropdown'> 
                <Link to="#admin"> Admin <i className='fa fa-caret-down'></i> </Link>
                <ul className='dropdown-content'>
                  <li>
                    <Link to='/dashboard'> Dashboard </Link>
                  </li>
                  <li>
                    <Link to='/productlist'> Products </Link>
                  </li>
                  <li>
                    <Link to='/orderlist'> Orders </Link>
                  </li>
                  <li>
                    <Link to='/userlist'> Users </Link>
                  </li>
                </ul>
              </div>
            }
          </div>
        </header>
        <main>
          
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/product/:id' component={ProductScreen} exact/>
          <Route path='/product/:id/edit' component={ProductEditScreen} exact/>
          <Route path='/signin' component={SignInScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/shipping' component={ShippingAddressScreen}/>
          <Route path='/payment' component={PaymentMethodScreen}/>
          <Route path='/placeorder' component={PlaceOrderScreen}/>
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/orderhistory' component={OrderHistoryScreen}/>
          <PrivateRoute path='/profile' component={ProfileScreen}/>
          <AdminRoute path='/productlist' component={ProductListScreen}/>
          <AdminRoute path='/orderlist' component={OrderListScreen}/>
          <Route path='/' exact  component={HomeScreen} />
          
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
      
    </Router>
  );
}

export default App;

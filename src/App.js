import "./index.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import { useSelector } from "react-redux";

function App() {

  const cartItems = useSelector(state => state.cart.cartItems)

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
            <Link to="/signin">Sign In</Link>
          </div>
        </header>
        <main>
          
          <Route path="/"exact  component={HomeScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
      
    </Router>
  );
}

export default App;

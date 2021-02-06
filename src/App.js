import "./index.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <a className="brand" href="/">
              Amazona
            </a>
          </div>
          <div>
            <a href="/cart">Cart</a>
            <a href="/signin">Sign In</a>
          </div>
        </header>
        <main>
          
          <Route path="/"exact  component={HomeScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
      
    </Router>
  );
}

export default App;

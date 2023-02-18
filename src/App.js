import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/Products";
import Thanks from "./components/Thanks";
import Checkout from "./components/Checkout";
import ipConfig from "./ipConfig.json";
import { Route, Switch } from "react-router-dom";
export const config = {
  endpoint: `https://qt-kart-frontend.herokuapp.com/api/v1`,
};

function App() {
  return (
    <div className="App">
      <Switch>
        
        <Route path="/register">
          <Register/>
        </Route>
        
        <Route path="/login">
          <Login/>
        </Route>

        <Route path="/checkout">
          <Checkout/>
        </Route>

        <Route path="/thanks">
          <Thanks/>
        </Route>

        <Route path="/">
          <Products/>
        </Route>  
      
      </Switch>    
    </div>
  );
}

export default App;

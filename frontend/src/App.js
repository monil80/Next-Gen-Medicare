import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


// Components
import Navbar from "./components/Navbar";
import SideDrawer from "./components/SideDrawer";
import Backdrop from "./components/Backdrop";
import Footer from "./components/Footer";

// Screens
import DiabetesScreen  from "./screens/DiabetesScreen ";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import MainScreen from "./screens/MainScreen";
import ContactScreen from "./screens/ContactScreen";
import AboutScreen from "./screens/AboutScreen";
import AllProductsScreen from "./screens/AllProductsScreen";
import DermotologyScreen from "./screens/DermotologyScreen";
import DepressionScreen from "./screens/DepressionScreen";
import DentalScreen from "./screens/DentalScreen";

import FractureScreen from "./screens/FractureScreen";
import WomensCareScreen from "./screens/WomensCareScreen";
import AdminScreen from "./screens/AdminScreen";
// import


import Login from "./screens/pages/Login"
import Register from "./screens/pages/Register"
import EmailSend from "./screens/pages/EmailSend";

function App() {
  const [sideToggle, setSideToggle] = useState(false);

  return (
    <Router>
      <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <main className="app">
        <Switch>
          <Route exact path="/" component={MainScreen} />
          <Route exact path="/allProducts" component={AllProductsScreen} />
          <Route exact path="/products/diabetes" component={DiabetesScreen } />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/products/dermatology" component={DermotologyScreen}/>
          <Route exact path="/products/depression" component={DepressionScreen}/>
          <Route exact path="/products/dental" component={DentalScreen} />
          <Route exact path="/products/fracture" component={FractureScreen} />
          <Route exact path="/products/women's Care"component={WomensCareScreen}/>
          <Route exact path="/about" component={AboutScreen} />
          <Route exact path="/contact" component={ContactScreen} />
          <Route exact path="/admin" component={AdminScreen} />
          <Route exact path="/cart" component={CartScreen} />


          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/email" component={EmailSend} />
        
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

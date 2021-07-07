import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import HomeScreen from "./screens/HomeScreen";
import CakeScreen from "./screens/CakeScreen";
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import CakeListScreen from "./screens/CakeListScreen";
import CakeEditScreen from './screens/CakeEditScreen';
import OrderListScreen from "./screens/OrderListScreen";
import Footer from "./components/Footer";


import { Container } from "react-bootstrap";

import "./App.css";

const App = () => {
  return (
    <Router>
      <NavMain />
      <main className="py-2 mb-5">
        <Container>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/cake/:id" component={CakeScreen} />
          <Route exact path="/admin/cakelist" component={CakeListScreen} />
          <Route exact path="/admin/cake/:id/edit" component={CakeEditScreen} />
          <Route exact path="/cart/:id?" component={CartScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/signup" component={RegisterScreen} />
          <Route exact path="/profile" component={ProfileScreen} />
          <Route exact path="/shipping" component={ShippingScreen} />
          <Route exact path="/payment" component={PaymentScreen} />
          <Route exact path="/placeorder" component={PlaceOrderScreen} />
          <Route exact path="/order/:id" component={OrderScreen} />
          <Route exact path="/admin/orderlist" component={OrderListScreen} />
          <Route exact path="/admin/userlist" component={UserListScreen} />
          <Route exact path="/admin/user/:id/edit" component={UserEditScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

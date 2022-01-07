import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "../components/Navbar";
import AddProduct from "../views/AddProduct";
import Cart from "../views/Cart";
import EditProduct from "../views/EditProduct";
import Home from "../views/Home";
import Orders from "../views/Orders";

const MainContainer = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product" element={<EditProduct />}>
          <Route path=":idx" element={<EditProduct />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
};

export default MainContainer;

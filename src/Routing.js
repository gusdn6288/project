import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App"; // App 컴포넌트를 올바르게 import
import Product from "./pages/Products/Product"; // 
import Login from "./pages/Login/Login"; // 
import Signup from "./pages/Signup/Signup";
import ProductDetail from "./pages/Detail/ProductDetail";
import Wish from "./pages/Wish/Wish";
import Navigation from "./Navigation";

function Routing() {
  return (

    <BrowserRouter>
    <Navigation/>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/product' element={<Product />} /> 
        <Route path='/signup' element={<Signup />} /> 
        <Route path='/login' element={<Login />} /> 
        <Route path='/productDetail/:id' element={<ProductDetail />} /> 
        <Route path='/Wish' element={<Wish/>} /> {/* <Routes> 안에서 사용해야 함 */}
      </Routes>
    </BrowserRouter>


  );
}

export default Routing;

import "./App.css";
import Header from "./components/header/Header.jsx";
import { Routes, Route, Navigate } from "react-router";
import ProductsPage from "./pages/ProductsPage/ProductsPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage.jsx";
import BasketPage from "./pages/BasketPage/BasketPage.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./features/products/productsSlice.js";

export default function App() {
  const dispatch = useDispatch();
   useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/basket" element={<BasketPage />} />
      </Routes>
    </>
  );
}

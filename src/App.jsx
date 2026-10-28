import "./App.css";
import Header from "./components/header/Header.jsx";
import { Routes, Route, Navigate } from "react-router";
import ProductsPage from "./pages/ProductsPage/ProductsPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage.jsx";
import BasketPage from "./pages/BasketPage/BasketPage.jsx";

export default function App() {
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

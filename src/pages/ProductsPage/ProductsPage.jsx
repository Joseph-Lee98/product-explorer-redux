import react from "react";
import { useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./ProductsPage.css";
import { useDispatch, useSelector } from "react-redux";

export default function ProductsPage() {
  const products = useSelector((state) => state.products.products);
  const isLoading = useSelector((state) => state.products.isLoading);
  const errorMessage = useSelector((state) => state.products.errorMessage);

  return (
    <main className="products-page">
      <h1 className="products-page-title">Explore Products</h1>

      <p className="products-page-description">
        Discover products from a variety of categories.
      </p>

      {isLoading && <p className="products-loading">Loading products...</p>}

      {errorMessage && <p className="products-error">{errorMessage}</p>}

      {!isLoading && !errorMessage && (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              thumbnail={product.thumbnail}
              id={product.id}
            />
          ))}
        </div>
      )}
    </main>
  );
}

import react from "react";
import { useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./ProductsPage.css";
import { useProducts } from "../../context/ProductsContext";

export default function ProductsPage() {
  const { products, isLoading, errorMessage } = useProducts();

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

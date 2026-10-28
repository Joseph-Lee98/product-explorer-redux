import react from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { useBasket } from "../../context/BasketContext";
import { useProducts } from "../../context/ProductsContext";
import "./ProductDetailsPage.css";
import { useEffect } from "react";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const numberId = Number(id);
  const { products, setProducts, isLoading, errorMessage } = useProducts();
  const isProductPresent = products.some((product) => product.id === numberId);
  const indexInProducts = products.findIndex(
    (product) => product.id === numberId,
  );
  const product = products[indexInProducts];
  const { basket, setBasket } = useBasket();
  const isInBasket = basket.some((item) => item.id === numberId);
  const addToBasketHandler = () => {
    setBasket([
      ...basket,
      {
        id: numberId,
        quantity: 1,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      },
    ]);
  };
  const index = basket.findIndex((item) => item.id === numberId);
  const increaseQuantityHandler = () => {
    setBasket(
      basket.map((item) => {
        if (item.id === numberId)
          return { ...item, quantity: item.quantity + 1 };
        return item;
      }),
    );
  };
  const decreaseQuantityHandler = () => {
    setBasket((prevBasket) =>
      prevBasket
        .map((item) => {
          if (item.id === numberId) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity >= 1),
    );
  };
  return (
    <main className="product-page">
      <h1 className="product-page-title">Explore this Product</h1>

      <p className="product-page-description">
        Discover the details of this product.
      </p>

      {isLoading && (
        <p className="product-loading">Loading product information...</p>
      )}

      {errorMessage && <p className="product-error">{errorMessage}</p>}

      {!isLoading && !errorMessage && !isProductPresent && (
        <p className="product-error">Product is not present</p>
      )}

      {!isLoading && !errorMessage && isProductPresent && (
        <div className="product-details">
          <div className="product-details-image-container">
            <img
              className="product-details-image"
              src={product.thumbnail}
              alt={product.title}
            />
          </div>

          <div className="product-details-content">
            <p className="product-details-category">{product.category}</p>

            <h2 className="product-details-title">{product.title}</h2>

            {product.brand && (
              <p className="product-details-brand">Brand: {product.brand}</p>
            )}

            <p className="product-details-rating">
              <span aria-hidden="true">★</span>
              {product.rating} / 5
            </p>

            <p className="product-details-price">${product.price.toFixed(2)}</p>

            <p className="product-details-description">{product.description}</p>

            <p className="product-details-stock">
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>

            <div className="product-details-actions">
              {isInBasket ? (
                <div className="product-details-basket-controls">
                  <p className="product-details-added-message">
                    <span aria-hidden="true">✓</span>
                    Added to Basket
                  </p>

                  <div className="product-details-quantity-controls">
                    <button
                      type="button"
                      className="product-details-quantity-button"
                      aria-label="Decrease quantity"
                      onClick={decreaseQuantityHandler}
                    >
                      −
                    </button>

                    <span className="product-details-quantity">
                      {basket[index].quantity}
                    </span>

                    <button
                      type="button"
                      className="product-details-quantity-button"
                      aria-label="Increase quantity"
                      onClick={increaseQuantityHandler}
                    >
                      +
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="product-details-basket-button"
                  onClick={addToBasketHandler}
                  disabled={product.stock === 0}
                >
                  Add to Basket
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

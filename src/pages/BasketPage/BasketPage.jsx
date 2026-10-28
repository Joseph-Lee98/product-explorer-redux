import { Link } from "react-router";
import "./BasketPage.css";
import { useBasket } from "../../context/BasketContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import React from "react";

export default function BasketPage() {
  const { basket, setBasket } = useBasket();
  return (
    <main className="basket-page">
      <h1 className="basket-page-title">Your Basket</h1>
      <p className="basket-page-description">
        Here are the products in your basket:
      </p>
      <div className="basket-grid">
        {basket.length ? (
          basket.map((item) => (
            <ProductCard
              key={item.id}
              title={item.title}
              price={item.price}
              thumbnail={item.thumbnail}
              id={item.id}
            />
          ))
        ) : (
          <p className="basket-empty">Nothing in your basket</p>
        )}
      </div>
    </main>
  );
}

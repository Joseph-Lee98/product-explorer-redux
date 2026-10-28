import { Link } from "react-router";
import "./ProductCard.css";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  addToBasket,
} from "../../features/basket/basketSlice";

export default function ProductCard({ id, title, price, thumbnail }) {
  const basket = useSelector((state) => state.basket);
  const dispatch = useDispatch();
  const isInBasket = basket.some((item) => item.id === id);
  const index = basket.findIndex((item) => item.id === id);

  return (
    <article className="product-card">
      <div className="product-card-image-container">
        <img className="product-card-image" src={thumbnail} alt={title} />
      </div>

      <div className="product-card-content">
        <h2 className="product-card-title">{title}</h2>

        <p className="product-card-price">${price.toFixed(2)}</p>

        <div className="product-card-actions">
          {isInBasket ? (
            <div className="product-card-basket-controls">
              <p className="product-card-added-message">
                <span aria-hidden="true">✓</span>
                Added to Basket
              </p>

              <div className="product-card-quantity-controls">
                <button
                  type="button"
                  className="product-card-quantity-button"
                  aria-label="Decrease quantity"
                  onClick={() => dispatch(decreaseQuantity(id))}
                >
                  −
                </button>

                <span className="product-card-quantity">
                  {basket[index].quantity}
                </span>

                <button
                  type="button"
                  className="product-card-quantity-button"
                  aria-label="Increase quantity"
                  onClick={() => dispatch(increaseQuantity(id))}
                >
                  +
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="product-card-basket-button"
              onClick={()=>(dispatch(addToBasket({
                id,
                quantity: 1,
                title,
                price,
                thumbnail,
              })))}
            >
              Add to Basket
            </button>
          )}

          <Link to={`/products/${id}`} className="product-card-details-button">
            View Product
          </Link>
        </div>
      </div>
    </article>
  );
}

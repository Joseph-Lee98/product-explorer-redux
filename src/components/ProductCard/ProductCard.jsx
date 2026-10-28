import { Link } from "react-router";
import "./ProductCard.css";
import { useBasket } from "../../context/BasketContext";

export default function ProductCard({ id, title, price, thumbnail }) {
  const { basket, setBasket } = useBasket();
  const isInBasket = basket.some((item) => item.id === id);
  const addToBasketHandler = () => {
    setBasket([
      ...basket,
      {
        id,
        quantity: 1,
        title,
        price,
        thumbnail,
      },
    ]);
  };
  const index = basket.findIndex((item) => item.id === id);
  const increaseQuantityHandler = () => {
    setBasket(
      basket.map((item) => {
        if (item.id === id) return { ...item, quantity: item.quantity + 1 };
        return item;
      }),
    );
  };
  const decreaseQuantityHandler = () => {
    setBasket((prevBasket) =>
      prevBasket
        .map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity >= 1),
    );
  };
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
                  onClick={decreaseQuantityHandler}
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
                  onClick={increaseQuantityHandler}
                >
                  +
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="product-card-basket-button"
              onClick={addToBasketHandler}
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

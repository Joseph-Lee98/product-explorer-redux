import "./Header.css";
import react from "react";
import { Link } from "react-router";

export default function Header() {
  return (
    <header className="header">
      <nav className="header-nav">
        <h2 className="header-title">Product Explorer</h2>

        <ul className="header-links">
          <li>
            <Link className="header-link" to="/products">
              Products
            </Link>
          </li>
          <li>
            <Link className="header-link" to="/basket">
              Basket
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

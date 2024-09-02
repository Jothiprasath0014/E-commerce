import { Link } from "react-router-dom";
import Search from "./search";
import { TiShoppingCart } from "react-icons/ti";
import "../styles/Header.css";

export default function Header({ cartItems, animateCart }) {
  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to={"/"}>
            <img width="100px" src="./images/logo.jpg" alt="Logo" />
            <p>Aurora cart</p>
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to={"/cart"}>
          <span
            id="cart"
            className={`ml-2 ${animateCart ? "cart-animate" : ""}`}
          >
            <TiShoppingCart />
          </span>
          <span className="ml-1" id="cart_count">
            {cartItems.length}
          </span>
        </Link>
      </div>
    </nav>
  );
}

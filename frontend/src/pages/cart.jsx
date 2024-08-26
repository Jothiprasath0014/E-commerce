import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PaymentModal from "../components/paymentModel";

export default function Cart({ cartItems, setCartItems }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Increasing, Decreasing and removing Quantity

  function increaseQuantity(item) {
    if (item.product.stock === item.qty) return;
    const updatedItems = cartItems.map((i) =>
      i.product.id === item.product.id ? { ...i, qty: i.qty + 1 } : i
    );
    setCartItems(updatedItems);
  }

  function decreaseQuantity(item) {
    if (item.qty > 1) {
      const updatedItems = cartItems.map((i) =>
        i.product.id === item.product.id ? { ...i, qty: i.qty - 1 } : i
      );
      setCartItems(updatedItems);
    }
  }

  function removeItem(item) {
    const updatedItems = cartItems.filter(
      (i) => i.product.id !== item.product.id
    );
    setCartItems(updatedItems);
  }

  function handlePaymentMethodSelection(paymentMethod) {
    toast.success(`Payment method selected: ${paymentMethod}`);
    navigate("/confirmation"); // Navigate to confirmation page
  }

  return cartItems.length > 0 ? (
    <Fragment>
      <div className="container container-fluid">
        <h2 className="mt-5">
          Your Cart: <b>{cartItems.length} items</b>
        </h2>

        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            {cartItems.map((item) => (
              <Fragment key={item.product.id}>
                <hr />
                <div className="cart-item">
                  <div className="row">
                    <div className="col-4 col-lg-3">
                      <img
                        src={item.product.images[0].image}
                        alt={item.product.name}
                        height="90"
                        width="115"
                      />
                    </div>

                    <div className="col-5 col-lg-3">
                      <Link to={`products/${item.product.id}`}>
                        {item.product.name}
                      </Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">${item.product.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div className="stockCounter d-inline">
                        <span
                          onClick={() => decreaseQuantity(item)}
                          className="btn btn-danger minus"
                        >
                          -
                        </span>
                        <input
                          type="number"
                          className="form-control count d-inline"
                          value={item.qty}
                          readOnly
                        />
                        <span
                          onClick={() => increaseQuantity(item)}
                          className="btn btn-primary plus"
                        >
                          +
                        </span>
                      </div>
                    </div>

                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                      <i
                        onClick={() => removeItem(item)}
                        id="delete_cart_item"
                        className="fa fa-trash btn btn-danger"
                      ></i>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:{" "}
                <span className="order-summary-values">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)} (Units)
                </span>
              </p>
              <p>
                Est. total:{" "}
                <span className="order-summary-values">
                  $
                  {Number(
                    cartItems.reduce(
                      (acc, item) => acc + item.product.price * item.qty,
                      0
                    )
                  ).toFixed(2)}
                </span>
              </p>

              <hr />
              <button
                id="checkout_btn"
                onClick={() => setIsModalOpen(true)}
                className="btn btn-primary btn-block"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handlePaymentMethodSelection}
      />
    </Fragment>
  ) : (
    <h2 className="mt-5">Your Cart is Empty !</h2>
  );
}

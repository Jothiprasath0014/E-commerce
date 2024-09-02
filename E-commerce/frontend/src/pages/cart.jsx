import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PaymentModal from "../components/paymentModel";

export default function Cart({ cartItems, setCartItems }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shippingDetails, setShippingDetails] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const navigate = useNavigate();

  const amount = cartItems.reduce(
    (acc, item) => acc + (item.product.price * item.qty || 0),
    0
  );

  // Handling Quantity Updates
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

  // Payment Method Selection
  async function handlePaymentMethodSelection(paymentMethod) {
    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }
    toast.success(`Payment method selected: ${paymentMethod}`);
    setSelectedPaymentMethod(paymentMethod);
  
    const cardDetails =
      paymentMethod === "Credit Card" || paymentMethod === "Debit Card"
        ? {
            // Populate with card details
          }
        : null;
  
    // Ensure shippingDetails is set
    if (!shippingDetails) {
      toast.error("Shipping details are required!");
      return;
    }
  
    if (!cartItems?.length) {
      toast.error("Cart is empty or invalid.");
      return;
    }
  
    const orderDetails = {
      cartItems: [...cartItems], // Ensure cartItems is defined
      paymentMethod: selectedPaymentMethod,
      amount: amount,
      cardDetails,
      shippingDetails,
    };
  
    console.log("Order Details Payload:", orderDetails); // Log the payload
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL1}/order`, {
        method: "POST",
        body: JSON.stringify(orderDetails),
        headers: { "Content-Type": "application/json" },
      });
      
      const result = await response.json();
  
      if (response.ok) {
        const generatedOrderId = result.order.id;
        navigate("/confirmation", { state: { orderId: generatedOrderId } });
      } else {
        toast.error("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("There was an error processing your order.");
    }
  }

  // Set Shipping Details
  function handleShippingDetails(shippingInfo) {
    setShippingDetails(shippingInfo);
  }

  // const shippingInfo = setShippingDetails(shippingInfo);

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
                  {cartItems.reduce((acc, item) => acc + (item.qty || 0), 0)}{" "}
                  (Units)
                </span>
              </p>
              <p>
                Est. total:{" "}
                <span className="order-summary-values">
                  $
                  {Number(
                    cartItems.reduce(
                      (acc, item) => acc + (item.product.price * item.qty || 0),
                      0
                    )
                  ).toFixed(2)}
                </span>
              </p>

              <hr />
              <button
                id="checkout_btn"
                onClick={() => {
                  setIsModalOpen(true);
                  navigate({ state: { cartItems } });
                }}
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
        onShippingDetailsSubmitted={handleShippingDetails}
        selectedPaymentMethod={selectedPaymentMethod}
        cartItems={cartItems}
        amount={amount} 
      />
    </Fragment>
  ) : (
    <h2 className="mt-5">Your Cart is Empty !</h2>
  );
}

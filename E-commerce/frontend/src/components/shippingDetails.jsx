import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/shippingDetail.css";

export default function ShippingDetails({ cartItems, amount }) {

  const location = useLocation();
  const navigate = useNavigate();

  const receivedCartItems = location.state?.cartItems || cartItems;
  const receivedAmount = location.state?.amount || amount;

  console.log("Received cartItems:", receivedCartItems);
  console.log("Received amount:", receivedAmount);

  const [shippingDetails, setShippingDetails] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
  });

  function handleChange(e) {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const orderData = {
      cartItems: receivedCartItems,
      amount: receivedAmount,
      paymentMethod: location.state.paymentMethod,
      cardDetails: location.state.cardDetails || null,
      shippingDetails,
    };

    console.log("Order Data for Shipping Details:", orderData); // Debug log

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL1}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Order placed successfully!");
        navigate("/confirmation", { state: { orderId: result.orderId } });
      } else {
        toast.error("Failed to place order!");
      }
    } catch (error) {
      toast.error("Error processing your order!");
    }
  }

  return (
    <div>
      <h2>Enter Shipping Details</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={shippingDetails.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={shippingDetails.city}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Postal Code:</label>
        <input
          type="text"
          name="postalCode"
          value={shippingDetails.postalCode}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Country:</label>
        <input
          type="text"
          name="country"
          value={shippingDetails.country}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={shippingDetails.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit Shipping Details</button>
    </form>
    </div>
  );
}

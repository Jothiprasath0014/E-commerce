import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/cardDetail.css";

export default function CardDetails() {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  function handleChange(e) {
    setCardDetails({
      ...cardDetails, [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/shipping-details", {
      state: { paymentMethod: location.state.paymentMethod, cardDetails },
    });
  }

  return (
    <div>
      <h2>Enter Card Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="cardName"
          placeholder="Name on Card"
          value={cardDetails.cardName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={cardDetails.cardNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="expiryDate"
          placeholder="Expiry Date (MM/YY)"
          value={cardDetails.expiryDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          value={cardDetails.cvv}
          onChange={handleChange}
          required
        />
        <button type="submit">Continue to Shipping</button>
      </form>
    </div>
  );
}

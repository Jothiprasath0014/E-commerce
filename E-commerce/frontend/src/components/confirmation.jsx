import React from "react";
import "../styles/ConfirmationPage.css";

export default function ConfirmationPage() {
  return (
    <div className="confirmation-container">
      <div className="checkmark-container">
        <svg
          className="checkmark-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <path
            className="checkmark-path"
            d="M14 27l7 7 17-17"
          />
        </svg>
      </div>
      <h2>Order Confirmation</h2>
      <p>Your order has been placed successfully!</p>
    </div>
  );
}

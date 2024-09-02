import React, { useState } from "react";
import PaymentModal from "./paymentModel";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Payment() {
  const [isModelOpen, setModelOpen] = useState(true);
  const navigate = useNavigate();

  function handlePaymentSelection(method) {
    setModelOpen(false);

    if (method === "Credit Card" || method === "Debit Card") {
      navigate("/card-details", { state: { paymentMethod: method, cartItems } });
    } else {
      navigate("/shipping-details", { state: { paymentMethod: method, cartItems } });
    }
  }

  function handleCloseModal() {
    setModelOpen(false);
    toast.info("Payment method selection canceled.");
  }

  return (
    <div>
      <PaymentModal
        isOpen={isModelOpen}
        onClose={handleCloseModal}
        onSelect={handlePaymentSelection}
        cartItems={cartItems} 
      />
    </div>
  );
}

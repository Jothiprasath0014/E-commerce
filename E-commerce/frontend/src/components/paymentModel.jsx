
import { useNavigate } from "react-router-dom";
import '../styles/PaymentPopup.css';


export default function PaymentModal({ isOpen, onClose, onSelect, cartItems, amount }) {
  const navigate = useNavigate();

  function handlePaymentSelection(method) {
    onSelect(method);
    onClose();

    // Navigate to the appropriate page based on the payment method
    if (method === "Credit Card" || method === "Debit Card") {
      navigate("/card-details", { state: { paymentMethod: method, cartItems, amount } });
    } else {
      navigate("/shipping-details", { state: { paymentMethod: method, cartItems, amount } });
    }
  }

  if (!isOpen) return null; // Return null if the modal is not open

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Select Payment Method</h2>
        <button className="modal-close" onClick={onClose}>X</button>
        <div className="modal-content">
          <button className="modal-button" onClick={() => handlePaymentSelection('UPI')}>UPI</button>
          <button className="modal-button" onClick={() => handlePaymentSelection('Credit Card')}>Credit Card</button>
          <button className="modal-button" onClick={() => handlePaymentSelection('Debit Card')}>Debit Card</button>
          <button className="modal-button" onClick={() => handlePaymentSelection('Cash on Delivery')}>Cash on Delivery</button>
        </div>
      </div>
    </div>
  );
}

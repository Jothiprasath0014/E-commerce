import React from 'react';
import '../styles/PaymentPopup.css';

export default function PaymentModal({ isOpen, onClose, onSelect }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Select Payment Method</h2>
        <button className="modal-close" onClick={onClose}>X</button>
        {/* payment Gateways */}
        <div className="modal-content">
          <button className="modal-button" onClick={() => onSelect('UPI')}>UPI</button>
          <button className="modal-button" onClick={() => onSelect('Credit Card')}>Credit Card</button>
          <button className="modal-button" onClick={() => onSelect('Debit Card')}>Debit Card</button>
          <button className="modal-button" onClick={() => onSelect('Cash on Delivery')}>Cash on Delivery</button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import type { Product } from "../types";
import "./Cart.css";

interface CartProps {
  cartItems: Product[];
  onRemove: (id: number) => void;
  total: number;
  onClear: () => void;
  onPurchase: () => void; // ✅ new prop
}

const Cart: React.FC<CartProps> = ({ cartItems, onRemove, total, onClear, onPurchase }) => {
  const handlePurchase = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add some perfumes first!");
      return;
    }

    const confirmPurchase = window.confirm(
      `Confirm purchase of ${cartItems.length} perfume${cartItems.length > 1 ? "s" : ""} for ₱${total.toLocaleString()}?`
    );

    if (confirmPurchase) {
      onPurchase(); // ✅ triggers stock update + clear cart
    }
  };

  return (
    <div className="cart-container">
      <h2>🛍️ Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Perfume</th>
              <th>Category</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} alt={item.name} className="cart-img" />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>₱{item.price}</td>
                <td>{item.quantity}</td>
                <td>₱{item.price * item.quantity}</td>
                <td>
                  <button className="remove-btn" onClick={() => onRemove(item.id)}>
                    ✖
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="cart-footer">
        <h3 className="cart-total">Total: ₱{total.toLocaleString()}</h3>
        <button className="purchase-btn" onClick={handlePurchase}>
          💳 Purchase
        </button>
      </div>
    </div>
  );
};

export default Cart;

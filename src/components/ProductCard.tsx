import React from "react";
import type { Product } from "../types";
import "./ProductCard.css";

interface Props {
  product: Product;
  onSelect: () => void;
  onQuantityChange: (id: number, delta: number) => void;
}

const ProductCard: React.FC<Props> = ({ product, onSelect, onQuantityChange }) => {
  const subtotal = product.price * product.quantity;
  const lowStock = product.quantity < 5;

  return (
    <div className={`card ${lowStock ? "low-stock" : ""}`}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">₱{product.price}</p>
      <p>Qty: {product.quantity}</p>
      <p>Subtotal: ₱{subtotal}</p>
      <div className="buttons">
        <button onClick={() => onQuantityChange(product.id, 1)}>+</button>
        <button onClick={() => onQuantityChange(product.id, -1)}>-</button>
        <button onClick={onSelect}>View Details</button>
      </div>
    </div>
  );
};

export default ProductCard;

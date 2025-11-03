import React from "react";
import type { Product } from "../types";
import "./ProductCard.css";

interface Props {
  product: Product;
  onSelect: () => void;
  onQuantityChange: (id: number, delta: number) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onSelect, onQuantityChange, onAddToCart }) => {
  const subtotal = product.price * product.quantity;

  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">₱{product.price}</p>
      <p className="stock">Stock: {product.stock}</p>
      <p>Qty: {product.quantity}</p>
      <p>Subtotal: ₱{subtotal}</p>
      <div className="buttons">
        <button onClick={() => onQuantityChange(product.id, 1)} disabled={product.quantity >= product.stock}>+</button>
        <button onClick={() => onQuantityChange(product.id, -1)} disabled={product.quantity <= 0}>-</button>
        <button className="add-cart" onClick={() => onAddToCart(product)} disabled={product.quantity === 0}>Add to Cart</button>
        <button onClick={onSelect}>View Details</button>
      </div>
    </div>
  );
};

export default ProductCard;

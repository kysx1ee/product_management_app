import React from "react";
import type { Product } from "../types";
import "./ProductDetail.css";

interface Props {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<Props> = ({ product, onBack }) => {
  return (
    <div className="detail-container">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p><b>Category:</b> {product.category}</p>
      <p><b>Description:</b> {product.description}</p>
      <p><b>Specification:</b> {product.specification}</p>
      <p><b>Rating:</b> ⭐ {product.rating}</p>
      <p><b>Price:</b> ₱{product.price}</p>
      <p><b>Quantity Selected:</b> {product.quantity}</p>
      <p><b>Stock Available:</b> {product.stock}</p>
    </div>
  );
};

export default ProductDetail;

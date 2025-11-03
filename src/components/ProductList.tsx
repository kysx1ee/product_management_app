import React, { useState } from "react";
import type { Product } from "../types";
import ProductCard from "./ProductCard";
import "./ProductList.css";

interface Props {
  products: Product[];
  onSelect: (product: Product) => void;
  onQuantityChange: (id: number, delta: number) => void;
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<Props> = ({
  products,
  onSelect,
  onQuantityChange,
  onAddToCart,
}) => {
  const [filter, setFilter] = useState<string>("All");
  const filteredProducts =
    filter === "All" ? products : products.filter((p) => p.category === filter);
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>Perfume Collection</h2>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={() => onSelect(product)}
            onQuantityChange={onQuantityChange}
            onAddToCart={() => onAddToCart(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;

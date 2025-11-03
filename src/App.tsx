import React, { useState } from "react";
import type { Product } from "./types";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ProductDetail from "./components/ProductDetail";
import "./App.css";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Dior Sauvage",
      category: "Men",
      description: "A fresh, woody aromatic fragrance inspired by wide-open spaces.",
      specification: "100ml Eau de Toilette",
      rating: 4.9,
      price: 6900,
      quantity: 5,
      image: "/images/dior-sauvage.webp",
    },
    {
      id: 2,
      name: "Chanel No. 5",
      category: "Women",
      description: "Classic floral aldehyde perfume for timeless elegance.",
      specification: "100ml Eau de Parfum",
      rating: 4.8,
      price: 8200,
      quantity: 3,
      image: "/images/chanel-no5.jpg",
    },
    {
      id: 3,
      name: "Versace Eros",
      category: "Men",
      description: "Bold, sensual fragrance with mint, vanilla, and tonka bean notes.",
      specification: "100ml Eau de Toilette",
      rating: 4.7,
      price: 5600,
      quantity: 4,
      image: "/images/versace-eros.webp",
    },
    {
      id: 4,
      name: "Gucci Bloom",
      category: "Women",
      description: "Rich floral scent capturing the spirit of a blooming garden.",
      specification: "100ml Eau de Parfum",
      rating: 4.6,
      price: 7200,
      quantity: 6,
      image: "/images/gucci-bloom.jpg",
    },
    {
      id: 5,
      name: "YSL Black Opium",
      category: "Women",
      description: "Modern, addictive perfume with coffee and vanilla notes.",
      specification: "90ml Eau de Parfum",
      rating: 4.9,
      price: 7800,
      quantity: 2,
      image: "/images/ysl-black-opium.jpg",
    },
    {
      id: 6,
      name: "Creed Aventus",
      category: "Men",
      description: "Iconic luxury scent blending pineapple, birch, and musk.",
      specification: "100ml Eau de Parfum",
      rating: 4.9,
      price: 15000,
      quantity: 1,
      image: "/images/creed-aventus.webp",
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addProduct = (newProduct: Product) => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
  };

  const handleQuantityChange = (id: number, delta: number) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(0, p.quantity + delta) } : p
      )
    );
  };

  const total = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div className="app-container">
      <h1>💐 Perfume Management App</h1>
      {selectedProduct ? (
        <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
      ) : (
        <>
          <ProductList
            products={products}
            onSelect={setSelectedProduct}
            onQuantityChange={handleQuantityChange}
          />
          <ProductForm onAdd={addProduct} />
          <h2 className="total">Overall Total: ₱{total.toLocaleString()}</h2>
        </>
      )}
    </div>
  );
};

export default App;

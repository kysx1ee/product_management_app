import React, { useState } from "react";
import type { Product } from "./types";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
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
      quantity: 0,
      stock: 20,
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
      quantity: 0,
      stock: 20,
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
      quantity: 0,
      stock: 20,
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
      quantity: 0,
      stock: 20,
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
      quantity: 0,
      stock: 20,
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
      quantity: 0,
      stock: 20,
      image: "/images/creed-aventus.webp",
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const addProduct = (newProduct: Product) => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setShowForm(false);
  };

  const handleQuantityChange = (id: number, delta: number) => {
    setProducts(
      products.map((p) => {
        if (p.id === id) {
          const newQuantity = p.quantity + delta;
          return { ...p, quantity: Math.max(0, Math.min(newQuantity, p.stock)) };
        }
        return p;
      })
    );
  };

  const handleAddToCart = (product: Product) => {
    if (product.quantity > 0) {
      const existing = cart.find((item) => item.id === product.id);
      if (existing) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          )
        );
      } else {
        setCart([...cart, { ...product }]);
      }
      // Reduce stock and reset quantity
      setProducts(
        products.map((p) =>
          p.id === product.id
            ? { ...p, stock: p.stock - product.quantity, quantity: 0 }
            : p
        )
      );
    }
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <div className="app-container">
      <header className="topbar">
        <h1>Enchanté Essence</h1>
        <div className="header-buttons">
          <button className="open-btn" onClick={() => setShowForm(true)}>➕ Add Perfume</button>
          <button className="open-btn" onClick={() => setShowCart(true)}>🛒 View Cart ({cart.length})</button>
        </div>
      </header>

      {selectedProduct ? (
        <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
      ) : (
        <ProductList
          products={products}
          onSelect={setSelectedProduct}
          onQuantityChange={handleQuantityChange}
          onAddToCart={handleAddToCart}
        />
      )}

      {showCart && (
        <div className="popup-overlay" onClick={() => setShowCart(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <Cart
              cartItems={cart}
              onRemove={handleRemoveFromCart}
              total={total}
              onClear={handleClearCart}
            />
            <button className="close-btn" onClick={() => setShowCart(false)}>Close</button>
          </div>
        </div>
      )}

      {showForm && (
        <div className="popup-overlay" onClick={() => setShowForm(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <ProductForm onAdd={addProduct} />
            <button className="close-btn" onClick={() => setShowForm(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

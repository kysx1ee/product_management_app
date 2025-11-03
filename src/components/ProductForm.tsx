import React, { useState } from "react";
import type { Product } from "../types";
import "./ProductForm.css";

interface Props {
  onAdd: (product: Product) => void;
}

const ProductForm: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState<Omit<Product, "id" | "quantity">>({
    name: "",
    category: "",
    description: "",
    specification: "",
    rating: 0,
    price: 0,
    stock: 0,
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: ["rating", "price", "stock"].includes(name) ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.description || !form.specification || !form.image || form.rating <= 0 || form.price <= 0 || form.stock <= 0) {
      alert("Please fill in all fields and provide stock greater than 0!");
      return;
    }
    onAdd({ ...form, quantity: 0 });
    setForm({ name: "", category: "", description: "", specification: "", rating: 0, price: 0, stock: 0, image: "" });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Add New Perfume</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="category" placeholder="Category (e.g. Men, Women)" value={form.category} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <textarea name="specification" placeholder="Specification (e.g. 100ml Eau de Parfum)" value={form.specification} onChange={handleChange} />
      <input type="number" name="rating" placeholder="Rating (e.g. 4.8)" value={form.rating || ""} onChange={handleChange} min={0.1} step={0.1} />
      <input type="number" name="price" placeholder="Price (₱)" value={form.price || ""} onChange={handleChange} min={1} />
      <input type="number" name="stock" placeholder="Stock Available" value={form.stock || ""} onChange={handleChange} min={1} />
      <input name="image" placeholder="Image URL (e.g. /images/perfume.jpg)" value={form.image} onChange={handleChange} />
      <button type="submit">Add Perfume</button>
    </form>
  );
};

export default ProductForm;

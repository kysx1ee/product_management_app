import React, { useState } from "react";
import type { Product } from "../types";
import "./ProductForm.css";

interface Props {
  onAdd: (product: Product) => void;
}


const ProductForm: React.FC<Props> = ({ onAdd }) => {

  
  const [form, setForm] = useState<Omit<Product, "id">>({
    name: "",
    category: "",
    description: "",
    specification: "",
    rating: 0,
    price: 0,
    quantity: 0,
    image: "",
  });

 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: ["rating", "price", "quantity"].includes(name)
        ? Number(value)
        : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(form).some((val) => val === "" || val === 0)) {
      alert("Please fill in all fields!");
      return;
    }
    onAdd(form as Product);
    setForm({
      name: "",
      category: "",
      description: "",
      specification: "",
      rating: 0,
      price: 0,
      quantity: 0,
      image: "",
    });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Add New Perfume</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <textarea name="specification" placeholder="Specification" value={form.specification} onChange={handleChange} />
      <input type="number" name="rating" placeholder="Rating" value={form.rating} onChange={handleChange} />
      <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} />
      <input type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} />
      <input name="image" placeholder="Image URL (e.g. /images/perfume.jpg)" value={form.image} onChange={handleChange} />
      <button type="submit">Add Perfume</button>
    </form>
  );
};

export default ProductForm;

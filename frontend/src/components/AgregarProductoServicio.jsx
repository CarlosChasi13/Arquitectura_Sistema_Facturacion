"use client";
import { useState } from "react";

export default function AgregarProductoServicio({ onAdd, onCancel }) {
  const [form, setForm] = useState({
    descripcion: "",
    tipo: "Producto",
    precio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.descripcion || !form.precio) {
      alert("Por favor complete los campos requeridos");
      return;
    }
    onAdd({ ...form, precio: parseFloat(form.precio), id: Date.now() });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-lg mx-auto bg-white rounded shadow text-gray-900 space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">Agregar Producto o Servicio</h2>

      <input
        type="text"
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        required
      />

      <select
        name="tipo"
        value={form.tipo}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      >
        <option value="Producto">Producto</option>
        <option value="Servicio">Servicio</option>
      </select>

      <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={form.precio}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        required
        min="0"
        step="0.01"
      />

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Agregar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

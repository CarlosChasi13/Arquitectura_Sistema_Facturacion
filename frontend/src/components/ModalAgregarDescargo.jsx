"use client";

import { useState } from "react";

export default function ModalAgregarDescargo({ onGuardarLinea, onCancelar }) {
  const [form, setForm] = useState({
    descripcion: "",
    tipo: "Producto",
    precio: "",
    cantidad: 1,
    estado: "Descargado",
  });
  const [productos, setProductos] = useState([]);
  const [servicios, setServicios] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const agregarItem = () => {
    if (!form.descripcion || !form.precio) {
      alert("Por favor completa los campos.");
      return;
    }

    const nuevoItem = {
      id: Date.now(),
      tipo: form.tipo,
      descripcion: form.descripcion,
      precio_unitario: parseFloat(form.precio),
      cantidad: form.tipo === "Producto" ? parseInt(form.cantidad) || 1 : 1,
      precio_total:
        form.tipo === "Producto"
          ? parseFloat(form.precio) * (parseInt(form.cantidad) || 1)
          : parseFloat(form.precio),
      estado: "Descargado",
    };

    if (form.tipo === "Producto") {
      setProductos([...productos, nuevoItem]);
    } else {
      setServicios([...servicios, nuevoItem]);
    }

    setForm({ descripcion: "", tipo: "Producto", precio: "", cantidad: 1 });
  };

  const eliminarItem = (id, tipo) => {
    if (tipo === "Producto") {
      setProductos(productos.filter((p) => p.id !== id));
    } else {
      setServicios(servicios.filter((s) => s.id !== id));
    }
  };

  const guardarLineaDescargo = () => {
    if (productos.length === 0 && servicios.length === 0) {
      alert("Debes agregar al menos un producto o servicio.");
      return;
    }

    const total =
      productos.reduce((sum, p) => sum + p.precio_total, 0) +
      servicios.reduce((sum, s) => sum + s.precio_total, 0);

    onGuardarLinea({
      linea_id: Date.now(),
      productos,
      servicios,
      precio_total_linea: total,
    });
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-xl w-full space-y-4 text-gray-900">
        <h2 className="text-2xl font-bold">Nueva Línea de Descargo</h2>

        <div className="flex gap-4">
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={handleChange}
            className="flex-1 border px-4 py-2 rounded"
          />
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
          >
            <option value="Producto">Producto</option>
            <option value="Servicio">Servicio</option>
          </select>
        </div>

        {form.tipo === "Producto" && (
          <input
            type="number"
            name="cantidad"
            value={form.cantidad}
            onChange={handleChange}
            placeholder="Cantidad"
            className="w-full border px-4 py-2 rounded"
            min="1"
          />
        )}

        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          min="0"
          step="0.01"
        />

        <button
          type="button"
          onClick={agregarItem}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Agregar a la Línea
        </button>

        <div>
          <h3 className="font-semibold mt-4">Productos</h3>
          {productos.length === 0 && (
            <p className="text-sm text-gray-500">Ninguno agregado</p>
          )}
          {productos.map((p) => (
            <div key={p.id} className="flex justify-between text-sm py-1">
              <span>
                {p.descripcion} x{p.cantidad}
              </span>
              <span>${p.precio_total.toFixed(2)}</span>
              <button
                onClick={() => eliminarItem(p.id, "Producto")}
                className="text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-semibold mt-4">Servicios</h3>
          {servicios.length === 0 && (
            <p className="text-sm text-gray-500">Ninguno agregado</p>
          )}
          {servicios.map((s) => (
            <div key={s.id} className="flex justify-between text-sm py-1">
              <span>{s.descripcion}</span>
              <span>${s.precio_total.toFixed(2)}</span>
              <button
                onClick={() => eliminarItem(s.id, "Servicio")}
                className="text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-6">
          <button
            className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
            onClick={onCancelar}
          >
            Cancelar
          </button>
          <button
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            onClick={guardarLineaDescargo}
          >
            Guardar Línea de Descargo
          </button>
        </div>
      </div>
    </div>
  );
}

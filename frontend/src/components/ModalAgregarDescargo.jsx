"use client";

import { useState, useEffect } from "react";
import { obtenerProductos, obtenerServicios } from "@/services/productoService";
import { toast } from "react-toastify";

export default function ModalAgregarDescargo({ onGuardarLinea, onCancelar }) {
  const [form, setForm] = useState({
    tipo: "Producto",
    descripcion: "",
    precio: "",
    cantidad: 1,
    estado: "Descargado",
  });

  const [opciones, setOpciones] = useState([]);
  const [productosAgregados, setProductosAgregados] = useState([]);
  const [serviciosAgregados, setServiciosAgregados] = useState([]);
  const [idSeleccionado, setIdSeleccionado] = useState("");

  // Cargar productos o servicios al cambiar el tipo
useEffect(() => {
  async function cargarOpciones() {
    const res =
      form.tipo === "Producto"
        ? await obtenerProductos()
        : await obtenerServicios();

    if (res.success) {
      setOpciones(res.data);
      console.log("Respuesta recibida", res);
    } else {
      toast.error(res.message || "Error al cargar opciones");
      setOpciones([]);
    }

    // Reiniciar selección y campos al cambiar tipo
    setIdSeleccionado("");
    setForm((prev) => ({
      ...prev,
      descripcion: "",
      precio: "",
      cantidad: form.tipo === "Producto" ? 1 : 1, 
    }));
  }

  cargarOpciones();
}, [form.tipo]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSeleccion = (e) => {
    const idSeleccionado = parseInt(e.target.value);
    const seleccionado = opciones.find((item) => item.id === idSeleccionado);

    if (seleccionado) {
      setForm((prev) => ({
        ...prev,
        descripcion: seleccionado.nombre,
        precio:
          form.tipo === "Producto"
            ? seleccionado.precio_unitario
            : seleccionado.precio_base,
      }));
    }
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
      setProductosAgregados((prev) => [...prev, nuevoItem]);
    } else {
      setServiciosAgregados((prev) => [...prev, nuevoItem]);
    }

    setForm({
      tipo: "Producto",
      descripcion: "",
      precio: "",
      cantidad: 1,
      estado: "Descargado",
    });
  };

  const eliminarItem = (id, tipo) => {
    if (tipo === "Producto") {
      setProductosAgregados((prev) => prev.filter((p) => p.id !== id));
    } else {
      setServiciosAgregados((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const guardarLineaDescargo = () => {
    if (productosAgregados.length === 0 && serviciosAgregados.length === 0) {
      alert("Debes agregar al menos un producto o servicio.");
      return;
    }

    const total =
      productosAgregados.reduce((sum, p) => sum + p.precio_total, 0) +
      serviciosAgregados.reduce((sum, s) => sum + s.precio_total, 0);

    onGuardarLinea({
      linea_id: Date.now(),
      productos: productosAgregados,
      servicios: serviciosAgregados,
      precio_total_linea: total,
    });
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-xl w-full space-y-4 text-gray-900">
        <h2 className="text-2xl font-bold">Nueva Línea de Descargo</h2>

        <div className="flex gap-4">
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-1/2"
          >
            <option value="Producto">Producto</option>
            <option value="Servicio">Servicio</option>
          </select>

          <select
            name="descripcion"
            value={idSeleccionado}
            onChange={(e) => {
              const id = e.target.value;
              setIdSeleccionado(id); // actualiza el valor del select
              const seleccionado = opciones.find(
                (item) => item.id === parseInt(id)
              );

              if (seleccionado) {
                setForm((prev) => ({
                  ...prev,
                  descripcion: seleccionado.nombre || seleccionado.descripcion,
                  precio:
                    form.tipo === "Producto"
                      ? seleccionado.precio_unitario
                      : seleccionado.precio_base,
                }));
              }
            }}
            className="border px-4 py-2 rounded w-1/2"
          >
            <option value="">Seleccionar {form.tipo}</option>
            {opciones.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nombre || item.descripcion}
              </option>
            ))}
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
          {productosAgregados.length === 0 && (
            <p className="text-sm text-gray-500">Ninguno agregado</p>
          )}
          {productosAgregados.map((p) => (
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
          {serviciosAgregados.length === 0 && (
            <p className="text-sm text-gray-500">Ninguno agregado</p>
          )}
          {serviciosAgregados.map((s) => (
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

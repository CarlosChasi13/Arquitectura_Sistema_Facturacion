"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { obtenerUltimaFactura } from "@/services/facturaService";

export default function VerFactura({ id }) {
  const router = useRouter();
  const [factura, setFactura] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFactura() {
      const res = await obtenerUltimaFactura(id);
      if (res.success && res.data) {
        setFactura(res.data);
      } else {
        setError(res.message || "No se pudo cargar la factura.");
      }
      setCargando(false);
    }

    fetchFactura();
  }, [id]);

  if (cargando) return <div className="p-6">Cargando factura...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!factura) return null;

  const total = factura.items?.reduce(
    (acc, item) => acc + item.cantidad * item.precio,
    0
  );

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center p-6">
      <button
        onClick={() => router.push("/pacientes")}
        className="self-start mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
      >
        ← Volver
      </button>

      <div className="max-w-4xl w-full rounded shadow text-gray-900">
        <h2 className="text-2xl font-bold mb-4">Factura del Paciente {id}</h2>

        <p><strong>Nro SRI:</strong> {factura.nro_sri}</p>
        <p><strong>Fecha:</strong> {factura.fecha}</p>
        <p><strong>Cliente:</strong> {factura.cliente}</p>

        <table className="w-full border text-left mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Descripción</th>
              <th className="border p-2">Cantidad</th>
              <th className="border p-2">Precio Unitario</th>
              <th className="border p-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {factura.items?.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border p-2">{item.descripcion}</td>
                <td className="border p-2">{item.cantidad}</td>
                <td className="border p-2">${item.precio.toFixed(2)}</td>
                <td className="border p-2">${(item.cantidad * item.precio).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="text-right text-xl font-bold mt-4">
          Total: ${total.toFixed(2)}
        </h3>
      </div>
    </div>
  );
}

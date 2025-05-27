"use client";
import { useRouter } from "next/navigation";

export default function VerFactura({ id }) {
  const router = useRouter();

  const factura = {
    nro_sri: "001-002-000000123",
    fecha: "2025-05-22",
    cliente: "Juan Pérez",
    items: [
      { id: 1, descripcion: "Atención Médica", cantidad: 1, precio: 100 },
      { id: 2, descripcion: "Medicamento ABC", cantidad: 2, precio: 20 },
    ],
    total: 140,
  };

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
            {factura.items.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border p-2">{item.descripcion}</td>
                <td className="border p-2">{item.cantidad}</td>
                <td className="border p-2">${item.precio.toFixed(2)}</td>
                <td className="border p-2">${(item.cantidad * item.precio).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="text-right text-xl font-bold mt-4">Total: ${factura.total.toFixed(2)}</h3>
      </div>
    </div>
  );
}

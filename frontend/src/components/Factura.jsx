"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function VerFactura() {
  const { id } = useParams();  // paciente_id
  const router = useRouter();
  const [factura, setFactura] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/pacientes/${id}/factura`)
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json();
      })
      .then(setFactura)
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!factura) return <div className="p-4">Cargando factura…</div>;

  return (
    <div className="…">
      <button onClick={() => router.back()} className="…">← Volver</button>
      <h2>Factura del Paciente {id}</h2>
      <p><strong>Nro SRI:</strong> {factura.nro_sri}</p>
      <p><strong>Fecha:</strong> {factura.fecha}</p>
      <p><strong>Cliente:</strong> {factura.cliente}</p>
      <table className="…">
        <thead>…</thead>
        <tbody>
          {factura.items.map((item) => (
            <tr key={item.id}>
              <td>{item.descripcion}</td>
              <td>{item.cantidad}</td>
              <td>${item.precio.toFixed(2)}</td>
              <td>${(item.cantidad * item.precio).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total: ${factura.total.toFixed(2)}</h3>
    </div>
  );
}

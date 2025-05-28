"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ListaPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/pacientes/")
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(setPacientes)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f9fafb] p-4">
      <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">
          Lista de Pacientes
        </h2>

        <div className="flex justify-center mb-6">
          <Link
            href="/pacientes/ingresar"
            className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
          >
            Agregar Paciente
          </Link>
        </div>

        <table className="w-full border text-left text-gray-900">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Nombres</th>
              <th className="border p-2">Apellidos</th>
              <th className="border p-2">Cédula</th>
              <th className="border p-2">Estado</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="border p-2">{p.nombres}</td>
                <td className="border p-2">{p.apellidos}</td>
                <td className="border p-2">{p.cedula}</td>
                <td className="border p-2">{p.estado}</td>
                <td className="border p-2">
                  {p.estado === "Alta" ? (
                    <Link
                      href={`/pacientes/${p.id}/factura`}
                      className="text-blue-600 hover:underline"
                    >
                      Ver Factura
                    </Link>
                  ) : (
                    <Link
                      href={`/pacientes/${p.id}/descargos`}
                      className="text-green-600 hover:underline"
                    >
                      Gestionar Descargos
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

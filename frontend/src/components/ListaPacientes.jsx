"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { obtenerPacientes } from "@/services/pacienteService";

export default function ListaPacientes() {
  const [pacientes, setPacientes] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargar() {
      try {
        const res = await obtenerPacientes();
        if (res.success) {
          setPacientes(Array.isArray(res.data) ? res.data : []);
        } else {
          setError(res.message || "Error al cargar pacientes");
          setPacientes([]);
        }
      } catch (e) {
        setError(e.message || "Error desconocido");
        setPacientes([]);
      }
    }
    cargar();
  }, []);

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (pacientes === null) {
    return <p className="text-center text-gray-700">Cargando pacientes...</p>;
  }

  if (pacientes.length === 0) {
    return (
      <div className="text-center text-gray-700">
        <p>No hay pacientes registrados.</p>
        <Link
          href="/pacientes/ingresar"
          className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          Agregar Paciente
        </Link>
      </div>
    );
  }

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

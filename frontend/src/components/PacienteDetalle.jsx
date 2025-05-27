"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function PacienteDetalle({ params }) {
  const { id } = params;
  // Simulamos datos (en real, fetch desde API)
  const paciente = {
    id,
    nombres: "Paciente Ejemplo",
    apellidos: "Apellido Ejemplo",
    cedula: "0123456789",
    estado: id === "2" ? "Alta" : "Internado",
  };

  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Paciente: {paciente.nombres} {paciente.apellidos}</h1>
      <p><strong>Cédula:</strong> {paciente.cedula}</p>
      <p><strong>Estado:</strong> {paciente.estado}</p>

      <div className="mt-6 space-x-4">
        {paciente.estado === "Alta" ? (
          <Link
            href={`/pacientes/${paciente.id}/factura`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Ver Factura
          </Link>
        ) : (
          <Link
            href={`/pacientes/${paciente.id}/descargos`}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Gestionar Descargos
          </Link>
        )}
      </div>
    </div>
  );
}

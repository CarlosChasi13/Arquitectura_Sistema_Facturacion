"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function PacienteDetalle({ params }) {
  const { id } = params;
  const router = useRouter();
  const [paciente, setPaciente] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/pacientes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(setPaciente)
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!paciente) return <div className="p-4">Cargando...</div>;

  return (
    <div className="…">
      <h1>Paciente: {paciente.nombres} {paciente.apellidos}</h1>
      <p><strong>Cédula:</strong> {paciente.cedula}</p>
      <p><strong>Estado:</strong> {paciente.estado}</p>
      <div>
        {paciente.estado === "Alta" ? (
          <Link href={`/pacientes/${id}/factura`} className="…">
            Ver Factura
          </Link>
        ) : (
          <Link href={`/pacientes/${id}/descargos`} className="…">
            Gestionar Descargos
          </Link>
        )}
        <button onClick={() => router.back()} className="…">← Volver</button>
      </div>
    </div>
  );
}

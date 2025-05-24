"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow px-4 py-20 gap-12 bg-[#f9fafb] rounded-lg shadow-sm min-h-screen w-full">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Sistema de Gestión Hospitalaria
      </h1>
      <p className="text-lg text-center max-w-xl text-gray-600">
        Bienvenido al sistema. Selecciona una opción para continuar.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 w-full max-w-md">
        <Link
          href="/pacientes/ingresar"
          className="bg-blue-600 text-white px-6 py-4 rounded-xl shadow-md hover:bg-blue-700 transition text-center"
        >
          Ingresar Paciente
        </Link>
        <Link
          href="/pacientes"
          className="bg-white text-gray-800 px-6 py-4 rounded-xl border border-gray-300 shadow-md hover:bg-gray-100 transition text-center"
        >
          Ver Pacientes
        </Link>
      </div>
    </div>
  );
}

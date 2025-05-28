"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormularioPaciente() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    cedula: "",
    fecha_nac: "",
    telefono: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const payload = { ...formData, estado: "Internado" };
      const res = await fetch("/api/pacientes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || res.statusText);
      }
      router.push("/pacientes");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f4f7] p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md space-y-5 text-gray-800"
      >
        {error && <p className="text-red-600">{error}</p>}

        <h2 className="text-3xl font-bold text-center mb-6">Ingresar Paciente</h2>

        <input
          type="text"
          name="nombres"
          placeholder="Nombres"
          value={formData.nombres}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          name="apellidos"
          placeholder="Apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          name="cedula"
          placeholder="Cédula"
          value={formData.cedula}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="date"
          name="fecha_nac"
          value={formData.fecha_nac}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Guardar Paciente
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

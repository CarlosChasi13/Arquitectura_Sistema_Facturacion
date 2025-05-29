"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { crearPaciente } from "@/services/pacienteService";
import { toast } from "react-toastify";

export default function FormularioPaciente() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    cedula: "",
    fechaNac: "",
    telefono: "",
    estado: "BUENO",  
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await crearPaciente(formData);
      
      if (res.success) {
        toast.success("Paciente creado exitosamente");
        router.push("/pacientes");
      } else {
        setError(res.message || "Error al crear el paciente");
      }
    } catch (err) {
      setError(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f2f4f7] p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md space-y-5 text-gray-800"
      >
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
          name="fechaNac"
          value={formData.fechaNac}
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

        {/* Nuevo campo Select para estado */}
        <label className="block font-semibold">Estado</label>
        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        >
          <option value="BUENO">BUENO</option>
          <option value="CRITICO">CRITICO</option>
          <option value="INDETERMINADO">INDETERMINADO</option>
          <option value="MUERTO">MUERTO</option>
          <option value="SERIO">SERIO</option>
          <option value="REGULAR">REGULAR</option>
        </select>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar Paciente"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
        </div>

        {error && <p className="text-red-600 text-center mt-2">{error}</p>}
      </form>
    </div>
  );
}

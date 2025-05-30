"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import LineaDescargo from "./LineaDescargo";
import ModalAgregarDescargo from "./ModalAgregarDescargo";
import {
  obtenerDescargosPorPaciente,
  descargarLineasDescargo,
} from "@/services/descargoService";
import { facturarDescargo } from "@/services/facturaService";
import { toast } from "react-toastify";

export default function DetalleDescargo() {
  const router = useRouter();
  const params = useParams();
  const paciente_id = params?.id;

  const [descargos, setDescargos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  // Para manejar qué línea está expandida, usamos un estado con id compuesto para evitar conflictos
  const [lineaExpandida, setLineaExpandida] = useState(null);

  useEffect(() => {
    async function cargarDescargos() {
      setCargando(true);
      try {
        const res = await obtenerDescargosPorPaciente(paciente_id);
        if (res.success && res.data) {
          // Filtrar descargos que tengan líneas y que NO estén vacías
          const descargosConLineas = res.data.filter(
            (d) => Array.isArray(d.lineas) && d.lineas.length > 0
          );
          if (descargosConLineas.length === 0) {
            setError("No hay descargos con líneas para este paciente.");
          } else {
            setError(null);
          }
          setDescargos(descargosConLineas);
        } else {
          setError("No se encontraron descargos para este paciente.");
          setDescargos([]);
        }
      } catch (err) {
        setError("Error al cargar descargos.");
        setDescargos([]);
      }
      setCargando(false);
    }

    cargarDescargos();
  }, [paciente_id]);

  const toggleLinea = (descargoId, lineaId) => {
    const key = `${descargoId}-${lineaId}`;
    setLineaExpandida(lineaExpandida === key ? null : key);
  };

  const handleDescargarLineas = async (descargoId) => {
    if (!descargoId) {
      toast.error("No se encontró un descargo válido.");
      return;
    }

    try {
      const res = await descargarLineasDescargo(paciente_id, descargoId);
      if (res.success) {
        toast.success("Líneas descargadas correctamente.");
        // Opcional: recargar descargos o actualizar estado
      } else {
        toast.error(res.message || "Error al descargar líneas.");
      }
    } catch (err) {
      console.error("❌ Error al descargar líneas:", err);
      toast.error("Ocurrió un error inesperado.");
    }
  };

  const handleGenerarFactura = async (descargoId) => {
    if (!descargoId) {
      toast.error("No se encontró un descargo válido.");
      return;
    }

    try {
      const res = await facturarDescargo(paciente_id, descargoId);
      if (res.success) {
        toast.success("Factura generada correctamente.");
        router.push(`/pacientes/${paciente_id}/factura`);
      } else {
        toast.error(res.message || "Error al generar la factura.");
      }
    } catch (err) {
      console.error("❌ Error al generar factura:", err);
      toast.error("Ocurrió un error inesperado.");
    }
  };

  if (cargando) return <p className="text-center mt-10">Cargando descargos...</p>;

  if (error)
    return (
      <div className="min-h-screen w-full flex flex-col items-center p-6">
        <h2 className="text-2xl font-bold mb-4">{error}</h2>
        <button
          onClick={() => router.push("/pacientes")}
          className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
        >
          ← Volver
        </button>
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-white text-gray-900 flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-6 max-w-5xl w-full">
        Descargos del Paciente {paciente_id}
      </h2>

      {descargos.length === 0 && (
        <p>No hay descargos con líneas para este paciente.</p>
      )}

      {descargos.map((descargo) => {
        const total = descargo.lineas.reduce(
          (acc, l) => acc + l.cantidad * l.precioUnitario,
          0
        );
console.log(descargos.map(d => d.id));

        return (
          <div
            key={descargo.id}
            className="w-full max-w-5xl mb-8 border border-gray-300 rounded p-4"
          >
            <h3 className="text-xl font-semibold mb-2">
              Descargo #{descargo.descargo_id} - Fecha: {descargo.fecha}
            </h3>

            <table className="w-full border-collapse border border-gray-300 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 p-2">Línea ID</th>
                  <th className="border border-gray-300 p-2">Total Línea</th>
                  <th className="border border-gray-300 p-2">Detalle</th>
                  <th className="border border-gray-300 p-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                {descargo.lineas.map((linea) => (
                  <LineaDescargo
                    key={linea.id}
                    linea={linea}
                    expandida={lineaExpandida === `${descargo.descargo_id}-${linea.id}`}
                    onToggle={() =>
                      toggleLinea(descargo.descargo_id, linea.id)
                    }
                  />
                ))}

                <tr>
                  <td className="border p-2 font-bold text-right" colSpan={2}>
                    Total Descargo
                  </td>
                  <td className="border p-2 font-bold text-right">
                    ${total.toFixed(2)}
                  </td>
                  <td className="border p-2"></td>
                </tr>
              </tbody>
            </table>

            <div className="flex gap-4 justify-end">
              <button 
              onClick={() => handleDescargarLineas(descargo.id)}
               className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-yellow-700"
              >Descargar Líneas</button>
              <button
                onClick={() => handleGenerarFactura(descargo.descargo_id)}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Generar Factura
              </button>
            </div>
          </div>
        );
      })}

      <button
        onClick={() => router.push("/pacientes")}
        className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 mt-8"
      >
        ← Volver
      </button>

      {modalVisible && (
        <ModalAgregarDescargo
          onGuardarLinea={(nuevaLinea) => {
            // Opcional: aquí agregar lógica para actualizar descargos luego de crear línea
            setModalVisible(false);
          }}
          onCancelar={() => setModalVisible(false)}
        />
      )}

      <button
        onClick={() => setModalVisible(true)}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 mt-6"
      >
        Crear Descargo
      </button>
    </div>
  );
}

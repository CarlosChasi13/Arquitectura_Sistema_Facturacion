"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import LineaDescargo from "./LineaDescargo";
import ModalAgregarDescargo from "./ModalAgregarDescargo";
import { obtenerDescargosPorPaciente } from "@/services/descargoService";

export default function DetalleDescargo() {
  const router = useRouter();
  const [lineaExpandida, setLineaExpandida] = useState(null);

  const [descargo, setDescargo] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const handleAgregarDescargo = () => setModalVisible(true);
  const params = useParams();
  const paciente_id = params?.id;

  console.log("id:", paciente_id);

  useEffect(() => {
    async function cargarDescargo() {
      const res = await obtenerDescargosPorPaciente(paciente_id);

      if (res.success && res.data) {
        setDescargo(res.data);
      } else {
        setError("No hay descargo creado para este paciente.");
      }

      setCargando(false);
    }

    cargarDescargo();
  }, []);

  const guardarLinea = (linea) => {
    setDescargo((prev) => ({
      ...prev,
      lineas_descargo: [...prev.lineas_descargo, linea],
      precio_total_descargo:
        prev.precio_total_descargo + linea.precio_total_linea,
    }));
    setModalVisible(false);
  };

  const toggleLinea = (id) => {
    setLineaExpandida(lineaExpandida === id ? null : id);
  };

  const handleGenerarFactura = () => {
    const todosDescargados = descargo.lineas_descargo.every((linea) =>
      [...linea.productos, ...linea.servicios].every(
        (item) => item.estado === "Descargado"
      )
    );

    if (!todosDescargados) {
      alert(
        "Solo se puede facturar si todos los productos y servicios están en estado 'Descargado'."
      );
      return;
    }

    const factura = {
      ...descargo,
      id_factura: Date.now(),
      fecha_factura: new Date().toISOString(),
      lineas_descargo: descargo.lineas_descargo.map((linea) => ({
        ...linea,
        productos: linea.productos.map((p) => ({ ...p, estado: "Facturado" })),
        servicios: linea.servicios.map((s) => ({ ...s, estado: "Facturado" })),
      })),
    };

    console.log("✅ Factura generada:", factura);
    alert("Factura generada correctamente. Revisa la consola.");
  };

  if (cargando)
    return <p className="text-center mt-10">Cargando descargo...</p>;

  if (error || !descargo || !descargo.lineas_descargo?.length) {
    return (
      <div className="min-h-screen w-full bg-white text-gray-900 flex flex-col items-center p-6">
        <div className="w-full max-w-5xl text-center mb-6">
          <h2 className="text-2xl font-bold mb-4">
            {error || "Aún no hay descargos para este paciente."}
          </h2>
          <p className="mb-4">
            Puedes crear un nuevo descargo para comenzar el registro de insumos
            y servicios.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => router.push("/pacientes")}
              className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
            >
              ← Volver
            </button>

            <button
              onClick={() => setModalVisible(true)}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Crear Descargo
            </button>
          </div>
        </div>

        {modalVisible && (
          <ModalAgregarDescargo
            onGuardarLinea={(nuevaLinea) => {
              setDescargo({
                descargo_id: Date.now(),
                paciente_id: paciente_id,
                fecha: new Date().toISOString().split("T")[0],
                lineas_descargo: [nuevaLinea],
                precio_total_descargo: nuevaLinea.precio_total_linea,
              });
              setModalVisible(false);
            }}
            onCancelar={() => setModalVisible(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white text-gray-900 flex flex-col items-center p-6">
      <div className="w-full max-w-5xl mb-6">
        <h2 className="text-2xl font-bold mb-2">
          Detalle del Descargo #{descargo.descargo_id}
        </h2>
        <p>
          <strong>Paciente ID:</strong> {descargo.paciente_id}
        </p>
        <p>
          <strong>Fecha:</strong> {descargo.fecha}
        </p>
      </div>

      <table className="w-full max-w-5xl border-collapse border border-gray-300 mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2">Línea ID</th>
            <th className="border border-gray-300 p-2">Total Línea</th>
            <th className="border border-gray-300 p-2">Detalle</th>
          </tr>
        </thead>
        <tbody>
          {descargo.lineas_descargo.map((linea) => (
            <LineaDescargo
              key={linea.linea_id}
              linea={linea}
              expandida={lineaExpandida === linea.linea_id}
              onToggle={() => toggleLinea(linea.linea_id)}
            />
          ))}
          <tr>
            <td className="border p-2 font-bold text-right" colSpan={2}>
              Total Descargo
            </td>
            <td className="border p-2 font-bold text-right">
              ${descargo.precio_total_descargo.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <button
          onClick={() => router.push("/pacientes")}
          className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
        >
          ← Volver
        </button>
        <button
          onClick={handleAgregarDescargo}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Agregar Descargo
        </button>
        <button
          onClick={handleGenerarFactura}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Generar Factura
        </button>
      </div>
      {modalVisible && (
        <ModalAgregarDescargo
          onGuardarLinea={guardarLinea}
          onCancelar={() => setModalVisible(false)}
        />
      )}
    </div>
  );
}

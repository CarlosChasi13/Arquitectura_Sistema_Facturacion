"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LineaDescargo from "./LineaDescargo";
import ModalAgregarDescargo from "./ModalAgregarDescargo";

export default function DetalleDescargo() {
  const router = useRouter();
  const [lineaExpandida, setLineaExpandida] = useState(null);

  const [descargo, setDescargo] = useState({
    descargo_id: 123,
    paciente_id: 456,
    fecha: "2025-05-22",
    lineas_descargo: [
      {
        linea_id: 1,
        productos: [
          {
            tipo: "Producto",
            descripcion: "Medicamento ABC",
            precio_unitario: 20,
            cantidad: 2,
            precio_total: 40,
          },
          {
            tipo: "Producto",
            descripcion: "Comida Hospitalaria",
            precio_unitario: 30,
            cantidad: 1,
            precio_total: 30,
          },
        ],
        servicios: [
          {
            tipo: "Servicio",
            descripcion: "Atención Médica",
            precio_total: 100,
          },
        ],
        precio_total_linea: 170,
      },
      {
        linea_id: 2,
        productos: [
          {
            tipo: "Producto",
            descripcion: "Material quirúrgico",
            precio_unitario: 15,
            cantidad: 3,
            precio_total: 45,
          },
        ],
        servicios: [],
        precio_total_linea: 45,
      },
    ],
    precio_total_descargo: 215,
  });

  const [modalVisible, setModalVisible] = useState(false);

  const handleAgregarDescargo = () => setModalVisible(true);

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

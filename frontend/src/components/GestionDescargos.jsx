"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import LineaDescargo from "./LineaDescargo";
import ModalAgregarDescargo from "./ModalAgregarDescargo";
import { obtenerDescargosPorPaciente } from "@/services/descargoService";

export default function GestionDescargos() {
  const { id } = useParams();       // paciente_id
  const router = useRouter();

  // null = cargando, [] = cargado pero sin descargos, [ ... ] = con datos
  const [descargos, setDescargos] = useState(null);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
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
        <button
          onClick={() => router.back()}
          className="mb-4 text-gray-600 hover:underline"
        >
          ← Volver
        </button>
        <h2 className="text-2xl font-bold mb-2">
          Detalle del Descargo #{desc.descargo_id}
        </h2>
        <p>
          <strong>Fecha:</strong> {desc.fecha}
        </p>
      </div>

      <table className="w-full max-w-5xl border-collapse border border-gray-300 mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Línea ID</th>
            <th className="border p-2">Total Línea</th>
            <th className="border p-2">Detalle</th>
          </tr>
        </thead>
          <tbody>
            {(
              desc.lineas_descargo   // si existe
              ?? desc.lineas        // si backend lo llama así
              ?? []
            ).map((linea) => (
              <React.Fragment key={linea.linea_id}>
                <tr
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() => toggleLinea(linea.linea_id)}
                >
                  <td className="border p-2 text-center">
                    {linea.linea_id}
                  </td>
                  <td className="border p-2 text-right">
                    ${linea.precio_total_linea.toFixed(2)}
                  </td>
                  <td className="border p-2 text-center">
                    {lineaExpandida === linea.linea_id
                      ? "▼ Ocultar"
                      : "▶ Ver Detalle"}
                  </td>
                </tr>
                {lineaExpandida === linea.linea_id && (
                  <tr>
                    <td colSpan={3} className="border p-4 bg-gray-50">
                      {linea.productos?.length > 0 && (
                        <>
                          <h3 className="font-semibold mb-2">Productos</h3>
                          <TablaProductos productos={linea.productos} />
                        </>
                      )}
                      {linea.servicios?.length > 0 && (
                        <>
                          <h3 className="font-semibold mt-4 mb-2">
                            Servicios
                          </h3>
                          <TablaServicios servicios={linea.servicios} />
                        </>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            <tr>
              <td
                className="border p-2 font-bold text-right"
                colSpan={2}
              >
                Total Descargo
              </td>
              <td className="border p-2 font-bold text-right">
                ${desc.precio_total_descargo?.toFixed(2) ?? "0.00"}
              </td>
            </tr>
          </tbody>

      </table>

      <div className="flex gap-4">
        <button
          onClick={() => setModalVisible(true)}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Agregar Línea
        </button>
        <button
          onClick={facturar}
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

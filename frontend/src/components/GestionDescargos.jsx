"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import LineaDescargo from "./LineaDescargo";
import ModalAgregarDescargo from "./ModalAgregarDescargo";

export default function GestionDescargos() {
  const { id } = useParams();       // paciente_id
  const router = useRouter();

  // null = cargando, [] = cargado pero sin descargos, [ ... ] = con datos
  const [descargos, setDescargos] = useState(null);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [lineaExpandida, setLineaExpandida] = useState(null);

  useEffect(() => {
    fetch(`/api/pacientes/${id}/descargos`)
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json();
      })
      .then((data) => setDescargos(data))
      .catch((e) => setError(e.message));
  }, [id]);

  // 1) Error
  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  // 2) Cargando
  if (descargos === null) {
    return <div className="p-4">Cargando descargos…</div>;
  }

  // 3) Sin descargos aún
  if (descargos.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
        <p className="text-lg mb-4">No hay descargos para este paciente.</p>
        <button
          onClick={() => setModalVisible(true)}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Crear Primer Descargo
        </button>
        {modalVisible && (
          <ModalAgregarDescargo
            onGuardarLinea={(linea) => {
              // Podrías implementar aquí creación de descargo + línea
              // Ejemplo rápido: redirigir a un endpoint POST para crear descargo
            }}
            onCancelar={() => setModalVisible(false)}
          />
        )}
      </div>
    );
  }

  // 4) Con uno o más descargos
  const desc = descargos[0];

  const toggleLinea = (lineaId) =>
    setLineaExpandida(lineaExpandida === lineaId ? null : lineaId);

  const guardarLinea = async (linea) => {
    try {
      const descargoId = desc.descargo_id;
      await fetch(
        `/api/pacientes/${id}/descargos/${descargoId}/lineas`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(linea),
        }
      );
      // refresco
      const updated = await fetch(
        `/api/pacientes/${id}/descargos`
      ).then((r) => r.json());
      setDescargos(updated);
      setModalVisible(false);
    } catch (e) {
      alert("Error al agregar línea: " + e.message);
    }
  };

  const facturar = async () => {
    try {
      const descargoId = desc.descargo_id;
      const res = await fetch(
        `/api/pacientes/${id}/descargos/${descargoId}/facturar`,
        { method: "POST" }
      );
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || res.statusText);
      }
      router.push(`/pacientes/${id}/factura`);
    } catch (e) {
      alert("No se pudo facturar: " + e.message);
    }
  };

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

import React from "react";
import TablaProductos from "./TablaProductos";
import TablaServicios from "./TablaServicios";

export default function LineaDescargo({ linea, expandida, onToggle }) {
  const totalLinea = (linea.cantidad || 0) * (linea.precioUnitario || 0);
  const tieneProductos = Array.isArray(linea.productos) && linea.productos.length > 0;
  const tieneServicios = Array.isArray(linea.servicios) && linea.servicios.length > 0;

  return (
    <>
      <tr className="cursor-pointer hover:bg-gray-200" onClick={onToggle}>
        <td className="border p-2 text-center">{linea.id}</td>
        <td className="border p-2 text-right">${totalLinea.toFixed(2)}</td>
        <td className="border border-gray-300 p-2 text-center">{linea.estado || "PENDIENTE"}</td>
        <td className="border p-2 text-center">
          {expandida ? "▼ Ocultar" : "▶ Ver Detalle"}
        </td>
      </tr>

      {expandida && (
        <tr>
          <td colSpan={4} className="border p-4 bg-gray-50">
            {tieneProductos && (
              <>
                <h3 className="font-semibold mb-2">Productos</h3>
                <TablaProductos productos={linea.productos} />
              </>
            )}
            {tieneServicios && (
              <>
                <h3 className="font-semibold mt-4 mb-2">Servicios</h3>
                <TablaServicios servicios={linea.servicios} />
              </>
            )}
            {!tieneProductos && !tieneServicios && (
              <p>No hay productos ni servicios registrados en esta línea.</p>
            )}
          </td>
        </tr>
      )}
    </>
  );
}

import React from "react";
import TablaProductos from "./TablaProductos";
import TablaServicios from "./TablaServicios";

export default function LineaDescargo({ linea, expandida, onToggle }) {
  return (
    <>
      <tr className="cursor-pointer hover:bg-gray-200" onClick={onToggle}>
        <td className="border p-2 text-center">{linea.linea_id}</td>
        <td className="border p-2 text-right">${linea.precio_total_linea.toFixed(2)}</td>
        <td className="border p-2 text-center">
          {expandida ? "▼ Ocultar" : "▶ Ver Detalle"}
        </td>
      </tr>
      {expandida && (
        <tr>
          <td colSpan={3} className="border p-4 bg-gray-50">
            {linea.productos.length > 0 && (
              <>
                <h3 className="font-semibold mb-2">Productos</h3>
                <TablaProductos productos={linea.productos} />
              </>
            )}
            {linea.servicios.length > 0 && (
              <>
                <h3 className="font-semibold mt-4 mb-2">Servicios</h3>
                <TablaServicios servicios={linea.servicios} />
              </>
            )}
          </td>
        </tr>
      )}
    </>
  );
}

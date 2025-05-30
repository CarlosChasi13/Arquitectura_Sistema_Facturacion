import { getAPI, postAPI } from "./service"; 
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/api';

// Obtener la última factura de un paciente
export async function obtenerUltimaFactura(pacienteId) {
  const url = `${BASE_URL}/pacientes/${pacienteId}/factura`;

  try {
    const res = await getAPI(url);
    return {
      success: res.success,
      message: res.message || "Factura obtenida correctamente",
      data: res.data || null,
    };
  } catch (error) {
    console.error("Error al obtener la factura:", error);
    return {
      success: false,
      message: "Error al obtener la factura del paciente",
      data: null,
    };
  }
}

// Facturar un descargo específico de un paciente
export async function facturarDescargo(pacienteId, descargoId) {
  const url = `${BASE_URL}/pacientes/${pacienteId}/descargos/${descargoId}/facturar`;

  try {
    const res = await postAPI(url, {});
    return {
      success: res.success,
      message: res.message || "Descargo facturado correctamente",
      data: res.data || null,
    };
  } catch (error) {
    console.error("Error al facturar descargo:", error);
    return {
      success: false,
      message: "Error al facturar el descargo",
      data: null,
    };
  }
}


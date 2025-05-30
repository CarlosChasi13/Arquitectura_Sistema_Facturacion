import { getAPI, postAPI } from "./service"; 
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/api';

// Obtener descargos por paciente
export async function obtenerDescargosPorPaciente(pacienteId) {
  const url = `${BASE_URL}/pacientes/${pacienteId}/descargos`;

  try {
    const res = await getAPI(url);
    console.log(res);
    return {
      success: res.success,
      message: res.message || "Descargos obtenidos correctamente",
      data: Array.isArray(res.data) ? res.data : [],
    };
  } catch (error) {
    console.error("Error al obtener descargos:", error);
    return {
      success: false,
      message: "Error al obtener descargos del paciente",
      data: [],
    };
  }
}

// Crear descargo para paciente
export async function crearDescargo(pacienteId, datosDescargo) {
  const url = `${BASE_URL}/pacientes/${pacienteId}/descargos`;

  try {
    const res = await postAPI(url, datosDescargo);
    return {
      success: res.success,
      message: res.message || "Descargo creado correctamente",
      data: res.data || null,
    };
  } catch (error) {
    console.error("Error al crear descargo:", error);
    return {
      success: false,
      message: "Error al crear descargo para el paciente",
      data: null,
    };
  }
}

// Obtener un descargo específico por ID
export async function obtenerDescargoPorId(descargoId) {
  const url = `${BASE_URL}/descargos/${descargoId}`;

  try {
    const res = await getAPI(url);
    return {
      success: res.success,
      message: res.message || "Descargo obtenido correctamente",
      data: res.data || null,
    };
  } catch (error) {
    console.error("Error al obtener descargo por ID:", error);
    return {
      success: false,
      message: "Error al obtener el descargo",
      data: null,
    };
  }
}

//Líneas de descargo 

export async function obtenerLineasDeDescargo(descargoId) {
  const url = `${BASE_URL}/descargos/${descargoId}/lineas`;

  try {
    const res = await getAPI(url);
    return {
      success: res.success,
      message: res.message || "Líneas de descargo obtenidas correctamente",
      data: Array.isArray(res.data) ? res.data : [],
    };
  } catch (error) {
    console.error("Error al obtener líneas del descargo:", error);
    return {
      success: false,
      message: "Error al obtener líneas del descargo",
      data: [],
    };
  }
}

// Agregar nueva línea (producto o servicio) a un descargo
export async function agregarLineaADescargo(descargoId, datosLinea) {
  const url = `${BASE_URL}/descargos/${descargoId}/lineas`;
  console.log("Datos linea",datosLinea);
  try {
    const res = await postAPI(url, datosLinea);
    return {
      success: res.success,
      message: res.message || "Línea agregada correctamente",
      data: res.data || null,
    };
  } catch (error) {
    console.error("Error al agregar línea al descargo:", error);
    return {
      success: false,
      message: "Error al agregar línea al descargo",
      data: null,
    };
  }
}

export async function descargarLineasDescargo(pacienteId, descargoId) {
  const url = `/api/pacientes/${pacienteId}/descargos/${descargoId}/descargar`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    return {
      success: res.ok,
      message: data.message || "Líneas descargadas correctamente",
      data: data,
    };
  } catch (error) {
    console.error("Error al descargar líneas:", error);
    return {
      success: false,
      message: "Error al descargar las líneas del descargo",
      data: null,
    };
  }
}

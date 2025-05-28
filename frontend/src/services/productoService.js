import { getAPI } from "./service"; 
const BASE_URL = process.env.BACKEND_URL || 'http://127.0.0.1:5000';

export async function obtenerProductos() {
  const url = `${BASE_URL}/productos`;

  try {
    const res = await getAPI(url);
    return {
      success: res.success,
      message: res.message || "Productos obtenidos correctamente",
      data: Array.isArray(res.data) ? res.data : [],
    };
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return {
      success: false,
      message: "Error al obtener productos",
      data: [],
    };
  }
}

export async function obtenerServicios() {
  const url = `${BASE_URL}/servicios`;

  try {
    const res = await getAPI(url);
    return {
      success: res.success,
      message: res.message || "Servicios obtenidos correctamente",
      data: Array.isArray(res.data) ? res.data : [],
    };
  } catch (error) {
    console.error("Error al obtener servicios:", error);
    return {
      success: false,
      message: "Error al obtener servicios",
      data: [],
    };
  }
}

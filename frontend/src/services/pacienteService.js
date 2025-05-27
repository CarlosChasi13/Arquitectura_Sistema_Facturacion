import { fetchAPI } from "./service";
const BASE_URL = process.env.BACKEND_URL || 'http://127.0.0.1:5000';

export async function obtenerPacientes() {
    console.log(BASE_URL);
  return await fetchAPI(`${BASE_URL}/pacientes/`, { method: 'GET' });
}

export async function crearPaciente(paciente) {
  return await fetchAPI(`${BASE_URL}/pacientes/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paciente),
  });
}
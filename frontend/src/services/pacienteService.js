import { fetchAPI } from "./service";
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/api';

export async function obtenerPacientes() {
    console.log(BASE_URL);
  return await fetchAPI(`${BASE_URL}/pacientes`, { method: 'GET' });
}

export async function crearPaciente(paciente) {
  return await fetchAPI(`${BASE_URL}/pacientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paciente),
  });
}
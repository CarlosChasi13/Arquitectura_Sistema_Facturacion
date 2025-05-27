export async function fetchAPI(url, options = {}) {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      let errorMessage = `Error en la solicitud: ${res.status} ${res.statusText}`;
      try {
        const errorData = await res.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // Ignorar si no es JSON
      }
      return { success: false, message: errorMessage, data: [] };
    }

    if (res.status === 204) {
      return { success: true, message: "No Content", data: [] };
    }

    const data = await res.json();

    // Si data es nulo o indefinido, devolver arreglo vacío
    if (!data) {
      return { success: true, message: "Respuesta vacía", data: [] };
    }

    return { success: true, message: "Solicitud exitosa", data };
  } catch (error) {
    console.error("Error en fetchAPI:", error);
    return {
      success: false,
      message: error.message || "Error desconocido en la petición",
      data: [],
    };
  }
}

export async function getAPI(url) {
  console.log("Llegó al getAPI");
  return await fetchAPI(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
}

export async function postAPI(url, data) {
  return await fetchAPI(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function putAPI(url, data) {
  return await fetchAPI(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function patchAPI(url, data) {
  return await fetchAPI(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteAPI(url) {
  return await fetchAPI(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}

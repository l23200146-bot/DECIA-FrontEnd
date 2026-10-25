
import { getApiBaseUrl } from "./apiConfig";

// Función general para las peticiones HTTP.
async function apiRequest(endpoint, options = {}) {
  const baseUrl = getApiBaseUrl();

  const headers = {
    Accept: "application/json",
    ...options.headers
  };

  // Solo enviar Content-Type cuando hay un cuerpo JSON.
  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers
  });

  // Algunas respuestas correctas, como HTTP 204, no tienen contenido.
  const text = await response.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("El servidor devolvió una respuesta que no es JSON.");
    }
  }

  if (!response.ok) {
    const message =
      data?.message ||
      data?.mensaje ||
      `Error HTTP ${response.status}`;

    throw new Error(message);
  }

  return data;
}

// GET: obtener preguntas.
// Ruta provisional; confirmar con el backend.
export function getQuestions() {
  return apiRequest("/api/questions");
}

// POST: enviar respuestas.
// Ruta y estructura del body provisionales.
export function sendEvaluation(evaluation) {
  return apiRequest("/api/evaluations", {
    method: "POST",
    body: JSON.stringify(evaluation)
  });
}

// PUT: actualizar una evaluación.
// Ruta provisional; confirmar si estará disponible.
export function updateEvaluation(id, changes) {
  return apiRequest(`/api/evaluations/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(changes)
  });
}

// DELETE: eliminar una evaluación.
// Ruta provisional; confirmar si estará disponible.
export function deleteEvaluation(id) {
  return apiRequest(`/api/evaluations/${encodeURIComponent(id)}`, {
    method: "DELETE"
  });
}

// POST: iniciar sesión.
// Coincide con la ruta que habías preparado en Postman.
export function loginUser(correo, password) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ correo, password })
  });
}

// POST: registrar usuario.
// Ruta y campos provisionales.
export function registerUser(userData) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData)
  });
}

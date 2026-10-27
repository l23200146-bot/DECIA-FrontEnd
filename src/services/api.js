
import { getApiBaseUrl } from "./apiConfig";
import { PATH_APIS } from "./PathApis";

// Función general para comunicarse con FastAPI.
async function apiRequest(endpoint, options = {}) {
    const baseUrl = getApiBaseUrl();

    const headers = {
        Accept: "application/json",
        ...options.headers,
    };

    const isFormData =
        typeof FormData !== "undefined" &&
        options.body instanceof FormData;

    // FormData establece automáticamente su Content-Type y boundary.
    if (options.body !== undefined && !isFormData) {
        headers["Content-Type"] = "application/json";
    }

    const token = localStorage.getItem("deciaToken");

    if (token && !headers.Authorization) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers,
    });

    const text = await response.text();
    let data = null;

    if (text) {
        try {
            data = JSON.parse(text);
        } catch {
            if (response.ok) {
                throw new Error(
                    "El servidor devolvió una respuesta que no es JSON."
                );
            }
        }
    }

    if (!response.ok) {
        const detail = data?.detail;

        const message =
            data?.message ||
            data?.mensaje ||
            (typeof detail === "string" ? detail : null) ||
            (Array.isArray(detail)
                ? detail.map((item) => item.msg).join(", ")
                : null) ||
            `Error HTTP ${response.status}`;

        throw new Error(message);
    }

    return data;
}

// ==================== AUTENTICACIÓN ====================

export function loginUser(email, password) {
    return apiRequest(PATH_APIS.AUTH.LOGIN, {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

export function registerUser(userData) {
    return apiRequest(PATH_APIS.AUTH.REGISTRO, {
        method: "POST",
        body: JSON.stringify(userData),
    });
}

export function getUserProfile() {
    return apiRequest(PATH_APIS.AUTH.PERFIL, {
        method: "GET",
    });
}

export function refreshSession() {
    const refreshToken = localStorage.getItem("deciaRefreshToken");

    if (!refreshToken) {
        throw new Error("No hay un token de renovación.");
    }

    return apiRequest(PATH_APIS.AUTH.REFRESH, {
        method: "POST",
        body: JSON.stringify({
            refresh_token: refreshToken,
        }),
    });
}

export function logoutUser() {
    const refreshToken = localStorage.getItem("deciaRefreshToken");

    if (!refreshToken) {
        throw new Error("No hay un token de renovación.");
    }

    return apiRequest(PATH_APIS.AUTH.LOGOUT, {
        method: "POST",
        body: JSON.stringify({
            refresh_token: refreshToken,
        }),
    });
}

// ==================== TRIAJE CONVERSACIONAL ====================

// Iniciar una evaluación.
export function iniciarTriaje(motivoConsulta) {
    return apiRequest(PATH_APIS.TRIAJE.INICIAR, {
        method: "POST",
        body: JSON.stringify({
            motivo_consulta: motivoConsulta,
        }),
    });
}

// Enviar respuesta y, opcionalmente, una fotografía.
export function responderPregunta({
    idSesion,
    idPregunta,
    respuesta,
    archivo = null,
}) {
    const formData = new FormData();

    formData.append("id_sesion", String(idSesion));
    formData.append("id_pregunta", String(idPregunta));
    formData.append("respuesta", respuesta);

    if (archivo) {
        formData.append("archivo", archivo);
    }

    return apiRequest(PATH_APIS.TRIAJE.RESPONDER, {
        method: "POST",
        body: formData,
    });
}

// Recuperar el resultado de una evaluación.
export function obtenerResultado(idSesion) {
    return apiRequest(
        `${PATH_APIS.TRIAJE.RESULTADO}/${encodeURIComponent(idSesion)}`,
        { method: "GET" }
    );
}

// Consultar el historial del usuario autenticado.
export function obtenerHistorial() {
    return apiRequest(PATH_APIS.TRIAJE.HISTORIAL, {
        method: "GET",
    });
}

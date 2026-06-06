const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const TOKEN_KEY = "portfolio_access_token";

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function storeToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearStoredToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function decodeJwt(token) {
  if (!token) return {};

  try {
    const payload = token.split(".")[1];
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(normalized));
  } catch {
    return {};
  }
}

function buildUrl(path, params) {
  const url = new URL(path, API_BASE_URL);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });
  }

  return url.toString();
}

async function parseResponse(response) {
  if (response.status === 204) return null;

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return response.text();
  }

  return response.json();
}

function buildError(response, body) {
  const errors = Array.isArray(body?.errors) ? body.errors : [];
  const message =
    errors.length > 0
      ? errors.join("\n")
      : body?.detail || body?.message || response.statusText || "Request failed";

  const error = new Error(message);
  error.status = response.status;
  error.body = body;
  return error;
}

export async function apiRequest(path, options = {}) {
  const {
    method = "GET",
    body,
    params,
    token = getStoredToken(),
    headers = {},
  } = options;

  const response = await fetch(buildUrl(path, params), {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const parsedBody = await parseResponse(response);

  if (!response.ok) {
    throw buildError(response, parsedBody);
  }

  return parsedBody;
}

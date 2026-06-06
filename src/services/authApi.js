import { apiRequest } from "./apiClient";

export function login(payload) {
  return apiRequest("/api/public/login", {
    method: "POST",
    body: payload,
    token: null,
  });
}

export function register(payload) {
  return apiRequest("/api/public/register", {
    method: "POST",
    body: payload,
    token: null,
  });
}

export function verifyEmail(token) {
  return apiRequest("/api/public/verify", {
    params: { token },
    token: null,
  });
}

export function resendVerification(identifier) {
  return apiRequest("/api/public/verification/resend", {
    method: "POST",
    params: { identifier },
    token: null,
  });
}

export function requestPasswordReset(userName) {
  return apiRequest("/api/public/password-resets", {
    method: "POST",
    params: { userName },
    token: null,
  });
}

export function confirmPasswordReset(token, payload) {
  return apiRequest("/api/public/password-resets/confirm", {
    method: "POST",
    params: { token },
    body: payload,
    token: null,
  });
}

export function completeInvite(token, payload) {
  return apiRequest("/api/public/invites/complete", {
    method: "POST",
    params: { token },
    body: payload,
    token: null,
  });
}

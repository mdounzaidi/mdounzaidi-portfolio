import { apiRequest } from "./apiClient";

export function getMe() {
  return apiRequest("/api/auth/me");
}

export function updateMe(payload) {
  return apiRequest("/api/auth/me", {
    method: "PATCH",
    body: payload,
  });
}

export function changePassword(payload) {
  return apiRequest("/api/auth/me/password", {
    method: "PATCH",
    body: payload,
  });
}

export function createInvite(payload) {
  return apiRequest("/api/auth/invites", {
    method: "POST",
    body: payload,
  });
}

import { apiRequest } from "./apiClient";

export function getPublicArticles(params) {
  return apiRequest("/api/public/articles", { params, token: null });
}

export function searchPublicArticles(params) {
  return apiRequest("/api/public/articles/search", { params, token: null });
}

export function getPublicArticle(slug) {
  return apiRequest(`/api/public/articles/${slug}`, { token: null });
}

export function getManagedArticles(params) {
  return apiRequest("/api/articles", { params });
}

export function createArticle(payload) {
  return apiRequest("/api/articles", {
    method: "POST",
    body: payload,
  });
}

export function getManagedArticle(slug) {
  return apiRequest(`/api/articles/${slug}`);
}

export function updateArticle(slug, payload) {
  return apiRequest(`/api/articles/${slug}`, {
    method: "PATCH",
    body: payload,
  });
}

export function publishArticle(slug) {
  return apiRequest(`/api/articles/${slug}/publish`, { method: "PATCH" });
}

export function unpublishArticle(slug) {
  return apiRequest(`/api/articles/${slug}/unpublish`, { method: "PATCH" });
}

export function deleteArticle(slug) {
  return apiRequest(`/api/articles/${slug}`, { method: "DELETE" });
}

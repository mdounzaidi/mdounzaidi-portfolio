import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatusMessage from "../components/StatusMessage";
import { useAuth } from "../context/AuthContext";
import {
  deleteArticle,
  getManagedArticles,
  publishArticle,
  unpublishArticle,
} from "../services/articleApi";

function ManageArticlesPage() {
  const { hasAnyRole } = useAuth();
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({ keyword: "", status: "" });
  const [pageInfo, setPageInfo] = useState({ number: 0, totalPages: 0, first: true, last: true });
  const [loading, setLoading] = useState(true);
  const [actionSlug, setActionSlug] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const canPublish = hasAnyRole(["ROLE_ADMIN", "ROLE_SUPERADMIN"]);

  useEffect(() => {
    loadArticles(0);
  }, []);

  async function loadArticles(page = 0, nextFilters = filters) {
    try {
      setLoading(true);
      setError("");
      const response = await getManagedArticles({
        page,
        size: 10,
        keyword: nextFilters.keyword,
        status: nextFilters.status,
      });
      setArticles(response.content || []);
      setPageInfo({
        number: response.number || 0,
        totalPages: response.totalPages || 0,
        first: Boolean(response.first),
        last: Boolean(response.last),
      });
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  }

  function updateFilter(event) {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  }

  function handleFilter(event) {
    event.preventDefault();
    loadArticles(0, filters);
  }

  async function runAction(slug, action) {
    try {
      setActionSlug(slug);
      setError("");
      setSuccess("");
      await action(slug);
      setSuccess("Article updated.");
      await loadArticles(pageInfo.number);
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setActionSlug("");
    }
  }

  async function handleDelete(slug) {
    const confirmed = window.confirm("Delete this article?");
    if (!confirmed) return;
    await runAction(slug, deleteArticle);
  }

  return (
    <section className="rounded-[2rem] border border-zinc-800 bg-[#1d1f1e] p-6 sm:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">Articles</p>
          <h2 className="mt-3 font-FoundersGroteskCondensed text-5xl uppercase leading-none">
            Manage Posts
          </h2>
        </div>
        <Link
          to="/dashboard/articles/new"
          className="w-fit rounded-full bg-[#004D43] px-6 py-3 text-sm uppercase tracking-[0.2em] text-white"
        >
          New Article
        </Link>
      </div>

      <form className="mt-8 grid gap-3 md:grid-cols-[1fr_180px_auto]" onSubmit={handleFilter}>
        <input
          name="keyword"
          value={filters.keyword}
          onChange={updateFilter}
          placeholder="Search title"
          className="rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-[#004D43]"
        />
        <select
          name="status"
          value={filters.status}
          onChange={updateFilter}
          className="rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-sm text-white outline-none focus:border-[#004D43]"
        >
          <option value="">All statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
        <button
          type="submit"
          className="rounded-full border border-zinc-700 px-6 py-3 text-sm text-zinc-200 hover:border-[#004D43]"
        >
          Apply
        </button>
      </form>

      <div className="mt-6 space-y-3">
        <StatusMessage type="error" message={error} />
        <StatusMessage type="success" message={success} />
      </div>

      {loading ? (
        <p className="py-12 text-center text-zinc-400">Loading articles...</p>
      ) : articles.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-300">
          No articles found.
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-800">
          {articles.map((article) => (
            <div
              key={article.id}
              className="grid gap-4 border-b border-zinc-800 bg-zinc-950 p-5 last:border-b-0 lg:grid-cols-[1fr_auto]"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  {article.articleStatus}
                </p>
                <h3 className="mt-2 text-xl text-white">{article.title}</h3>
                <p className="mt-2 text-sm text-zinc-500">
                  /{article.slug} · {article.authorName || "Author"}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to={`/dashboard/articles/${article.slug}/edit`}
                  className="rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-200 hover:border-zinc-600"
                >
                  Edit
                </Link>
                {canPublish && article.articleStatus === "DRAFT" && (
                  <button
                    type="button"
                    disabled={actionSlug === article.slug}
                    onClick={() => runAction(article.slug, publishArticle)}
                    className="rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-200 hover:border-[#004D43] disabled:opacity-40"
                  >
                    Publish
                  </button>
                )}
                {canPublish && article.articleStatus === "PUBLISHED" && (
                  <button
                    type="button"
                    disabled={actionSlug === article.slug}
                    onClick={() => runAction(article.slug, unpublishArticle)}
                    className="rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-200 hover:border-[#004D43] disabled:opacity-40"
                  >
                    Unpublish
                  </button>
                )}
                <button
                  type="button"
                  disabled={actionSlug === article.slug}
                  onClick={() => handleDelete(article.slug)}
                  className="rounded-full border border-red-400/30 px-4 py-2 text-sm text-red-200 hover:border-red-300 disabled:opacity-40"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-zinc-500">
          Page {pageInfo.totalPages === 0 ? 0 : pageInfo.number + 1} of {pageInfo.totalPages}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            disabled={pageInfo.first || loading}
            onClick={() => loadArticles(pageInfo.number - 1)}
            className="rounded-full border border-zinc-800 px-5 py-3 text-sm text-zinc-300 disabled:opacity-40"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={pageInfo.last || loading}
            onClick={() => loadArticles(pageInfo.number + 1)}
            className="rounded-full border border-zinc-800 px-5 py-3 text-sm text-zinc-300 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default ManageArticlesPage;

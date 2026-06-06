import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeLogoLink from "../components/HomeLogoLink";
import StatusMessage from "../components/StatusMessage";
import { getPublicArticles, searchPublicArticles } from "../services/articleApi";

function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [pageInfo, setPageInfo] = useState({ number: 0, totalPages: 0, first: true, last: true });
  const [keyword, setKeyword] = useState("");
  const [activeKeyword, setActiveKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadArticles(0, activeKeyword);
  }, [activeKeyword]);

  async function loadArticles(page = 0, searchTerm = activeKeyword) {
    try {
      setLoading(true);
      setError("");
      const request = searchTerm.trim()
        ? searchPublicArticles({ keyword: searchTerm.trim(), page, size: 6 })
        : getPublicArticles({ page, size: 6 });
      const response = await request;
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

  function handleSearch(event) {
    event.preventDefault();
    setActiveKeyword(keyword.trim());
  }

  return (
    <section className="min-h-screen bg-zinc-900 px-4 py-10 text-white">
      <div className="container">
        <div className="mb-8">
          <HomeLogoLink />
        </div>
        <div className="mb-10 flex flex-col gap-5 border-b border-zinc-800 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">Articles</p>
            <h1 className="mt-3 font-FoundersGroteskCondensed text-6xl uppercase leading-none">
              Published Notes
            </h1>
          </div>
          <Link
            to="/"
            className="w-fit rounded-full border border-zinc-800 px-5 py-3 text-sm text-zinc-300 hover:border-zinc-600 hover:text-white"
          >
            Back home
          </Link>
        </div>

        <form className="mb-8 flex flex-col gap-3 sm:flex-row" onSubmit={handleSearch}>
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Search articles"
            className="min-w-0 flex-1 rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-[#004D43]"
          />
          <button
            type="submit"
            className="rounded-full bg-[#004D43] px-8 py-4 text-sm uppercase tracking-[0.2em] text-white"
          >
            Search
          </button>
        </form>

        <StatusMessage type="error" message={error} />

        {loading ? (
          <p className="py-16 text-center text-zinc-400">Loading articles...</p>
        ) : articles.length === 0 ? (
          <div className="rounded-[2rem] border border-zinc-800 bg-[#1d1f1e] p-8 text-zinc-300">
            No published articles found.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/articles/${article.slug}`}
                className="rounded-[2rem] border border-zinc-800 bg-[#1d1f1e] p-6 transition-colors hover:border-[#004D43]"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  {article.articleStatus}
                </p>
                <h2 className="mt-4 text-2xl font-medium text-white">{article.title}</h2>
                <p className="mt-4 text-sm text-zinc-400">By {article.authorName || "Author"}</p>
                <p className="mt-2 text-sm text-zinc-500">
                  {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Draft"}
                </p>
              </Link>
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
      </div>
    </section>
  );
}

export default ArticlesPage;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowUpLong } from "react-icons/fa6";
import { getPublicArticles } from "../services/articleApi";

function FeaturedArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadFeaturedArticles() {
      try {
        const response = await getPublicArticles({ page: 0, size: 3 });
        if (active) setArticles(response.content || []);
      } catch {
        if (active) setArticles([]);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadFeaturedArticles();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="container w-full py-10 sm:py-16">
      <div className="flex flex-col gap-5 border-b border-zinc-700 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Writing</p>
          <h2 className="mt-3 text-4xl sm:text-6xl">Featured Articles</h2>
        </div>
        <Link
          to="/articles"
          className="flex w-fit items-center gap-2 rounded-full bg-[#004D43] px-6 py-3 text-sm uppercase tracking-wider text-zinc-100"
        >
          View All
          <FaArrowUpLong className="rotate-45 origin-center translate-y-[2px]" />
        </Link>
      </div>

      {loading ? (
        <p className="py-10 text-zinc-400">Loading articles...</p>
      ) : articles.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-zinc-800 bg-[#1d1f1e] p-6 text-zinc-300">
          No articles published yet.
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/articles/${article.slug}`}
              className="group rounded-2xl border border-zinc-800 bg-[#1d1f1e] p-6 transition-colors hover:border-[#004D43]"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                {article.articleStatus}
              </p>
              <h3 className="mt-4 text-2xl leading-tight text-white">
                {article.title}
              </h3>
              <p className="mt-5 text-sm text-zinc-400">
                {article.authorName || "Author"}
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm uppercase tracking-wider text-[#CDEA68]">
                Read Article
                <FaArrowUpLong className="rotate-45 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default FeaturedArticles;

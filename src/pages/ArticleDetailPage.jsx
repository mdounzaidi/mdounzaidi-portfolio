import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HomeLogoLink from "../components/HomeLogoLink";
import StatusMessage from "../components/StatusMessage";
import { getPublicArticle } from "../services/articleApi";

function ArticleDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadArticle() {
      try {
        setLoading(true);
        setError("");
        const response = await getPublicArticle(slug);
        if (active) setArticle(response);
      } catch (apiError) {
        if (active) setError(apiError.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadArticle();

    return () => {
      active = false;
    };
  }, [slug]);

  return (
    <section className="min-h-screen bg-zinc-900 px-4 py-10 text-white">
      <article className="container max-w-4xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <HomeLogoLink />
          <Link
            to="/articles"
            className="inline-flex w-fit rounded-full border border-zinc-800 px-5 py-3 text-sm text-zinc-300 hover:border-zinc-600 hover:text-white"
          >
            Back to articles
          </Link>
        </div>

        <div className="mt-8">
          <StatusMessage type="error" message={error} />
        </div>

        {loading ? (
          <p className="py-16 text-center text-zinc-400">Loading article...</p>
        ) : article ? (
          <div className="rounded-[2rem] border border-zinc-800 bg-[#1d1f1e] p-6 sm:p-10">
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
              {article.articleStatus}
            </p>
            <h1 className="mt-4 font-FoundersGroteskCondensed text-6xl uppercase leading-none sm:text-7xl">
              {article.title}
            </h1>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-zinc-400">
              <span>By {article.authorName || "Author"}</span>
              {article.publishedAt && (
                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
              )}
            </div>
            <div className="mt-10 whitespace-pre-wrap text-base leading-8 text-zinc-200">
              {article.content}
            </div>
          </div>
        ) : null}
      </article>
    </section>
  );
}

export default ArticleDetailPage;

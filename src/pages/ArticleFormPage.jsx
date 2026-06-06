import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingButton from "../components/LoadingButton";
import StatusMessage from "../components/StatusMessage";
import {
  createArticle,
  getManagedArticle,
  updateArticle,
} from "../services/articleApi";

function ArticleFormPage() {
  const { slug } = useParams();
  const isEdit = Boolean(slug);
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadArticle() {
      if (!isEdit) return;

      try {
        setLoading(true);
        const article = await getManagedArticle(slug);
        if (active) {
          setForm({
            title: article.title || "",
            content: article.content || "",
          });
        }
      } catch (error) {
        if (active) setStatus({ type: "error", message: error.message });
      } finally {
        if (active) setLoading(false);
      }
    }

    loadArticle();

    return () => {
      active = false;
    };
  }, [isEdit, slug]);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function validateForm() {
    const nextErrors = {};

    if (!form.title.trim()) {
      nextErrors.title = "Title is required";
    } else if (form.title.length > 150) {
      nextErrors.title = "Title must be 150 characters or less";
    }

    if (!form.content.trim()) {
      nextErrors.content = "Content is required";
    } else if (form.content.length > 50000) {
      nextErrors.content = "Content must be 50000 characters or less";
    }

    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateForm();
    setErrors(nextErrors);
    setStatus(null);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setSaving(true);
      const payload = {
        title: form.title.trim(),
        content: form.content,
      };
      const article = isEdit ? await updateArticle(slug, payload) : await createArticle(payload);
      navigate(`/dashboard/articles/${article.slug}/edit`, { replace: true });
      setStatus({ type: "success", message: isEdit ? "Article updated." : "Article created." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-[2rem] border border-zinc-800 bg-[#1d1f1e] p-6 sm:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
            {isEdit ? "Edit Article" : "New Article"}
          </p>
          <h2 className="mt-3 font-FoundersGroteskCondensed text-5xl uppercase leading-none">
            {isEdit ? "Refine Draft" : "Write Post"}
          </h2>
        </div>
        <Link
          to="/dashboard/articles"
          className="w-fit rounded-full border border-zinc-800 px-5 py-3 text-sm text-zinc-300 hover:border-zinc-600"
        >
          Back to list
        </Link>
      </div>

      <div className="mt-8">
        <StatusMessage type={status?.type} message={status?.message} />
      </div>

      {loading ? (
        <p className="py-12 text-center text-zinc-400">Loading article...</p>
      ) : (
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-zinc-500">
              Title
            </span>
            <input
              name="title"
              value={form.title}
              onChange={updateField}
              placeholder="Article title"
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-[#004D43]"
            />
            {errors.title && <span className="mt-2 block text-sm text-red-300">{errors.title}</span>}
          </label>

          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-zinc-500">
              Content
            </span>
            <textarea
              name="content"
              value={form.content}
              onChange={updateField}
              placeholder="Write the article content"
              rows={16}
              className="w-full resize-y rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-sm leading-7 text-white outline-none placeholder:text-zinc-500 focus:border-[#004D43]"
            />
            {errors.content && (
              <span className="mt-2 block text-sm text-red-300">{errors.content}</span>
            )}
          </label>

          <LoadingButton type="submit" loading={saving}>
            {isEdit ? "Save Article" : "Create Article"}
          </LoadingButton>
        </form>
      )}
    </section>
  );
}

export default ArticleFormPage;

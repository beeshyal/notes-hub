"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const FACULTIES = ["BBS", "BBA", "MBA"];

export default function UploadPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Upload failed.");
        setSubmitting(false);
        return;
      }
      router.push(`/document/${data.document.id}`);
    } catch {
      setError("Something went wrong. Try again.");
      setSubmitting(false);
    }
  }

  if (status === "loading") return null;

  if (!session?.user) {
    return (
      <div className="max-w-md">
        <h1 className="font-display text-2xl font-semibold text-parchment">Admin upload</h1>
        <p className="mt-3 text-sm text-slate">Sign in with the admin Google account to upload notes.</p>
        <button
          onClick={() => signIn("google")}
          className="mt-5 rounded-md bg-stamp px-5 py-2.5 text-sm font-medium text-parchment hover:bg-stamp-dark"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg">
      <h1 className="font-display text-2xl font-semibold text-parchment">Upload a note</h1>
      <p className="mt-2 text-sm text-slate">
        Signed in as {session.user.email}. If this account isn&apos;t listed in ADMIN_EMAILS,
        the upload will be rejected.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-widest text-slate">
            Title
          </label>
          <input
            name="title"
            required
            className="w-full rounded-md border border-parchment/20 bg-navy-light/60 px-4 py-2.5 text-sm text-parchment"
            placeholder="Business Statistics — Unit 4 Notes"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-mono uppercase tracking-widest text-slate">
              Faculty
            </label>
            <select
              name="faculty"
              required
              className="w-full rounded-md border border-parchment/20 bg-navy-light/60 px-4 py-2.5 text-sm text-parchment"
            >
              {FACULTIES.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-mono uppercase tracking-widest text-slate">
              Year
            </label>
            <input
              name="year"
              required
              placeholder="First Year"
              className="w-full rounded-md border border-parchment/20 bg-navy-light/60 px-4 py-2.5 text-sm text-parchment"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-widest text-slate">
            Subject
          </label>
          <input
            name="subject"
            required
            placeholder="Business Statistics"
            className="w-full rounded-md border border-parchment/20 bg-navy-light/60 px-4 py-2.5 text-sm text-parchment"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-widest text-slate">
            File (PDF, DOC or DOCX)
          </label>
          <input
            type="file"
            name="file"
            required
            accept=".pdf,.doc,.docx"
            className="w-full rounded-md border border-parchment/20 bg-navy-light/60 px-4 py-2.5 text-sm text-parchment file:mr-3 file:rounded file:border-0 file:bg-stamp file:px-3 file:py-1.5 file:text-parchment"
          />
        </div>

        {error && <p className="text-sm text-stamp">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-stamp px-5 py-3 text-sm font-medium text-parchment transition hover:bg-stamp-dark disabled:opacity-50"
        >
          {submitting ? "Uploading…" : "Upload note"}
        </button>
      </form>
    </div>
  );
}

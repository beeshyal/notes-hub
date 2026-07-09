import Link from "next/link";
import { listDocuments } from "@/lib/kv";
import { DocumentCard } from "@/components/DocumentCard";
import { SearchBar } from "@/components/SearchBar";

export const dynamic = "force-dynamic";

const FACULTIES = ["BBS", "BBA", "MBA"] as const;

export default async function HomePage() {
  const docs = await listDocuments({ limit: 12 });

  return (
    <div>
      <section className="border-b border-parchment/10 pb-12">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-stamp">
          Tribhuvan University · Nepal
        </p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight text-parchment sm:text-5xl">
          Every BBS, BBA and MBA note, filed and ready to open.
        </h1>
        <p className="mt-4 max-w-xl text-slate">
          Verified notes, question papers and project reports, organized by faculty,
          year and subject — the way your exam file actually looks.
        </p>
        <div className="mt-8">
          <SearchBar />
        </div>
        <div className="mt-6 flex gap-3">
          {FACULTIES.map((f) => (
            <Link
              key={f}
              href={`/browse/${f}`}
              className="rounded-full border border-parchment/20 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-slate transition hover:border-stamp hover:text-stamp"
            >
              {f}
            </Link>
          ))}
        </div>
      </section>

      <section className="pt-10">
        <h2 className="font-display text-xl font-semibold text-parchment">Recently filed</h2>
        {docs.length === 0 ? (
          <p className="mt-4 text-sm text-slate">
            No notes uploaded yet. Once you upload from the admin panel, they&apos;ll appear here.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {docs.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

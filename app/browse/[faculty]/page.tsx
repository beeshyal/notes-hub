import { listDocuments } from "@/lib/kv";
import { DocumentCard } from "@/components/DocumentCard";
import { SearchBar } from "@/components/SearchBar";
import { Faculty } from "@/types/document";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const VALID: Faculty[] = ["BBS", "BBA", "MBA"];

export default async function BrowsePage({
  params,
  searchParams
}: {
  params: { faculty: string };
  searchParams: { q?: string };
}) {
  const faculty = params.faculty.toUpperCase() as Faculty;
  if (!VALID.includes(faculty)) notFound();

  const docs = await listDocuments({ faculty, query: searchParams.q });

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-stamp">Faculty</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-parchment">{faculty} notes</h1>

      <div className="mt-6">
        <SearchBar />
      </div>

      {docs.length === 0 ? (
        <p className="mt-8 text-sm text-slate">
          No {faculty} notes match yet{searchParams.q ? ` for "${searchParams.q}"` : ""}.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </div>
      )}
    </div>
  );
}

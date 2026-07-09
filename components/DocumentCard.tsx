import Link from "next/link";
import { NoteDocument } from "@/types/document";
import { StampBadge } from "./StampBadge";

export function DocumentCard({ doc }: { doc: NoteDocument }) {
  return (
    <Link
      href={`/document/${doc.id}`}
      className="group relative block rounded-lg border border-parchment/15 bg-parchment p-5 text-navy shadow-[0_1px_0_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <StampBadge faculty={doc.faculty} year={doc.year} />
      <p className="font-mono text-[11px] uppercase tracking-widest text-navy/50">
        {doc.subject}
      </p>
      <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-navy group-hover:text-stamp">
        {doc.title}
      </h3>
      <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-navy/50">
        <span>{doc.fileType.toUpperCase()}</span>
        <span>{doc.downloads} downloads</span>
      </div>
    </Link>
  );
}

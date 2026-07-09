import { getDocument } from "@/lib/kv";
import { issuePageNonce } from "@/lib/unlock";
import { drivePreviewUrl } from "@/lib/drive";
import { AdUnlockGate } from "@/components/AdUnlockGate";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DocumentPage({ params }: { params: { id: string } }) {
  const doc = await getDocument(params.id);
  if (!doc) notFound();

  const pageNonce = issuePageNonce(doc.id);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr]">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-stamp">
          {doc.faculty} · {doc.year} · {doc.subject}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-parchment">{doc.title}</h1>

        <div className="mt-6 overflow-hidden rounded-lg border border-parchment/15 bg-parchment">
          <iframe
            src={drivePreviewUrl(doc.driveFileId)}
            className="h-[560px] w-full"
            allow="autoplay"
            title={doc.title}
          />
        </div>
      </div>

      <aside className="space-y-6">
        <div className="rounded-lg border border-parchment/15 bg-navy-light/40 p-5">
          <dl className="space-y-2 font-mono text-xs text-slate">
            <div className="flex justify-between">
              <dt>File type</dt>
              <dd className="text-parchment">{doc.fileType.toUpperCase()}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Views</dt>
              <dd className="text-parchment">{doc.views}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Downloads</dt>
              <dd className="text-parchment">{doc.downloads}</dd>
            </div>
          </dl>
        </div>

        <AdUnlockGate documentId={doc.id} pageNonce={pageNonce} fileTitle={doc.title} />
      </aside>
    </div>
  );
}

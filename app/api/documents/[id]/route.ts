import { NextResponse } from "next/server";
import { getDocument, incrementField } from "@/lib/kv";
import { issuePageNonce } from "@/lib/unlock";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const doc = await getDocument(params.id);
  if (!doc) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  incrementField(doc.id, "views").catch(() => {});

  return NextResponse.json({
    document: doc,
    pageNonce: issuePageNonce(doc.id)
  });
}

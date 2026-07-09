import { NextRequest, NextResponse } from "next/server";
import { getDocument, incrementField } from "@/lib/kv";
import { verifyDownloadToken } from "@/lib/unlock";
import { driveDownloadUrl } from "@/lib/drive";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token || !verifyDownloadToken(token, params.id)) {
    return NextResponse.json(
      { error: "Invalid or expired download link. Go back and unlock the download again." },
      { status: 401 }
    );
  }

  const doc = await getDocument(params.id);
  if (!doc) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  incrementField(doc.id, "downloads").catch(() => {});

  return NextResponse.redirect(driveDownloadUrl(doc.driveFileId));
}

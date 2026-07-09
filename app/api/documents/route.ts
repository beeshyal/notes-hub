import { NextRequest, NextResponse } from "next/server";
import { listDocuments } from "@/lib/kv";
import { Faculty } from "@/types/document";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const faculty = searchParams.get("faculty") as Faculty | null;
  const query = searchParams.get("q") ?? undefined;

  const docs = await listDocuments({
    faculty: faculty ?? undefined,
    query
  });

  return NextResponse.json({ documents: docs });
}

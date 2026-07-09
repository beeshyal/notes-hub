import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { verifyPageNonce, issueDownloadToken, adWaitSeconds } from "@/lib/unlock";

export async function POST(req: Request) {
  const { documentId, pageNonce } = await req.json();

  if (!documentId) {
    return NextResponse.json({ error: "documentId is required" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  if (session?.user) {
    return NextResponse.json({ token: issueDownloadToken(documentId) });
  }

  if (!pageNonce) {
    return NextResponse.json({ error: "Sign in or watch the ad to unlock this download." }, { status: 401 });
  }

  const verified = verifyPageNonce(pageNonce, documentId);
  if (!verified) {
    return NextResponse.json({ error: "This unlock link expired. Reload the page." }, { status: 401 });
  }

  const elapsedSeconds = (Date.now() - verified.issuedAt) / 1000;
  if (elapsedSeconds < adWaitSeconds()) {
    return NextResponse.json(
      { error: "Please finish watching the ad before downloading." },
      { status: 403 }
    );
  }

  return NextResponse.json({ token: issueDownloadToken(documentId) });
}

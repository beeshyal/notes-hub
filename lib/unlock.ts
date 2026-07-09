import crypto from "crypto";

const SECRET = () => process.env.UNLOCK_SECRET || "dev-secret-change-me";

function sign(payload: string) {
  return crypto.createHmac("sha256", SECRET()).update(payload).digest("hex");
}

/**
 * "Page nonce": issued when a document detail page loads. It encodes the
 * document id and the time the page was opened. The client must wait
 * AD_WAIT_SECONDS after this nonce was issued before it can be redeemed,
 * which is what makes the ad-viewing timer meaningful server-side rather
 * than something the client can just skip.
 */
export function issuePageNonce(documentId: string) {
  const issuedAt = Date.now();
  const payload = `${documentId}.${issuedAt}`;
  const sig = sign(payload);
  return Buffer.from(`${payload}.${sig}`).toString("base64url");
}

export function verifyPageNonce(nonce: string, documentId: string): { issuedAt: number } | null {
  try {
    const decoded = Buffer.from(nonce, "base64url").toString("utf8");
    const [docId, issuedAtStr, sig] = decoded.split(".");
    if (docId !== documentId) return null;
    const expectedSig = sign(`${docId}.${issuedAtStr}`);
    if (sig !== expectedSig) return null;
    return { issuedAt: Number(issuedAtStr) };
  } catch {
    return null;
  }
}

/**
 * Download token: short-lived, redeemable once the ad wait (or a signed-in
 * session) has been satisfied. Passed as a query param to the download route.
 */
export function issueDownloadToken(documentId: string) {
  const expires = Date.now() + 2 * 60 * 1000; // 2 minutes
  const payload = `${documentId}.${expires}`;
  const sig = sign(payload);
  return Buffer.from(`${payload}.${sig}`).toString("base64url");
}

export function verifyDownloadToken(token: string, documentId: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const [docId, expiresStr, sig] = decoded.split(".");
    if (docId !== documentId) return false;
    const expectedSig = sign(`${docId}.${expiresStr}`);
    if (sig !== expectedSig) return false;
    return Date.now() < Number(expiresStr);
  } catch {
    return false;
  }
}

export function adWaitSeconds() {
  return Number(process.env.AD_WAIT_SECONDS || 15);
}

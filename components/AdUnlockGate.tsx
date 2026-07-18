"use client";

import { useEffect, useRef, useState } from "react";
import { useSession, signIn } from "next-auth/react";

const AD_WAIT_SECONDS = Number(process.env.NEXT_PUBLIC_AD_WAIT_SECONDS ?? 15);
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const ADSENSE_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT;

type Mode = "choice" | "watching" | "ready" | "error";

export function AdUnlockGate({
  documentId,
  pageNonce,
  fileTitle
}: {
  documentId: string;
  pageNonce: string;
  fileTitle: string;
}) {
  const { data: session } = useSession();
  const [mode, setMode] = useState<Mode>("choice");
  const [secondsLeft, setSecondsLeft] = useState(AD_WAIT_SECONDS);
  const [errorMsg, setErrorMsg] = useState("");
  const adPushed = useRef(false);

  useEffect(() => {
    if (mode !== "watching") return;
    if (secondsLeft <= 0) {
      setMode("ready");
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [mode, secondsLeft]);

  useEffect(() => {
    if (mode === "watching" && !adPushed.current && ADSENSE_CLIENT) {
      try {
        // @ts-expect-error adsbygoogle is injected by the AdSense script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adPushed.current = true;
      } catch {
        /* ad blocked - the countdown still runs so download isn't blocked */
      }
    }
  }, [mode]);

  async function requestDownload() {
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId, pageNonce })
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Could not unlock the download.");
        setMode("error");
        return;
      }
      window.location.href = `/api/documents/${documentId}/download?token=${data.token}`;
    } catch {
      setErrorMsg("Something went wrong. Try again.");
      setMode("error");
    }
  }
  if (session?.user) {
    return (
      <button
        onClick={requestDownload}
        className="w-full rounded-md bg-ok px-6 py-3 text-center font-medium text-parchment transition hover:brightness-110"
      >
        Download &ldquo;{fileTitle}&rdquo;
      </button>
    );
  }

  if (mode === "choice") {
    return (
      <div className="space-y-3 rounded-lg border border-parchment/15 bg-navy-light/40 p-5">
        <p className="text-sm text-slate">
          Downloads are free. Sign in for an instant download, or watch a short ad instead.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => signIn("google")}
            className="flex-1 rounded-md bg-stamp px-5 py-2.5 text-sm font-medium text-parchment transition hover:bg-stamp-dark"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => setMode("watching")}
            className="flex-1 rounded-md border border-parchment/25 px-5 py-2.5 text-sm font-medium text-parchment transition hover:border-stamp"
          >
            Watch ad to unlock ({AD_WAIT_SECONDS}s)
          </button>
        </div>
      </div>
    );
  }
  
  if (mode === "watching") {
    return (
      <div className="space-y-3 rounded-lg border border-parchment/15 bg-navy-light/40 p-5">
        {ADSENSE_CLIENT && ADSENSE_SLOT ? (
          <ins
            className="adsbygoogle block min-h-[100px] bg-parchment/5"
            style={{ display: "block" }}
            data-ad-client={ADSENSE_CLIENT}
            data-ad-slot={ADSENSE_SLOT}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <div className="flex min-h-[100px] items-center justify-center rounded border border-dashed border-parchment/20 text-xs text-slate">
            Ad slot (set NEXT_PUBLIC_ADSENSE_CLIENT / _SLOT to go live)
          </div>
        )}
        <p className="text-center text-sm text-slate">
          Your download unlocks in <span className="text-parchment">{secondsLeft}s</span>
        </p>
      </div>
    );
  }

  if (mode === "ready") {
    return (
      <button
        onClick={requestDownload}
        className="w-full rounded-md bg-ok px-6 py-3 text-center font-medium text-parchment transition hover:brightness-110"
      >
        Download &ldquo;{fileTitle}&rdquo;
      </button>
    );
  }

  return (
    <div className="space-y-3 rounded-lg border border-stamp/40 bg-stamp/10 p-5">
      <p className="text-sm text-parchment">{errorMsg}</p>
      <button
        onClick={() => setMode("choice")}
        className="rounded-md border border-parchment/25 px-4 py-2 text-sm text-parchment hover:border-stamp"
      >
        Try again
      </button>
    </div>
  );
}

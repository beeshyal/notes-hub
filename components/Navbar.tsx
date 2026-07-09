"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const FACULTIES = ["BBS", "BBA", "MBA"] as const;

export function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b border-parchment/10 bg-navy-deep/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight text-parchment">
            Notes Hub
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-slate sm:inline">
            Reg. No. NPL-2082
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <div className="hidden gap-4 sm:flex">
            {FACULTIES.map((f) => (
              <Link
                key={f}
                href={`/browse/${f}`}
                className="font-mono text-xs uppercase tracking-widest text-slate transition hover:text-stamp"
              >
                {f}
              </Link>
            ))}
          </div>

          {status === "loading" ? null : session?.user ? (
            <button
              onClick={() => signOut()}
              className="rounded-full border border-parchment/20 px-4 py-1.5 text-sm text-parchment transition hover:border-stamp hover:text-stamp"
            >
              Sign out
            </button>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="rounded-full bg-stamp px-4 py-1.5 text-sm font-medium text-parchment transition hover:bg-stamp-dark"
            >
              Sign in
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

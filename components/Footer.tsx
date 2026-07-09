import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-parchment/10 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 text-xs text-slate sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono uppercase tracking-widest">
          © {new Date().getFullYear()} Notes Hub
        </p>
        <nav className="flex gap-5">
          <Link href="/about" className="hover:text-stamp">
            About
          </Link>
          <Link href="/privacy" className="hover:text-stamp">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-stamp">
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}

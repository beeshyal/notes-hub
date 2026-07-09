"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("q", value.trim());
    } else {
      params.delete("q");
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-xl gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search subject, e.g. Business Statistics"
        className="w-full rounded-md border border-parchment/20 bg-navy-light/60 px-4 py-2.5 text-sm text-parchment placeholder:text-slate focus:border-stamp"
      />
      <button
        type="submit"
        className="whitespace-nowrap rounded-md bg-stamp px-5 py-2.5 text-sm font-medium text-parchment transition hover:bg-stamp-dark"
      >
        Search
      </button>
    </form>
  );
}

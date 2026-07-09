export function StampBadge({ faculty, year }: { faculty: string; year: string }) {
  return (
    <div
      className="pointer-events-none absolute -right-2 -top-2 flex h-16 w-16 -rotate-12 select-none flex-col items-center justify-center rounded-full border-2 border-stamp/70 bg-parchment/95 text-stamp shadow-sm"
      aria-hidden="true"
    >
      <span className="font-mono text-[9px] font-medium leading-none tracking-wide">
        {faculty}
      </span>
      <span className="mt-0.5 h-px w-8 bg-stamp/50" />
      <span className="mt-0.5 font-mono text-[7px] leading-none tracking-tight">
        {year.replace(" Year", "")}
      </span>
    </div>
  );
}

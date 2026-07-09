export const metadata = { title: "Terms of Service — Notes Hub" };

export default function TermsPage() {
  return (
    <article className="max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-stamp">Legal</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-parchment">Terms of Service</h1>
      <p className="mt-2 text-sm text-slate">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-parchment/90">
        <section>
          <h2 className="font-display text-lg font-semibold text-parchment">Using Notes Hub</h2>
          <p className="mt-2">
            Notes Hub provides academic notes, question papers and reports for personal study
            use. By browsing or downloading from this site, you agree to these terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-parchment">Content accuracy</h2>
          <p className="mt-2">
            Notes are compiled from course material, past papers and student contributions.
            We try to keep them accurate and up to date, but they&apos;re a study aid, not a
            substitute for your official syllabus, textbook or instructor guidance. Always
            verify against your university&apos;s current curriculum before exams.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-parchment">Downloads and ads</h2>
          <p className="mt-2">
            Downloads are free. You can unlock a download either by signing in with Google or
            by viewing a short advertisement. Ad revenue is what keeps the site free and
            ad-supported instead of paywalled.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-parchment">Acceptable use</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Don&apos;t scrape, bulk-download, or redistribute the site&apos;s content commercially.</li>
            <li>Don&apos;t attempt to bypass the download gate through automated means.</li>
            <li>Don&apos;t upload or request upload of copyrighted material you don&apos;t have rights to share.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-parchment">Copyright concerns</h2>
          <p className="mt-2">
            If you believe a document on Notes Hub infringes your copyright, contact us via the{" "}
            <a href="/about" className="text-stamp underline">About page</a> and we&apos;ll review
            and remove it promptly.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-parchment">No warranty</h2>
          <p className="mt-2">
            Notes Hub is provided as-is, without warranty of any kind. We&apos;re not liable for
            exam outcomes, errors in notes, or downtime.
          </p>
        </section>
      </div>
    </article>
  );
}

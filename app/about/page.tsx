const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@bishal4.com.np";

export const metadata = { title: "About — Notes Hub" };

export default function AboutPage() {
  return (
    <article className="max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-stamp">About</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-parchment">
        Why Notes Hub exists
      </h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-parchment/90">
        <p>
          Notes Hub started as a simple idea: finding a clean, reliable copy of BBS or BBA
          notes before an exam shouldn&apos;t mean digging through a dozen Facebook groups
          and broken links. This site collects notes, question papers and report formats in
          one place, organized the way your exam file actually is — by faculty, year, and
          subject.
        </p>
        <p>
          Everything here is free to browse. Downloads stay free too — you just choose
          whether to sign in or watch a short ad, which is what keeps hosting and storage
          costs covered without a paywall.
        </p>

        <section>
          <h2 className="font-display text-lg font-semibold text-parchment">Contact</h2>
          <p className="mt-2">
            Found an error in a note, have a copyright concern, or want to contribute
            materials? Reach out at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-stamp underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}

export const metadata = { title: "Privacy Policy — Notes Hub" };

export default function PrivacyPage() {
  return (
    <article className="prose-invert max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-stamp">Legal</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-parchment">Privacy Policy</h1>
      <p className="mt-2 text-sm text-slate">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-parchment/90">
        <section>
          <h2 className="font-display text-lg font-semibold text-parchment">What Notes Hub is</h2>
          <p className="mt-2">
            Notes Hub is a free directory of BBS, BBA and MBA notes, question papers and
            reports for Nepali university students. Anyone can browse and search without
            an account.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-parchment">Information we collect</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>Google sign-in:</strong> if you choose to sign in to download instantly,
              we receive your name, email address and profile photo from Google. We use this
              only to identify your session — we don&apos;t sell it or share it with anyone
              outside of running the site.
            </li>
            <li>
              <strong>Usage data:</strong> we keep a simple view and download count per document
              to show what&apos;s popular. This isn&apos;t tied to your identity unless you&apos;re
              signed in.
            </li>
            <li>
              <strong>Cookies:</strong> used to keep you signed in, and by Google AdSense and
              Google Analytics-style services to serve and measure ads (see below).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-parchment">Advertising</h2>
          <p className="mt-2">
            Notes Hub uses Google AdSense to show ads that keep downloads free. Google and its
            partners may use cookies to serve ads based on your visits to this and other sites.
            You can opt out of personalized advertising by visiting{" "}
            <a href="https://adssettings.google.com" className="text-stamp underline">
              Google Ads Settings
            </a>{" "}
            or{" "}
            <a href="https://www.aboutads.info/choices" className="text-stamp underline">
              aboutads.info/choices
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-parchment">File storage</h2>
          <p className="mt-2">
            Uploaded notes are stored in a Google Drive folder managed by the site. We don&apos;t
            ask visitors to upload personal documents — only the site admin adds academic notes
            intended for public download.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-parchment">Your choices</h2>
          <p className="mt-2">
            You can browse and download every note on this site without signing in, by using
            the ad-supported download option instead. Signing out removes your session cookie
            immediately. To request removal of your Google account data, contact us using the
            details on the <a href="/about" className="text-stamp underline">About page</a>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-parchment">Changes</h2>
          <p className="mt-2">
            We may update this policy as the site grows. Material changes will be reflected on
            this page with a new &ldquo;last updated&rdquo; date.
          </p>
        </section>
      </div>
    </article>
  );
}

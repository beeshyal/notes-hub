# Notes Hub

A Scribd-style site for Nepali BBS / BBA / MBA notes and question papers.
Browsing is free for everyone. Downloading requires either signing in with
Google or watching a short ad — same pattern used by most Nepali note sites.

## How it works

- **Storage**: files live in your own Google Drive folder (same approach as
  ShareDrop). Metadata (title, faculty, subject, download counts) lives in
  Vercel KV.
- **Viewer login**: NextAuth with Google sign-in. No passwords to manage.
- **Upload**: `/upload` is only usable by emails listed in `ADMIN_EMAILS` —
  that's you, curating notes, not open public uploads.
- **Download gate**: `AdUnlockGate` either checks for a signed-in session, or
  runs a server-verified countdown (`AD_WAIT_SECONDS`) tied to an AdSense ad
  slot before issuing a short-lived, signed download link.

## 1. Google Cloud setup (two separate OAuth apps)

You need **two** OAuth clients in the [Google Cloud Console](https://console.cloud.google.com/):

**A. Viewer sign-in** (`GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`)
1. APIs & Services → Credentials → Create OAuth client ID → Web application.
2. Authorized redirect URI: `https://yourdomain.com/api/auth/callback/google`
   (and `http://localhost:3000/api/auth/callback/google` for local dev).

**B. Drive storage** (`DRIVE_CLIENT_ID` / `DRIVE_CLIENT_SECRET` / `DRIVE_REFRESH_TOKEN`)
1. Enable the **Google Drive API** on the same project.
2. Create a second OAuth client (Web application), redirect URI can be
   `https://developers.google.com/oauthplayground`.
3. Get a refresh token via [OAuth Playground](https://developers.google.com/oauthplayground):
   - Gear icon → check "Use your own OAuth credentials" → paste your client ID/secret.
   - Scope: `https://www.googleapis.com/auth/drive.file`.
   - Authorize, exchange for tokens, copy the **refresh token**.
4. Create a folder in your Drive for notes, copy its ID from the URL
   (`https://drive.google.com/drive/folders/<THIS_PART>`) into `DRIVE_FOLDER_ID`.

## 2. Vercel KV

In your Vercel project → Storage → create a KV (Redis) database and connect
it to this project. Vercel fills in `KV_URL`, `KV_REST_API_URL`,
`KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN` automatically.

> Note: `@vercel/kv` is in maintenance mode; Vercel now recommends the
> Upstash Redis integration under Marketplace. It still works today — if it's
> ever removed, swap `lib/kv.ts` to use `@upstash/redis` directly, the API is
> nearly identical.

## 3. AdSense

Sign up at [google.com/adsense](https://www.google.com/adsense), get your
publisher ID (`ca-pub-...`) and an ad unit slot ID, then set:

```
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_ADSENSE_SLOT=xxxxxxxxxx
```

Until AdSense approves your site, leave these blank — the download page
shows a placeholder box and the countdown still works, so nothing is
blocked in the meantime.

## 4. Environment variables

Copy `.env.example` to `.env.local` for development, and add the same keys
in Vercel → Settings → Environment Variables for production. Generate
`NEXTAUTH_SECRET` and `UNLOCK_SECRET` with:

```bash
openssl rand -base64 32
```

## 5. Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Sign in with the email you put in
`ADMIN_EMAILS`, then go to `/upload` to add your first note.

## 6. Deploy

Push to GitHub, import the repo in Vercel, attach the KV database, add the
environment variables, deploy. Update `NEXTAUTH_URL` and the Google OAuth
redirect URI to your production domain once it's live.

## Project structure

```
app/
  page.tsx                     home: hero, search, latest notes
  browse/[faculty]/page.tsx    faculty listing (BBS/BBA/MBA)
  document/[id]/page.tsx       preview + download gate
  upload/page.tsx              admin upload form
  api/
    documents/                 list, single doc, download redirect
    upload/                    admin-only Drive upload + KV write
    unlock/                    issues signed download tokens
    auth/[...nextauth]/        Google sign-in
lib/
  drive.ts     Google Drive upload/permissions/URLs
  kv.ts        document metadata CRUD + search
  auth.ts      NextAuth config + admin email check
  unlock.ts    HMAC nonce/token signing for the ad gate
components/
  Navbar, SearchBar, DocumentCard, StampBadge, AdUnlockGate
```

## Extending it later

- Add pagination to `listDocuments` once you have more than ~60 notes (KV
  search here is a simple in-memory filter, fine for a few hundred docs).
- Add a "report an issue" link per document, same pattern as your BBS portal.
- If you want open (non-admin) uploads later, add a pending/approved status
  field to `NoteDocument` and an approval queue, similar to your Campus
  registration system.
# notes-hub
# notes-hub

import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  title: "Notes Hub — BBS, BBA & MBA notes for Nepal",
  description:
    "Browse and download verified BBS, BBA and MBA notes, question papers and reports for Tribhuvan University students."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-body">
        <Providers>
          <Navbar />
          <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">{children}</main>
          <Footer />
        </Providers>
      </body>
      {ADSENSE_CLIENT && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      )}
    </html>
  );
}

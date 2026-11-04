import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import CanvasCursor from "@/components/fancyCursor/canvas-cursor";
import { AmbientAurora } from "@/components/effects/ambient-aurora";
import { site } from "@/lib/site";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description:
    "Full-stack developer in Dhaka building fast, reliable web products with React, Next.js, Node.js and PostgreSQL. Selected work, case studies and contact.",
  keywords: [
    "full stack developer",
    "React developer",
    "Next.js developer",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Dhaka",
    "Bangladesh",
    "freelance developer",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description:
      "Full-stack developer building fast, reliable web products with React, Next.js, Node.js and PostgreSQL.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description:
      "Full-stack developer building fast, reliable web products with React, Next.js, Node.js and PostgreSQL.",
    images: ["/og.png"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070708",
  colorScheme: "dark",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: siteUrl,
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  sameAs: site.socials
    .filter((s) => s.href.startsWith("http"))
    .map((s) => s.href),
  knowsAbout: [...site.stack],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${grotesk.variable} ${mono.variable}`}>
      <body className="grain min-h-screen bg-ink text-paper antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-black"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <AmbientAurora />
        <SiteNav />
        <main id="main" className="relative z-[1] bg-[rgba(7,7,8,0.35)]">
          {children}
        </main>
        <SiteFooter />
        <CanvasCursor />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}

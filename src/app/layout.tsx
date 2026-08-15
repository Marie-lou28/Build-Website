import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { intro } from "@/lib/content";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

/* No canonical URL or social image yet — those wait for the final domain. */
export const metadata: Metadata = {
  title: site.name,
  description: intro.tagline,
  openGraph: {
    title: site.name,
    description: intro.tagline,
    siteName: site.name,
    type: "website",
  },
};

/**
 * Runs before first paint so the correct theme class is on <html> immediately.
 * Without this you get a flash of light theme on every hard navigation.
 */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
        >
          Skip to content
        </a>
        {/* A nav bar arrives with /scoping, when there is somewhere to navigate. */}
        <main id="main" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}

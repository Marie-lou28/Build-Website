import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

/* No description, no Open Graph card and no canonical URL yet: those need real
   copy and the final domain. They go in during the build phase. */
export const metadata: Metadata = {
  title: site.name,
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
        {/* Nav and footer return in the build phase, once there is more than
            one page to navigate between. */}
        <main id="main" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}

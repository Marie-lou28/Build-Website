import { site } from "@/lib/site";

/**
 * Holding page.
 *
 * Says her name and that the site is being built, and claims nothing else.
 * Every other word on this page in the previous version was invented, so the
 * bar here is that a stranger who opens the URL early learns nothing false.
 */
export default function Home() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col justify-center px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {site.name}
      </h1>
      <p className="mt-4 text-base text-ink-muted">
        This site is being built. There will be something here shortly.
      </p>
    </div>
  );
}

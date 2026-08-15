import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col justify-center px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        This page does not exist
      </h1>
      <p className="mt-4 text-base text-ink-muted">
        The link may be out of date, or something may have moved.
      </p>
      <p className="mt-8">
        <Link href="/" className="text-ink underline underline-offset-4">
          Back to the home page
        </Link>
      </p>
    </div>
  );
}

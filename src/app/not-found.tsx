import { Button } from "@/components/button";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start py-32">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        This page does not exist
      </h1>
      <p className="mt-4 max-w-md text-ink-muted">
        The link may be out of date, or I may have moved something. The home page is a
        good place to pick the thread back up.
      </p>
      <div className="mt-8">
        <Button href="/">Back to home</Button>
      </div>
    </Container>
  );
}

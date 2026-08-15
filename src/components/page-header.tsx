import { Container } from "@/components/container";

/** Consistent title block at the top of every interior page. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  narrow = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  narrow?: boolean;
}) {
  return (
    <Container narrow={narrow} className="pt-16 pb-10 sm:pt-24 sm:pb-14">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h1>
      {lead && (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{lead}</p>
      )}
    </Container>
  );
}

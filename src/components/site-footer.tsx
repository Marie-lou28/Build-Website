import { Column } from "@/components/column";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <Column>
        <p className="text-sm text-ink-faint">
          {site.name} &middot; {new Date().getFullYear()}
        </p>
      </Column>
    </footer>
  );
}

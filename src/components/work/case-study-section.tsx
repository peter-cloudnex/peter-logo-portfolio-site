import type { ReactNode } from "react";

// `technical` headings switch to a mono, lowercase, "// comment"-style register —
// the visual cue that a reader has moved from narrative framing into inspectable detail.
export function CaseStudySection({
  id,
  title,
  variant = "narrative",
  children,
}: {
  id: string;
  title: string;
  variant?: "narrative" | "technical";
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border py-10 first:border-t-0 first:pt-0 sm:py-12">
      {variant === "technical" ? (
        <h2 className="font-mono text-h3 font-medium tracking-tight text-foreground">
          <span aria-hidden className="text-foreground-subtle">
            {"// "}
          </span>
          {title}
        </h2>
      ) : (
        <h2 className="text-h3 font-semibold tracking-tight text-foreground">{title}</h2>
      )}
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const alignClasses = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-3 ${alignClasses} ${className}`}>
      {eyebrow ? (
        <p className="font-mono text-meta uppercase tracking-[0.08em] text-foreground-subtle">{eyebrow}</p>
      ) : null}
      <h2 className="text-h2 font-semibold tracking-tight text-foreground">{title}</h2>
      {description ? <p className="max-w-prose text-body-lg text-foreground-muted">{description}</p> : null}
    </div>
  );
}

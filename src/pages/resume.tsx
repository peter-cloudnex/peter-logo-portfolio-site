import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonClasses } from "@/components/button";
import { Seo } from "@/components/seo";
import {
  trackEmailClick,
  trackGitHubClick,
  trackLinkedInClick,
  trackResumeDownload,
} from "@/lib/analytics";
import { SITE_EMAIL_HREF, SITE_JOB_TITLE, SITE_URLS } from "@/lib/site-config";
import { NewTabHint } from "@/components/text-link";
import {
  RESUME_AI_ENGINEERING,
  RESUME_CERTIFICATIONS,
  RESUME_EDUCATION,
  RESUME_EXPERIENCE,
  RESUME_PROFILE,
  RESUME_PROJECTS,
  RESUME_SKILLS,
} from "@/lib/resume";

function ResumeSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="text-h3 font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-body text-foreground-muted">
          <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-foreground-subtle" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ResumePage() {
  return (
    <>
      <Seo
        title={`Resume — Peter Logo, ${SITE_JOB_TITLE}`}
        description="Full-stack engineer résumé: experience, projects, skills, and downloadable document."
        path="/resume"
      />
      <Section>
        <Container width="reading">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-h1 font-semibold tracking-tight text-foreground">{RESUME_PROFILE.name}</h1>
              <p className="mt-2 text-h3 font-medium text-foreground-muted">{RESUME_PROFILE.title}</p>
              <p className="mt-2 text-meta text-foreground-subtle">{RESUME_PROFILE.location}</p>
            </div>
            <a
              href={SITE_URLS.resume}
              download
              className={buttonClasses("primary", "shrink-0 self-start print:hidden")}
              onClick={() => trackResumeDownload({ location: "resume", format: "pdf", page: "/resume" })}
            >
              Download résumé
            </a>
          </div>

          <nav
            aria-label="Résumé contact"
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-border pb-8 text-meta"
          >
            <a
              href={SITE_EMAIL_HREF}
              className="inline-flex min-h-11 items-center font-medium text-foreground-muted no-underline transition-colors duration-150 ease-out hover:text-foreground"
              onClick={() => trackEmailClick({ location: "resume", page: "/resume" })}
            >
              {SITE_URLS.email}
            </a>
            <span aria-hidden className="text-border-strong">
              /
            </span>
            <a
              href={SITE_URLS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center font-medium text-foreground-muted no-underline transition-colors duration-150 ease-out hover:text-foreground"
              onClick={() => trackGitHubClick({ location: "resume", page: "/resume" })}
            >
              GitHub
              <NewTabHint />
            </a>
            <span aria-hidden className="text-border-strong">
              /
            </span>
            <a
              href={SITE_URLS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center font-medium text-foreground-muted no-underline transition-colors duration-150 ease-out hover:text-foreground"
              onClick={() => trackLinkedInClick({ location: "resume", page: "/resume" })}
            >
              LinkedIn
              <NewTabHint />
            </a>
          </nav>

          <div className="mt-8 flex flex-col gap-10">
            <ResumeSection title="Professional summary">
              <p className="text-body text-foreground-muted">{RESUME_PROFILE.summary}</p>
            </ResumeSection>

            <ResumeSection title="AI engineering">
              <dl className="flex flex-col gap-4 text-body text-foreground-muted">
                <div>
                  <dt className="font-medium text-foreground">Models &amp; SDKs</dt>
                  <dd className="mt-1">{RESUME_AI_ENGINEERING.modelsAndSdks.join(", ")}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Specialisations</dt>
                  <dd className="mt-1">{RESUME_AI_ENGINEERING.specialisations.join(", ")}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Applied AI</dt>
                  <dd className="mt-1">{RESUME_AI_ENGINEERING.appliedAi.join(", ")}</dd>
                </div>
              </dl>
            </ResumeSection>

            <ResumeSection title="Skills">
              <dl className="flex flex-col gap-4 text-body text-foreground-muted">
                {RESUME_SKILLS.map((group) => (
                  <div key={group.name}>
                    <dt className="font-medium text-foreground">{group.name}</dt>
                    <dd className="mt-1">{group.items.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </ResumeSection>

            <ResumeSection title="Professional experience">
              <ol className="flex flex-col gap-8">
                {RESUME_EXPERIENCE.map((entry) => (
                  <li key={`${entry.company}-${entry.period}`} className="print:break-inside-avoid">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground">{entry.role}</h3>
                        <p className="text-body text-foreground-muted">
                          {entry.company} · {entry.location}
                        </p>
                      </div>
                      <p className="font-mono text-mono uppercase tracking-[0.08em] text-foreground-subtle">
                        {entry.period}
                      </p>
                    </div>
                    <div className="mt-3">
                      <BulletList items={entry.bullets} />
                    </div>
                  </li>
                ))}
              </ol>
            </ResumeSection>

            <ResumeSection title="Projects">
              <ol className="flex flex-col gap-8">
                {RESUME_PROJECTS.map((project) => (
                  <li key={project.name} className="print:break-inside-avoid">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground">{project.name}</h3>
                        <p className="text-body text-foreground-muted">{project.subtitle}</p>
                      </div>
                      {project.href ? (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-meta font-medium text-foreground-muted no-underline transition-colors duration-150 ease-out hover:text-foreground"
                        >
                          {project.href.replace(/^https?:\/\//, "")}
                          <NewTabHint />
                        </a>
                      ) : null}
                    </div>
                    <div className="mt-3">
                      <BulletList items={project.bullets} />
                    </div>
                  </li>
                ))}
              </ol>
            </ResumeSection>

            <ResumeSection title="Education">
              <ul className="flex flex-col gap-4">
                {RESUME_EDUCATION.map((item) => (
                  <li key={item.title}>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-body text-foreground-muted">
                      {item.org} · {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </ResumeSection>

            <ResumeSection title="Certifications">
              <ul className="flex flex-col gap-4">
                {RESUME_CERTIFICATIONS.map((item) => (
                  <li key={item.title}>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-body text-foreground-muted">
                      {item.org} · {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </ResumeSection>
          </div>

          <div className="mt-12 border-t border-border pt-8 print:hidden">
            <a
              href={SITE_URLS.resumeDocx}
              download
              className={buttonClasses("secondary")}
              onClick={() => trackResumeDownload({ location: "resume", format: "docx", page: "/resume" })}
            >
              Download Word (.docx)
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}

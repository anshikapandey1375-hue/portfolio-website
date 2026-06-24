import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight, Mail, Github, Linkedin, Download, Menu, X, Check, Phone, MapPin } from "lucide-react";
import profileAsset from "@/assets/profile.asset.json";
import resumeAsset from "@/assets/resume.asset.json";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anshika Pandey — Computer Science Student & Aspiring ML Engineer" },
      { name: "description", content: "Portfolio of Anshika Pandey, B.Tech Computer Science student at JK Lakshmipat University. Projects in web development, machine learning, and social-impact technology." },
      { property: "og:title", content: "Anshika Pandey — Portfolio" },
      { property: "og:description", content: "B.Tech CSE student at JK Lakshmipat University. Selected projects, achievements, and contact." },
      { property: "og:image", content: profileAsset.url },
      { name: "twitter:image", content: profileAsset.url },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

const SECTIONS = ["home", "about", "education", "projects", "skills", "achievements", "contact"] as const;
type Section = (typeof SECTIONS)[number];

const PROJECTS = [
  {
    title: "Asha Jugaad Diagnostics",
    blurb:
      "AI-based health triage platform empowering ASHA workers in rural India to assess patients, detect pregnancy risks, and trigger emergency responses with multilingual, real-time support.",
    tech: ["React", "AI Triage", "Multilingual", "Real-time"],
    github: "https://github.com/anshikapandey1375-hue/asha-jugaad-diagnostics",
    live: "https://asha-jugaad-diagnostics.vercel.app",
    accent: "Health · Social Impact",
  },
  {
    title: "Jugaad 2",
    blurb:
      "Iterative build extending the Jugaad initiative with a refined interface and deployed prototype — exploring lightweight, accessible tooling for first-mile users.",
    tech: ["React", "Vercel", "UI Iteration"],
    github: "https://github.com/anshikapandey1375-hue/jugaad2",
    live: "https://jugaad2.vercel.app",
    accent: "Prototype",
  },
  {
    title: "Blood Donation Networking System",
    blurb:
      "A platform that connects blood donors with patients and hospitals in real time. Users can register as donors, search by blood group, and receive urgent location-based donation requests.",
    tech: ["HTML", "CSS", "JavaScript", "Vercel"],
    github: "https://github.com/anshikapandey1375-hue/team26",
    live: "https://team26-iota.vercel.app",
    accent: "Healthcare · Hackathon",
  },
];

const SKILLS = [
  { group: "Programming Languages", items: ["C", "Python"] },
  { group: "Web Development", items: ["HTML", "CSS", "JavaScript (learning)"] },
  { group: "Tools", items: ["VS Code", "Git & GitHub", "Vercel"] },
  { group: "Core Concepts", items: ["Problem Solving", "Programming Fundamentals", "Algorithmic Thinking"] },
];

const ACHIEVEMENTS = [
  { year: "2025", title: "Academic Excellence Award", detail: "Recognised for sustained academic performance." },
  { year: "—", title: "Rajasthan Patrika Recognition", detail: "Awarded by Rajasthan Patrika for academic excellence." },
  { year: "—", title: "Best Singer Award", detail: "Extracurricular distinction." },
  { year: "2025", title: "IC Member — Competition Programming Club", detail: "JK Lakshmipat University." },
  { year: "2025", title: "Anchor — Sarang 2025", detail: "Hosted the university's flagship cultural event." },
  { year: "2025", title: "Volunteer — HackJKLU v5.0", detail: "Technical & Support Committee." },
];

function Portfolio() {
  const [active, setActive] = useState<Section>("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as Section);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <main className="grain relative min-h-screen">
      <Nav active={active} scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <About />
      <Education />
      <Projects />
      <Skills />
      <Achievements />
      <Contact />
      <Footer />
    </main>
  );
}

function Nav({
  active, scrolled, menuOpen, setMenuOpen,
}: { active: Section; scrolled: boolean; menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  const links: { id: Section; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "achievements", label: "Achievements" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-md bg-[#fafaf7]/80 border-b border-black/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#home" className="flex items-baseline gap-2 font-display text-xl tracking-tight">
          <span>Anshika</span>
          <span className="text-gold">.</span>
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              data-active={active === l.id}
              className="nav-link text-sm tracking-wide text-ink/80 hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="hidden lg:inline-flex btn-primary !py-2.5 !px-4 text-xs">
          Let’s talk <ArrowUpRight className="arrow size-4" />
        </a>
        <button
          aria-label="Toggle menu"
          className="lg:hidden rounded-full border border-black/10 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {menuOpen && (
        <div className="lg:hidden border-t border-black/5 bg-[#fafaf7]/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-3 text-sm hover:bg-black/5"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-24 lg:pt-44 lg:pb-32">
      <div className="ambient" />
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-slate-soft backdrop-blur">
              <span className="size-1.5 rounded-full bg-gold" />
              Available for Summer 2026 opportunities
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="font-display text-[clamp(2.4rem,6.2vw,4.8rem)] leading-[1.02] tracking-tight">
              Turning curiosity into <span className="italic text-gold">code</span>,
              <br className="hidden sm:block" /> and ideas into impact.
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-slate-soft lg:text-[17px]">
              A Computer Science undergraduate at JK Lakshmipat University, working at the intersection of machine learning, thoughtful interfaces, and social-impact engineering — quietly shipping small, real things on the web.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="mt-10 flex items-center gap-4">
              <div className="h-px w-12 bg-ink/30" />
              <span className="font-display text-2xl italic tracking-tight text-ink/90">
                Anshika Pandey
              </span>
            </div>
          </Reveal>
          <Reveal delay={4}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href={resumeAsset.url} download className="btn-primary">
                <Download className="size-4" /> Download Resume
              </a>
              <a href="#projects" className="btn-ghost">
                View Projects <ArrowUpRight className="arrow size-4" />
              </a>
              <a href="#contact" className="btn-ghost">
                Contact <ArrowUpRight className="arrow size-4" />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={2}>
            <figure className="group relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)] ring-1 ring-black/5">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#f0e6cf] via-[#fafaf7] to-[#e8edf3]" />
              <img
                src={profileAsset.url}
                alt="Portrait of Anshika Pandey"
                className="img-zoom h-full w-full object-cover"
                loading="eager"
              />
              <figcaption className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-full bg-white/85 px-4 py-2 text-xs text-ink backdrop-blur">
                <span className="font-medium">Jaipur, India</span>
                <span className="text-slate-soft">B.Tech CSE · 2025–29</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ kicker, title, lead }: { kicker: string; title: string; lead?: string }) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <Reveal>
        <div className="mb-4 text-[11px] uppercase tracking-[0.3em] text-gold">{kicker}</div>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="font-display text-4xl tracking-tight lg:text-5xl">{title}</h2>
      </Reveal>
      {lead && (
        <Reveal delay={2}>
          <p className="mt-5 text-base leading-relaxed text-slate-soft">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader kicker="About" title="A student, a builder, a beginner with intent." />
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-3">
          <Reveal delay={1}>
            <p className="font-display text-2xl leading-snug lg:col-span-2 lg:text-3xl">
              I’m an undergraduate at JK Lakshmipat University, drawn to the parts of computer science where careful engineering meets people’s everyday lives — health, access, learning.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <div className="space-y-5 text-[15px] leading-relaxed text-slate-soft">
              <p>
                My current focus is two fold: deepen the fundamentals — algorithms, data, systems — and keep shipping small, real things on the web. Most of what I build starts as a question I can’t put down.
              </p>
              <p>
                Outside class I anchor university events, volunteer ,coordinate  and contribute to the Competition Programming Club. I’m actively looking for a semester-exchange or research opportunity in machine learning.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-black/5 bg-black/5 lg:grid-cols-4">
          {[
            { k: "9.28", v: "CGPA" },
            { k: "2025–29", v: "B.Tech CSE" },
            { k: "3+", v: "Shipped Projects" },
            { k: "3", v: "Campus Roles" },
          ].map((s, i) => (
            <Reveal key={s.v} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <div className="bg-[#fafaf7] p-8 text-center">
                <div className="font-display text-3xl">{s.k}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-soft">{s.v}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="relative py-28 lg:py-36 bg-white/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader kicker="Education" title="Academics" />
        <div className="mx-auto max-w-4xl space-y-8">
          {[
            {
              school: "JK Lakshmipat University",
              degree: "B.Tech, Computer Science Engineering",
              meta: "2025 — 2029 · Jaipur, Rajasthan",
              highlight: "CGPA 9.28 · SGPA 9.38 · 0 backlogs",
              notes: [
                "First-year coursework across Python, C Programming, Linear Algebra and Differential equations, Digital Electronics and more.",
                "Active in the Competition Programming Club and university hackathons.",
              ],
            },
            {
              school: "Maheshwari Public School",
              degree: "Class XII — CBSE",
              meta: "2025 · Jaipur",
              highlight: "86.5% (Best of 4: 90.75%)",
              notes: ["Science stream, strong performance in mathematics and computer science."],
            },
            {
              school: "Maheshwari Public School",
              degree: "Class X — CBSE",
              meta: "2023 · Jaipur",
              highlight: "94.5%",
              notes: ["Awarded by Rajasthan Patrika for academic excellence."],
            },
          ].map((e, i) => (
            <Reveal key={e.school + i} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <article className="card-lift group grid grid-cols-1 gap-4 rounded-2xl border border-black/5 bg-white p-7 lg:grid-cols-12 lg:p-9">
                <div className="lg:col-span-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-gold">{e.meta}</div>
                  <h3 className="mt-3 font-display text-2xl leading-tight">{e.school}</h3>
                </div>
                <div className="lg:col-span-8">
                  <div className="text-sm font-medium">{e.degree}</div>
                  <div className="mt-1 text-sm text-gold">{e.highlight}</div>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-soft">
                    {e.notes.map((n) => (
                      <li key={n} className="flex gap-3">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-gold" />
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          kicker="Selected Work"
          title="Projects"
          lead="A small but growing body of work — every project below is mine, shipped from my own GitHub."
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <article className="card-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white">
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#f4ecd8] via-[#fafaf7] to-[#e8edf3]">
                  <div className="img-zoom absolute inset-0 flex items-center justify-center">
                    <div className="px-10 text-center">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-gold">{p.accent}</div>
                      <div className="mt-3 font-display text-3xl leading-tight text-ink/85">{p.title}</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-transparent transition-opacity duration-500 group-hover:from-black/10" />
                </div>
                <div className="flex flex-1 flex-col gap-5 p-7">
                  <h3 className="font-display text-2xl tracking-tight">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-soft">{p.blurb}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-full border border-black/10 bg-[#fafaf7] px-3 py-1 text-[11px] tracking-wide text-ink/70">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center gap-5 pt-2">
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="gold-underline inline-flex items-center gap-1.5 text-sm">
                      <Github className="size-4" /> GitHub
                    </a>
                    {p.live ? (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="gold-underline inline-flex items-center gap-1.5 text-sm">
                        Live <ArrowUpRight className="size-4" />
                      </a>
                    ) : (
                      <span className="text-xs text-slate-soft">Live demo coming soon</span>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-12 text-center">
            <a href="https://github.com/anshikapandey1375-hue" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              See all on GitHub <ArrowUpRight className="arrow size-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative py-28 lg:py-36 bg-white/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader kicker="Toolkit" title="Skills" lead="What I work with today, and what I’m actively sharpening." />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((s, i) => (
            <Reveal key={s.group} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <div className="card-lift h-full rounded-2xl border border-black/5 bg-white p-7">
                <div className="text-[11px] uppercase tracking-[0.25em] text-gold">{s.group}</div>
                <ul className="mt-5 space-y-3">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <span className="size-1.5 rounded-full bg-ink/70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader kicker="Recognition" title="Achievements & Roles" />
        <div className="mx-auto max-w-3xl">
          <ol className="relative border-l border-black/10 pl-8">
            {ACHIEVEMENTS.map((a, i) => (
              <Reveal key={a.title + i} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <li className="group relative pb-10 last:pb-0">
                  <span className="absolute -left-[37px] top-1.5 grid size-4 place-items-center rounded-full border border-gold bg-[#fafaf7] transition-transform duration-500 group-hover:scale-125">
                    <span className="size-1.5 rounded-full bg-gold" />
                  </span>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-gold">{a.year}</div>
                  <div className="mt-1 font-display text-2xl">{a.title}</div>
                  <p className="mt-2 text-sm text-slate-soft">{a.detail}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const errs: Record<string, string> = {};
    if (!name || name.length > 100) errs.name = "Please enter your name (1–100 chars).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) errs.email = "Please enter a valid email.";
    if (!message || message.length > 1500) errs.message = "Please enter a message (1–1500 chars).";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("submitting");
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:anshika.pandey1375@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => setStatus("success"), 400);
  }

  return (
    <section id="contact" className="relative py-28 lg:py-36 bg-white/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader kicker="Contact" title="Let’s start a conversation." lead="Open to internships, research roles, semester-exchange opportunities, and collaborations." />
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-6">
              <ContactRow
                icon={<Mail className="size-4" />}
                label="Email"
                value="anshika.pandey1375@gmail.com"
                href="mailto:anshika.pandey1375@gmail.com"
              />
              <ContactRow
                icon={<Linkedin className="size-4" />}
                label="LinkedIn"
                value="linkedin.com/in/anshika-pandey-635286378"
                href="https://www.linkedin.com/in/anshika-pandey-635286378"
                external
              />
              <ContactRow
                icon={<Github className="size-4" />}
                label="GitHub"
                value="github.com/anshikapandey1375-hue"
                href="https://github.com/anshikapandey1375-hue"
                external
              />
              <ContactRow
                icon={<Phone className="size-4" />}
                label="Phone"
                value="+91 63676 33904"
                href="tel:+916367633904"
              />
              <ContactRow
                icon={<MapPin className="size-4" />}
                label="Location"
                value="Jaipur, Rajasthan, India"
              />
            </div>
          </Reveal>

          <Reveal delay={1}>
            <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-black/5 bg-white p-8">
              <Field label="Your name" name="name" error={errors.name} />
              <Field label="Email address" name="email" type="email" error={errors.email} />
              <Field label="Message" name="message" textarea error={errors.message} />
              <button type="submit" disabled={status === "submitting"} className="btn-primary w-full justify-center">
                {status === "success" ? (
                  <><Check className="size-4" /> Email opened — finish in your mail app</>
                ) : status === "submitting" ? (
                  "Opening…"
                ) : (
                  <>Send message <ArrowUpRight className="arrow size-4" /></>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon, label, value, href, external,
}: { icon: React.ReactNode; label: string; value: string; href?: string; external?: boolean }) {
  const content = (
    <div className="group flex items-start gap-4 rounded-xl border border-transparent p-4 transition-colors hover:border-black/5 hover:bg-white">
      <span className="grid size-9 place-items-center rounded-full border border-black/10 bg-white text-ink/80 transition-transform duration-500 group-hover:scale-110 group-hover:text-gold">
        {icon}
      </span>
      <div>
        <div className="text-[11px] uppercase tracking-[0.25em] text-slate-soft">{label}</div>
        <div className="mt-1 text-sm">{value}</div>
      </div>
    </div>
  );
  if (!href) return content;
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>
  ) : (
    <a href={href}>{content}</a>
  );
}

function Field({
  label, name, type = "text", textarea, error,
}: { label: string; name: string; type?: string; textarea?: boolean; error?: string }) {
  const base =
    "peer w-full rounded-lg border border-black/10 bg-[#fafaf7] px-4 pt-6 pb-2 text-sm outline-none transition-all focus:border-gold focus:bg-white focus:ring-4 focus:ring-[#c8a96b]/15";
  return (
    <label className="relative block">
      {textarea ? (
        <textarea name={name} rows={5} placeholder=" " className={base} />
      ) : (
        <input name={name} type={type} placeholder=" " className={base} />
      )}
      <span className="pointer-events-none absolute left-4 top-2 text-[10px] uppercase tracking-[0.2em] text-slate-soft">
        {label}
      </span>
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-black/5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-xs text-slate-soft lg:flex-row lg:px-10">
        <div>© {new Date().getFullYear()} Anshika Pandey. Built with care in Jaipur.</div>
        <div className="flex items-center gap-5">
          <a href="https://github.com/anshikapandey1375-hue" target="_blank" rel="noopener noreferrer" className="gold-underline">GitHub</a>
          <a href="https://www.linkedin.com/in/anshika-pandey-635286378" target="_blank" rel="noopener noreferrer" className="gold-underline">LinkedIn</a>
          <a href="mailto:anshika.pandey1375@gmail.com" className="gold-underline">Email</a>
        </div>
      </div>
    </footer>
  );
}

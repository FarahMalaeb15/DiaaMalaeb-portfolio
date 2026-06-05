import { useState, useEffect, useRef } from "react";

const CV_DATA = {
  name: "Diaa Malaeb",
  title: "Full-Stack Developer",
  tagline: "Crafting impactful software solutions with precision & passion",
  contact: {
    email: "diaamolaeb@gmail.com",
    phone: "+961 70 125 702",
    location: "Aley, Lebanon",
    linkedin: "LinkedIn",
    github: "#",
  },
  about:
    "Computer Science graduate from the University of Balamand with a strong foundation in software development, databases, and problem-solving. Experienced in building web, mobile, and desktop applications using modern frameworks including React, Flutter, and NestJS. Skilled in networking concepts, game development, and full-stack engineering. Passionate about creating impactful software solutions and continuously expanding technical knowledge.",
  skills: [
    { category: "Frameworks & Mobile", items: ["React", "ReactJS", "NestJS", "Flutter", "Firebase"] },
    { category: "Languages & Web", items: ["JavaScript", "CSS", "HTML", "HTML5 Canvas", "Dart"] },
    { category: "Core Architecture", items: ["Object-Oriented Programming", "Database Design & Management", "RESTful API Integration", "Networking & Infrastructure Configuration"] },
    { category: "Methodologies & Domains", items: ["Full-stack Web Development", "Mobile Application Development", "Game Development (HTML/CSS/JS)", "Civic Tech & Community-Driven Development", "Agile Development Practices"] },
  ],
  experience: [
    {
      role: "Full-Stack & Mobile Developer",
      company: "Independent Projects / Tech Initiatives",
      period: "Spring 2026",
      description:
        "Engineered community-driven civic technologies and robust web architectures using modern JavaScript frameworks and mobile development platforms.",
      achievements: [
        "Architected multi-tier platforms utilizing ReactJS fronts and scalable NestJS backends.",
        "Built multi-platform mobile apps using Flutter with integrated cloud database architectures.",
        "Authored complete software lifecycle specifications following formal structural standards (IEEE 800-series)."
      ],
    },
  ],
  projects: [
    {
      title: "CyberSafe – Cybersecurity Awareness Platform",
      tech: ["React", "NestJS", "HTML", "CSS", "JavaScript", "REST APIs"],
      description: "Developed a full-stack web application aimed at promoting cybersecurity awareness among users. Built an interactive frontend and a scalable backend. Designed and implemented educational modules, quizzes, and awareness content.",
      metric: "Spring 2026",
    },
    {
      title: "StreetSnitch – Infrastructure & Problem Reporting App",
      tech: ["Flutter", "Firebase", "Firestore", "Authentication", "Storage", "Dart"],
      description: "Led development of a civic tech mobile application enabling Lebanese citizens to report local infrastructure issues to municipal authorities. Built citizen-facing app and municipality admin dashboard. Implemented real-time tracking, image uploads, role-based access, and review workflows. Delivered a full IEEE 830 Software Requirements Specification (SRS).",
      metric: "Spring 2026",
    },
    {
      title: "Browser-Based Game Suite",
      tech: ["HTML5 Canvas", "JavaScript", "CSS"],
      description: "Designed and implemented multiple games in the browser as part of a computer graphics course. Built a Super Mario-style platformer featuring player movement, collision detection, and enemy AI; a Tetris clone with rotation logic; and a Pac-Man clone with ghost AI.",
      metric: "Computer Graphics",
    }
  ],
  education: [
    {
      degree: "B.Sc. Computer Science",
      institution: "University of Balamand",
      year: "2026",
      detail: "Focused on Software Development, Databases, and Problem-Solving",
    },
  ],
};

function useScrollProgress() {
  const [scrollY, setScrollY] = useState(0);
  const [maxScroll, setMaxScroll] = useState(1);
  useEffect(() => {
    const update = () => {
      setScrollY(window.scrollY);
      setMaxScroll(document.body.scrollHeight - window.innerHeight || 1);
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return { scrollY, progress: scrollY / maxScroll };
}

function useScrollReveal() {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setRevealed(true);
        obs.disconnect();
      }
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, revealed ? "in-view" : ""];
}

function Noise() {
  return (
    <svg style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 999, opacity: 0.025 }}>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

function Cursor() {
  const pos = useRef({ x: 0, y: 0 });
  const dot = useRef(null);
  const ring = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    if (window.matchMedia("(max-width: 768px)").matches) return;

    let raf;
    const rx = { x: 0, y: 0 };
    const lerp = (a, b, t) => a + (b - a) * t;
    const loop = () => {
      rx.x = lerp(rx.x, pos.current.x, 0.12);
      rx.y = lerp(rx.y, pos.current.y, 0.12);
      if (ring.current) ring.current.style.transform = `translate(${rx.x - 20}px, ${rx.y - 20}px)`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) dot.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    };
    const over = (e) => setHovering(e.target.closest("a,button,[data-hover]") !== null);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      <div ref={dot} style={{ position: "fixed", top: 0, left: 0, width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", pointerEvents: "none", zIndex: 9999, mixBlendMode: "difference", transition: "transform 0.05s" }} />
      <div ref={ring} style={{ position: "fixed", top: 0, left: 0, width: 40, height: 40, borderRadius: "50%", border: `1.5px solid var(--ring-color)`, pointerEvents: "none", zIndex: 9998, transition: "border-color 0.2s, width 0.2s, height 0.2s", transform: "translate(-20px,-20px)" }} />
    </>
  );
}

function ProgressBar({ progress }) {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 1000 }}>
      <div style={{ height: "100%", background: "var(--accent)", width: `${progress * 100}%`, transition: "width 0.1s linear", boxShadow: "0 0 8px var(--glow)" }} />
    </div>
  );
}

function Nav({ activeSection, isSticky, onOpenPalette }) {
  const sections = ["about", "skills", "experience", "projects", "contact"];
  return (
    <nav className="nav-container" style={{ background: isSticky ? "rgba(0,0,0,0.92)" : "transparent", backdropFilter: isSticky ? "blur(12px)" : "none" }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, letterSpacing: "0.05em", color: "var(--accent)", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        DM
      </div>
      <div className="nav-links">
        {sections.map((s) => (
          <button key={s} onClick={() => document.getElementById(s)?.scrollIntoView({ behavior: "smooth" })} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Courier Prime', monospace", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: activeSection === s ? "var(--accent)" : "rgba(255,255,255,0.4)", transition: "color 0.3s", padding: 0 }} className="nav-item-magnet">
            {s}
          </button>
        ))}
        <button onClick={onOpenPalette} className="palette-nav-trigger" title="Open Menu (Cmd+K)">
          ⌘K
        </button>
      </div>
    </nav>
  );
}

function Hero({ scrollY, zoomThreshold }) {
  const titleScale = Math.max(0.4, 1.0 - scrollY * 0.001);
  const titleOpacity = Math.max(0, 1 - scrollY / (zoomThreshold * 0.8));
  const gridScale = Math.max(0.75, 1.0 - scrollY * 0.0004);
  const chars = CV_DATA.name.split("");

  return (
    <div style={{ position: "fixed", inset: 0, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#000", zIndex: 2, pointerEvents: scrollY > zoomThreshold ? "none" : "auto" }}>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${gridScale})`, backgroundImage: "radial-gradient(circle, var(--grid-dot) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div style={{ textAlign: "center", width: "100%", padding: "0 1.5rem", transform: `scale(${titleScale})`, opacity: titleOpacity, transition: "transform 0.01s linear, opacity 0.01s linear" }}>
        <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1.5rem" }}>
          Portfolio — 2026
        </div>

        <h1 className="hero-name-heading" style={{ fontSize: "clamp(2.5rem, 6vw, 4.8rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 1.5rem", color: "var(--accent)" }}>
          {chars.map((c, i) => (
            <span key={i} style={{ display: "inline-block", animation: `charIn 0.6s ${0.3 + i * 0.03}s both cubic-bezier(0.16,1,0.3,1)` }}>
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </h1>

        <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
          {CV_DATA.title}
        </div>
        
        <div className="terminal-hint-banner">
          Press <kbd>⌘K</kbd> or <kbd>Ctrl+K</kbd> to unlock full system console
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  const [revealRef, revealClass] = useScrollReveal();
  return (
    <section id="about" className="responsive-section" style={{ padding: "clamp(5rem, 15vw, 12rem) 0 6rem" }}>
      <div className="section-bounds">
        <div className="responsive-grid columns-about">
          <div>
            <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>
              01 — Overview
            </div>
            <h2 ref={revealRef} className={`reveal-text ${revealClass}`} style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.02em", color: "var(--accent)", margin: "0 0 2rem" }}>
              The<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.3)" }}>Profile</span>
            </h2>
          </div>
          <div>
            <p className="fade-up-text content-body-font" style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", marginBottom: "3rem", fontWeight: 300 }}>
              {CV_DATA.about}
            </p>
            <div className="responsive-grid columns-metadata">
              {[
                { label: "Location", value: CV_DATA.contact.location },
                { label: "Education", value: "University of Balamand" },
                { label: "Core Focus", value: "Impactful Software" },
                { label: "Engineering", value: "Full Stack & Architecture" },
              ].map(({ label, value }) => (
                <div key={label} style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1rem" }}>
                  <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "0.4rem" }}>{label}</div>
                  <div className="content-body-font" style={{ fontSize: "0.95rem", color: "var(--accent)", fontWeight: 400 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const [revealRef, revealClass] = useScrollReveal();
  return (
    <section id="skills" className="responsive-section" style={{ padding: "6rem 0", background: "#0a0a0a", position: "relative", overflow: "hidden" }}>
      <div className="ambient-bg-text">
        CORE
      </div>
      <div className="section-bounds" style={{ position: "relative" }}>
        <div style={{ marginBottom: "4rem" }}>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>
            02 — Capabilities
          </div>
          <h2 ref={revealRef} className={`reveal-text ${revealClass}`} style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 700, color: "var(--accent)", lineHeight: 0.95 }}>
            Core<br />Competencies
          </h2>
        </div>
        <div className="responsive-grid columns-skills" style={{ background: "rgba(255,255,255,0.08)", gap: "1px" }}>
          {CV_DATA.skills.map((group, gi) => (
            <div key={group.category} style={{ background: "#0a0a0a", padding: "clamp(1.5rem, 4vw, 2.5rem)" }}>
              <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1.25rem" }}>
                {String(gi + 1).padStart(2, "0")} — {group.category}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {group.items.map((item) => (
                  <span key={item} className="skill-pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const [active, setActive] = useState(0);
  const [revealRef, revealClass] = useScrollReveal();
  return (
    <section id="experience" className="responsive-section" style={{ padding: "6rem 0" }}>
      <div className="section-bounds">
        <div style={{ marginBottom: "4rem" }}>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>
            03 — Engagements
          </div>
          <h2 ref={revealRef} className={`reveal-text ${revealClass}`} style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 700, color: "var(--accent)", lineHeight: 0.95 }}>
            Timeline<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.3)" }}>& Focus</span>
          </h2>
        </div>
        <div className="responsive-grid columns-experience">
          <div className="exp-tabs">
            {CV_DATA.experience.map((exp, i) => (
              <button key={i} onClick={() => setActive(i)} className={`exp-tab-btn ${active === i ? "active" : ""}`}>
                <div className="tab-indicator" style={{ background: active === i ? "var(--accent)" : "transparent" }} />
                <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: active === i ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)", marginBottom: "0.3rem" }}>
                  {exp.period}
                </div>
                <div className="content-body-font" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                  {exp.company}
                </div>
              </button>
            ))}
          </div>
          <div className="exp-content-view">
            {CV_DATA.experience.map((exp, i) => (
              <div key={i} style={{ display: active === i ? "block" : "none" }} className="fade-in-vibe">
                <h3 className="section-subheading-font" style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--accent)", margin: "0 0 0.5rem", lineHeight: 1.2 }}>
                  {exp.role}
                </h3>
                <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "1.5rem" }}>
                  {exp.company} · {exp.period}
                </div>
                <p className="content-body-font" style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(255,255,255,0.55)", marginBottom: "2rem", fontWeight: 300 }}>
                  {exp.description}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {exp.achievements.map((ach, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "start", gap: "0.75rem" }}>
                      <div style={{ width: 12, height: 1, background: "rgba(255,255,255,0.3)", flexShrink: 0, marginTop: "0.6rem" }} />
                      <span className="content-body-font" style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", fontWeight: 400, lineHeight: 1.4 }}>
                        {ach}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [revealRef, revealClass] = useScrollReveal();
  return (
    <section id="projects" className="responsive-section" style={{ padding: "6rem 0", background: "#0a0a0a" }}>
      <div className="section-bounds">
        <div style={{ marginBottom: "4rem" }}>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>
            04 — Selected Code
          </div>
          <h2 ref={revealRef} className={`reveal-text ${revealClass}`} style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 700, color: "var(--accent)", lineHeight: 0.95 }}>
            Project<br />Showcase
          </h2>
        </div>
        <div className="responsive-grid columns-projects">
          {CV_DATA.projects.map((proj, i) => (
            <ProjectCard key={proj.title} proj={proj} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ proj, i }) {
  return (
    <div className="project-card-container">
      <div className="project-card-bg" />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1.25rem" }}>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
            {String(i + 1).padStart(2, "0")}
          </div>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em", fontWeight: 700 }}>
            {proj.metric}
          </div>
        </div>
        <h3 className="project-card-title">
          {proj.title}
        </h3>
        <p className="project-card-desc">
          {proj.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {proj.tech.map((t) => (
            <span key={t} className="project-tech-tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactSection() {
  const [revealRef, revealClass] = useScrollReveal();
  const items = [
    { label: "Email", value: CV_DATA.contact.email, href: `mailto:${CV_DATA.contact.email}` },
    { label: "Phone", value: CV_DATA.contact.phone, href: `tel:${CV_DATA.contact.phone.replace(/\s+/g, '')}` },
    { label: "LinkedIn", value: "Diaa Malaeb Profile", href: "#" },
    { label: "Location", value: CV_DATA.contact.location, href: null },
  ];
  return (
    <section id="contact" className="responsive-section" style={{ padding: "6rem 0 4rem" }}>
      <div className="section-bounds">
        <div style={{ marginBottom: "4rem" }}>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>
            05 — Interaction
          </div>
          <h2 ref={revealRef} className={`reveal-text ${revealClass}`} style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", fontWeight: 700, color: "var(--accent)", lineHeight: 0.95 }}>
            Get in<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.25)" }}>touch</span><br />directly.
          </h2>
        </div>
        <div className="responsive-grid columns-contact" style={{ background: "rgba(255,255,255,0.08)", gap: "1px" }}>
          {items.map(({ label, value, href }) => (
            <div key={label} className="contact-block-item">
              <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "0.75rem" }}>
                {label}
              </div>
              {href ? (
                <a href={href} className="contact-link-element">
                  {value}
                </a>
              ) : (
                <span className="content-body-font" style={{ fontSize: "1rem", color: "var(--accent)", fontWeight: 400 }}>{value}</span>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: "5rem", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
            © 2026 {CV_DATA.name}
          </div>
          <div className="footer-track-meta" style={{ fontStyle: "italic", fontSize: "0.85rem", color: "rgba(255,255,255,0.25)" }}>
            Designed via University of Balamand Track.
          </div>
        </div>
      </div>
    </section>
  );
}

function CommandPalette({ isOpen, onClose, onToggleTheme, isMatrixMode }) {
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  const commands = [
    { name: "Navigate: About Overview", action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) },
    { name: "Navigate: Core Capabilities", action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }) },
    { name: "Navigate: Career Timeline", action: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }) },
    { name: "Navigate: Project Showcase", action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) },
    { name: "Navigate: Direct Contact Links", action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
    { name: isMatrixMode ? "Theme: Restore Minimalist White" : "Theme: Initialize Matrix Terminal Mode", action: onToggleTheme },
    { name: "System: Trigger Resume File Sync (Download CV)", action: () => alert("Initiating secure CV pipeline stream download payload...") }
  ];

  const filtered = commands.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeys = (e) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex(prev => (prev + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex(prev => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[activeIndex]) {
          filtered[activeIndex].action();
          onClose();
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [isOpen, filtered, activeIndex]);

  if (!isOpen) return null;

  return (
    <div className="palette-backdrop" onClick={onClose}>
      <div className="palette-modal" onClick={e => e.stopPropagation()}>
        <div className="palette-search-wrapper">
          <span className="palette-terminal-prompt">❯</span>
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Type a command or filter architecture variables..." 
            value={search}
            onChange={e => { setSearch(e.target.value); setActiveIndex(0); }}
            className="palette-input"
          />
        </div>
        <div className="palette-results">
          {filtered.length > 0 ? (
            filtered.map((cmd, idx) => (
              <div 
                key={cmd.name}
                className={`palette-item ${idx === activeIndex ? "active" : ""}`}
                onClick={() => { cmd.action(); onClose(); }}
                onMouseEnter={() => setActiveIndex(idx)}
              >
                <span className="palette-item-bullet">⚡</span>
                {cmd.name}
              </div>
            ))
          ) : (
            <div className="palette-empty">No system parameters matched query pattern.</div>
          )}
        </div>
        <div className="palette-footer">
          <span>↑↓ to navigate</span>
          <span>↵ to execute</span>
          <span>esc to terminate console</span>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const { scrollY, progress } = useScrollProgress();
  const [activeSection, setActiveSection] = useState("about");
  const [zoomThreshold, setZoomThreshold] = useState(600);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isMatrixMode, setIsMatrixMode] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      setZoomThreshold(250);
    }
    const sections = ["about", "skills", "experience", "projects", "contact"];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.05 });
    sections.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // Monitor Global Hotkey Listeners for Core Shell Override Configuration
  useEffect(() => {
    const handleGlobalKbd = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalKbd);
    return () => window.removeEventListener("keydown", handleGlobalKbd);
  }, []);

  const t = Math.min(1, scrollY / zoomThreshold);
  const easeProgress = 1 - Math.pow(1 - t, 3);
  
  const contentScale = 0.5 + easeProgress * 0.5;
  const contentOpacity = Math.pow(t, 2);
  const isStickyNav = scrollY > zoomThreshold;

  return (
    <div style={{ background: "#000", minHeight: "400vh" }} data-theme={isMatrixMode ? "matrix" : "default"}>
      <Noise />
      <Cursor />
      <ProgressBar progress={progress} />
      <Nav activeSection={activeSection} isSticky={isStickyNav} onOpenPalette={() => setIsPaletteOpen(true)} />
      
      <Hero scrollY={scrollY} zoomThreshold={zoomThreshold} />
      
      <div 
        style={{
          position: scrollY <= zoomThreshold ? "fixed" : "relative",
          inset: 0,
          top: scrollY <= zoomThreshold ? 0 : `${zoomThreshold}px`,
          height: scrollY <= zoomThreshold ? "100vh" : "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          overflowY: scrollY <= zoomThreshold ? "hidden" : "visible",
          transform: `scale(${contentScale})`,
          opacity: contentOpacity,
          transformOrigin: "center center",
          zIndex: 5,
          background: "#000",
          pointerEvents: scrollY <= zoomThreshold ? "none" : "auto",
          transition: "transform 0.01s linear, opacity 0.01s linear"
        }}
      >
        <div style={{ width: "100%", height: "auto" }}>
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <ContactSection />
        </div>
      </div>

      <CommandPalette 
        isOpen={isPaletteOpen} 
        onClose={() => setIsPaletteOpen(false)} 
        isMatrixMode={isMatrixMode}
        onToggleTheme={() => setIsMatrixMode(prev => !prev)}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Courier+Prime:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');
        
        /* Theme Architecture Core Custom Properties Context Layout */
        :root {
          --accent: #ffffff;
          --ring-color: rgba(255,255,255,0.35);
          --glow: rgba(255,255,255,0.5);
          --grid-dot: rgba(255,255,255,0.06);
          --h-font: 'Playfair Display', serif;
          --b-font: 'DM Sans', sans-serif;
        }

        [data-theme="matrix"] {
          --accent: #00ff66;
          --ring-color: rgba(0,255,102,0.5);
          --glow: rgba(0,255,102,0.8);
          --grid-dot: rgba(0,255,102,0.08);
          --h-font: 'Courier Prime', monospace;
          --b-font: 'Courier Prime', monospace;
        }

        /* Enforce structural runtime dynamic theme switches */
        .hero-name-heading, .reveal-text { font-family: var(--h-font) !important; transition: color 0.3s; }
        .content-body-font, .section-subheading-font { font-family: var(--b-font) !important; }
        .ambient-bg-text { font-family: var(--h-font) !important; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); fontSize: 20vw; fontWeight: 700; color: rgba(255,255,255,0.01); whiteSpace: nowrap; pointerEvents: none; userSelect: none; }
        [data-theme="matrix"] .ambient-bg-text { color: rgba(0,255,102,0.02) !important; }
        .footer-track-meta { font-family: var(--h-font) !important; }

        @keyframes charIn { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        
        /* Premium Reveal-on-Scroll Core Physics */
        .reveal-text {
          position: relative;
          display: inline-block;
          opacity: 0;
          transform: translateY(15px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-text.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        .fade-up-text { animation: charIn 1s 0.2s both cubic-bezier(0.16, 1, 0.3, 1); }
        .fade-in-vibe { animation: charIn 0.5s both ease-out; }
        .responsive-section { width: 100%; background: #000; }
        .section-bounds { max-width: 1100px; margin: 0 auto; padding: 0 3rem; }
        .responsive-grid { display: grid; }

        /* Symmetric Flex Grid Profiles */
        .columns-about { grid-template-columns: 1fr 1.8fr; gap: 4rem; }
        .columns-metadata { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        .columns-skills { grid-template-columns: repeat(auto-fit, minmax(clamp(280px, 45vw, 500px), 1fr)); }
        .columns-experience { grid-template-columns: 240px 1fr; gap: 3rem; }
        .columns-projects { grid-template-columns: repeat(auto-fit, minmax(clamp(280px, 45vw, 500px), 1fr)); gap: 1.5rem; }
        .columns-contact { grid-template-columns: repeat(2, 1fr); }

        /* Navigation Style Elements */
        .nav-container {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 1.5rem 3rem; display: flex; justify-content: space-between;
          align-items: center; transition: all 0.4s ease;
        }
        .nav-links { display: flex; gap: 2rem; align-items: center; }
        
        .palette-nav-trigger {
          font-family: 'Courier Prime', monospace; font-size: 0.75rem; background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.15); color: var(--accent); padding: 0.25rem 0.6rem;
          border-radius: 4px; cursor: pointer; transition: all 0.2s;
        }

        /* Terminal Prompt Hint UI Banner Layout */
        .terminal-hint-banner {
          font-family: 'Courier Prime', monospace; font-size: 0.7rem; color: rgba(255,255,255,0.25);
          margin-top: 2.5rem; text-transform: uppercase; letter-spacing: 0.1em;
        }
        .terminal-hint-banner kbd {
          background: rgba(255,255,255,0.08); padding: 0.15rem 0.4rem; border-radius: 3px;
          border: 1px solid rgba(255,255,255,0.12); color: var(--accent); margin: 0 0.2rem;
        }

        /* Tactical Micro-Interactions */
        .skill-pill {
          font-family: var(--b-font); font-size: 0.85rem; color: var(--accent);
          border: 1px solid rgba(255,255,255,0.15); padding: 0.4rem 0.9rem;
          border-radius: 2px; background: transparent;
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), background 0.2s, color 0.2s, border-color 0.2s;
          will-change: transform;
        }

        /* Experience Elements */
        .exp-tab-btn {
          display: block; width: 100%; text-align: left; padding: 1.5rem 1rem 1.5rem 0;
          background: none; border: none; cursor: pointer;
          border-bottom: 1px solid rgba(255,255,255,0.06); position: relative; color: var(--accent);
        }
        .tab-indicator { position: absolute; left: -1px; top: 0; bottom: 0; width: 2px; transition: background 0.3s; }
        
        /* Elastic Project Frame Architecture */
        .project-card-container {
          border: 1px solid rgba(255,255,255,0.08); padding: 2.5rem;
          position: relative; overflow: hidden; background: transparent;
          transition: border-color 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }
        .project-card-bg { 
          position: absolute; inset: 0; background: var(--accent); 
          transform: scaleY(0); transform-origin: bottom; 
          transition: transform 0.5s cubic-bezier(0.85, 0, 0.15, 1); 
          z-index: 0; 
        }
        .project-card-title { font-family: var(--h-font); fontSize: 1.4rem; fontWeight: 700; color: var(--accent); marginBottom: 1rem; transition: color 0.3s; }
        .project-card-desc { font-family: var(--b-font); fontSize: 0.875rem; lineHeight: 1.6; color: rgba(255,255,255,0.4); marginBottom: 1.5rem; transition: color 0.3s; }
        .project-tech-tag { fontFamily: 'Courier Prime', monospace; fontSize: 0.65rem; color: rgba(255,255,255,0.35); border: 1px solid rgba(255,255,255,0.12); padding: 0.25rem 0.6rem; text-transform: uppercase; transition: all 0.3s; }

        /* Contact Block Styling */
        .contact-block-item { background: #000; padding: 2.5rem; transition: background 0.3s; }
        .contact-link-element { font-family: var(--b-font); fontSize: 1rem; color: var(--accent); text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 2px; transition: color 0.2s, border-color 0.2s; }

        /* ========================================================== */
        /* COMMAND PALETTE SHELL TERMINAL CORE CSS STYLES */
        /* ========================================================== */
        .palette-backdrop {
          position: fixed; inset: 0; background: rgba(0,0,0,0.85);
          backdrop-filter: blur(8px); display: flex; align-items: flex-start;
          justify-content: center; padding-top: 15vh; z-index: 99999;
          animation: fadeClear 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .palette-modal {
          width: 100%; max-width: 600px; background: #0d0d0d;
          border: 1px solid rgba(255,255,255,0.12); border-radius: 8px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05);
          overflow: hidden; animation: overlayScale 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        [data-theme="matrix"] .palette-modal { border-color: var(--accent); box-shadow: 0 0 20px rgba(0,255,102,0.2); }
        
        .palette-search-wrapper {
          display: flex; align-items: center; padding: 1.25rem;
          border-bottom: 1px solid rgba(255,255,255,0.08); gap: 0.75rem;
        }
        .palette-terminal-prompt { font-family: 'Courier Prime', monospace; font-size: 1rem; color: var(--accent); }
        .palette-input {
          flex: 1; background: transparent; border: none; outline: none;
          font-family: 'Courier Prime', monospace; font-size: 0.95rem; color: #fff;
        }
        .palette-input::placeholder { color: rgba(255,255,255,0.3); }
        
        .palette-results { max-height: 320px; overflow-y: auto; padding: 0.5rem; }
        .palette-item {
          display: flex; align-items: center; gap: 0.75rem; padding: 0.85rem 1rem;
          font-family: 'Courier Prime', monospace; font-size: 0.85rem; color: rgba(255,255,255,0.6);
          border-radius: 4px; cursor: pointer; transition: all 0.1s ease;
        }
        .palette-item-bullet { color: rgba(255,255,255,0.2); font-size: 0.65rem; }
        .palette-item.active {
          background: rgba(255,255,255,0.08); color: var(--accent);
        }
        [data-theme="matrix"] .palette-item.active { background: rgba(0,255,102,0.15); }
        .palette-item.active .palette-item-bullet { color: var(--accent); }
        
        .palette-empty { padding: 2rem; text-align: center; font-family: 'Courier Prime', monospace; font-size: 0.8rem; color: rgba(255,255,255,0.3); }
        
        .palette-footer {
          padding: 0.75rem 1.25rem; background: #080808; border-top: 1px solid rgba(255,255,255,0.05);
          display: flex; gap: 1.5rem; font-family: 'Courier Prime', monospace; font-size: 0.65rem; color: rgba(255,255,255,0.35);
        }
        
        @keyframes fadeClear { from { opacity: 0; } to { opacity: 1; } }
        @keyframes overlayScale { from { opacity: 0; transform: scale(0.97) translateY(-8px); } to { opacity: 1; transform: scale(1) translateY(0); } }

        /* Professional Desktop Hover States */
        @media (min-width: 769px) {
          * { cursor: none !important; }
          .nav-item-magnet:hover { color: var(--accent) !important; transform: translateY(-2px); }
          .palette-nav-trigger:hover { background: #fff !important; color: #000 !important; border-color: #fff !important; }
          [data-theme="matrix"] .palette-nav-trigger:hover { background: var(--accent) !important; color: #000 !important; }
          .skill-pill:hover { background: var(--accent) !important; color: #000 !important; border-color: var(--accent) !important; transform: translateY(-4px) scale(1.02); box-shadow: 0 10px 20px var(--glow); }
          
          .project-card-container:hover { transform: translateY(-6px); border-color: var(--ring-color); }
          .project-card-container:hover .project-card-bg { transform: scaleY(1); transform-origin: top; }
          .project-card-container:hover .project-card-title { color: #000 !important; }
          .project-card-container:hover .project-card-desc { color: rgba(0,0,0,0.7) !important; }
          .project-card-container:hover .project-tech-tag { color: rgba(0,0,0,0.6) !important; border-color: rgba(0,0,0,0.2) !important; }
          
          .contact-block-item:hover { background: #0e0e0e; }
          .contact-link-element:hover { color: rgba(255,255,255,0.7); border-color: var(--accent); }
        }

        /* Responsive Viewport Layout Conversions */
        @media (max-width: 768px) {
          .section-bounds { padding: 0 1.5rem !important; }
          .nav-container { padding: 1.25rem 1.5rem !important; }
          .nav-links { display: none !important; }
          .terminal-hint-banner { display: none !important; }
          
          .columns-about, .columns-metadata, .columns-skills, .columns-experience, .columns-projects, .columns-contact {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          
          .exp-tabs {
            display: flex !important; overflow-x: auto !important; border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.08) !important; margin-bottom: 1rem !important; padding-bottom: 0.5rem !important;
          }
          .exp-tab-btn { flex-shrink: 0 !important; width: auto !important; padding: 0.75rem 1.25rem !important; border-bottom: none !important; }
          .tab-indicator { left: 0 !important; right: 0 !important; top: auto !important; bottom: -1px !important; height: 2px !important; width: auto !important; }
          .exp-content-view { padding: 0 !important; }
          .contact-block-item { padding: 1.5rem 0 !important; border-bottom: 1px solid rgba(255,255,255,0.08); }
        }
      `}</style>
    </div>
  );
}
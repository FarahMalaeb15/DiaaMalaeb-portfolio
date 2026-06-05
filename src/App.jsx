import { useState, useEffect, useRef } from "react";

// Updated exactly using data from image_22432a.png
const CV_DATA = {
  name: "Diaa Malaeb",
  title: "Full-Stack Developer",
  tagline: "Crafting impactful software solutions with precision & passion",
  contact: {
    email: "diaamolaeb@gmail.com",
    phone: "+961 70 125 702",
    location: "Aley, Lebanon",
    linkedin: "LinkedIn", // Standard placeholder link reference from image
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
  // Derived from the core competencies and student engineering track in the CV image
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

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
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

  useEffect(() => {
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

  return (
    <>
      <div ref={dot} style={{ position: "fixed", top: 0, left: 0, width: 8, height: 8, borderRadius: "50%", background: "#fff", pointerEvents: "none", zIndex: 9999, mixBlendMode: "difference", transition: "transform 0.05s" }} />
      <div ref={ring} style={{ position: "fixed", top: 0, left: 0, width: 40, height: 40, borderRadius: "50%", border: `1.5px solid rgba(255,255,255,${hovering ? 0.8 : 0.35})`, pointerEvents: "none", zIndex: 9998, transition: "border-color 0.2s, width 0.2s, height 0.2s", transform: "translate(-20px,-20px)" }} />
    </>
  );
}

function ProgressBar({ progress }) {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 1000 }}>
      <div style={{ height: "100%", background: "#fff", width: `${progress * 100}%`, transition: "width 0.1s linear", boxShadow: "0 0 8px rgba(255,255,255,0.5)" }} />
    </div>
  );
}

function Nav({ activeSection, isSticky }) {
  const sections = ["about", "skills", "experience", "projects", "contact"];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "1.5rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: isSticky ? "rgba(0,0,0,0.85)" : "transparent", backdropFilter: isSticky ? "blur(10px)" : "none", transition: "all 0.5s ease" }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.05em", color: "#fff", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        DM
      </div>
      <div style={{ display: "flex", gap: "2rem" }}>
        {sections.map((s) => (
          <button key={s} onClick={() => document.getElementById(s)?.scrollIntoView({ behavior: "smooth" })} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Courier Prime', monospace", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: activeSection === s ? "#fff" : "rgba(255,255,255,0.4)", transition: "color 0.3s", padding: 0 }}>
            {s}
          </button>
        ))}
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
      <div style={{ position: "absolute", inset: 0, transform: `scale(${gridScale})`, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div style={{ textAlign: "center", width: "100%", padding: "0 2rem", transform: `scale(${titleScale})`, opacity: titleOpacity, transition: "transform 0.05s linear, opacity 0.05s linear" }}>
        <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1.5rem" }}>
          Portfolio — 2026
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.0rem, 5.5vw, 4.8rem)", fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.02em", margin: "0 0 1.5rem", color: "#fff" }}>
          {chars.map((c, i) => (
            <span key={i} style={{ display: "inline-block", animation: `charIn 0.6s ${0.5 + i * 0.04}s both cubic-bezier(0.16,1,0.3,1)` }}>
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </h1>

        <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
          {CV_DATA.title}
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  const [ref, inView] = useInView();
  return (
    <section id="about" ref={ref} style={{ padding: "12rem 0 10rem", background: "#000" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 3rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "6rem", alignItems: "start" }}>
          <div>
            <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>
              01 — Overview
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 5vw, 5rem)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.02em", color: "#fff", margin: 0 }}>
              The<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.3)" }}>Profile</span>
            </h2>
          </div>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", lineHeight: 1.8, color: "rgba(255,255,255,0.6)", marginBottom: "3rem", fontWeight: 300 }}>
              {CV_DATA.about}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              {[
                { label: "Location", value: CV_DATA.contact.location },
                { label: "Education", value: "University of Balamand" },
                { label: "Core Focus", value: "Impactful Software" },
                { label: "Engineering", value: "Full Stack & Architecture" },
              ].map(({ label, value }) => (
                <div key={label} style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1rem" }}>
                  <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "0.4rem" }}>{label}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#fff", fontWeight: 400 }}>{value}</div>
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
  const [ref, inView] = useInView();
  return (
    <section id="skills" ref={ref} style={{ padding: "10rem 0", background: "#0a0a0a", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Playfair Display', serif", fontSize: "20vw", fontWeight: 700, color: "rgba(255,255,255,0.015)", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none", letterSpacing: "-0.05em" }}>
        CORE
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 3rem", position: "relative" }}>
        <div style={{ marginBottom: "5rem" }}>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>
            02 — Capabilities
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 700, color: "#fff", lineHeight: 0.95, letterSpacing: "-0.02em" }}>
            Core<br />Competencies
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: "rgba(255,255,255,0.08)" }}>
          {CV_DATA.skills.map((group, gi) => (
            <div key={group.category} style={{ background: "#0a0a0a", padding: "3rem" }}>
              <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1.5rem" }}>
                {String(gi + 1).padStart(2, "0")} — {group.category}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {group.items.map((item) => (
                  <span key={item} data-hover style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", padding: "0.4rem 0.9rem", borderRadius: 2, transition: "all 0.2s", cursor: "default", background: "transparent", fontWeight: 400 }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#000"; e.currentTarget.style.borderColor = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}>
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
  const [ref, inView] = useInView();
  const [active, setActive] = useState(0);
  return (
    <section id="experience" ref={ref} style={{ padding: "10rem 0", background: "#000" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 3rem" }}>
        <div style={{ marginBottom: "5rem" }}>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>
            03 — Engagements
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 700, color: "#fff", lineHeight: 0.95, letterSpacing: "-0.02em" }}>
            Timeline<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.3)" }}>& Focus</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "0" }}>
          <div style={{ borderRight: "1px solid rgba(255,255,255,0.08)" }}>
            {CV_DATA.experience.map((exp, i) => (
              <button key={i} onClick={() => setActive(i)} data-hover style={{ display: "block", width: "100%", textAlign: "left", padding: "2rem 2rem 2rem 0", background: "none", border: "none", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative" }}>
                <div style={{ position: "absolute", left: -1, top: 0, bottom: 0, width: 2, background: active === i ? "#fff" : "transparent", transition: "background 0.3s" }} />
                <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: active === i ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)", marginBottom: "0.5rem", transition: "color 0.3s" }}>
                  {exp.period}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 500, color: active === i ? "#fff" : "rgba(255,255,255,0.35)", transition: "color 0.3s" }}>
                  {exp.role}
                </div>
              </button>
            ))}
          </div>
          <div style={{ padding: "0 0 0 4rem" }}>
            {CV_DATA.experience.map((exp, i) => (
              <div key={i} style={{ display: active === i ? "block" : "none" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#fff", margin: "0 0 0.5rem", lineHeight: 1.2 }}>
                  {exp.role}
                </h3>
                <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "2rem" }}>
                  {exp.company} · {exp.period}
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.8, color: "rgba(255,255,255,0.55)", marginBottom: "2.5rem", fontWeight: 300 }}>
                  {exp.description}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {exp.achievements.map((ach, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", fontWeight: 400 }}>
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
  const [ref, inView] = useInView();
  return (
    <section id="projects" ref={ref} style={{ padding: "10rem 0", background: "#0a0a0a", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 3rem" }}>
        <div style={{ marginBottom: "5rem" }}>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>
            04 — Selected Code
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 700, color: "#fff", lineHeight: 0.95, letterSpacing: "-0.02em" }}>
            Project<br />Showcase
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {CV_DATA.projects.map((proj, i) => (
            <ProjectCard key={proj.title} proj={proj} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ proj, i, inView }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div data-hover onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "2.5rem", position: "relative", overflow: "hidden", background: hovered ? "rgba(255,255,255,0.03)" : "transparent", cursor: "default" }}>
      <div style={{ position: "absolute", inset: 0, background: "#fff", transform: hovered ? "scaleY(1)" : "scaleY(0)", transformOrigin: "bottom", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1.5rem" }}>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: hovered ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.25)" }}>
            {String(i + 1).padStart(2, "0")}
          </div>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.7rem", color: hovered ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.35)", letterSpacing: "0.05em", fontWeight: 700 }}>
            {proj.metric}
          </div>
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: hovered ? "#000" : "#fff", lineHeight: 1.2, marginBottom: "1rem" }}>
          {proj.title}
        </h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", lineHeight: 1.7, color: hovered ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)", marginBottom: "2rem", fontWeight: 300 }}>
          {proj.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {proj.tech.map((t) => (
            <span key={t} style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: hovered ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.35)", border: `1px solid ${hovered ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.12)"}`, padding: "0.25rem 0.6rem", borderRadius: 2, textTransform: "uppercase" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactSection() {
  const [ref, inView] = useInView();
  const items = [
    { label: "Email", value: CV_DATA.contact.email, href: `mailto:${CV_DATA.contact.email}` },
    { label: "Phone", value: CV_DATA.contact.phone, href: `tel:${CV_DATA.contact.phone.replace(/\s+/g, '')}` },
    { label: "LinkedIn", value: "Diaa Malaeb Profile", href: "#" },
    { label: "Location", value: CV_DATA.contact.location, href: null },
  ];
  return (
    <section id="contact" ref={ref} style={{ padding: "10rem 0", background: "#000" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 3rem" }}>
        <div style={{ marginBottom: "6rem" }}>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>
            05 — Interaction
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 7vw, 7rem)", fontWeight: 700, color: "#fff", lineHeight: 0.9, letterSpacing: "-0.03em" }}>
            Get in<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.25)" }}>touch</span><br />directly.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: "rgba(255,255,255,0.08)" }}>
          {items.map(({ label, value, href }) => (
            <div key={label} style={{ background: "#000", padding: "2.5rem 3rem" }}>
              <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "0.75rem" }}>
                {label}
              </div>
              {href ? (
                <a href={href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#fff", textDecoration: "none", fontWeight: 400, borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: "2px" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"}>
                  {value}
                </a>
              ) : (
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#fff", fontWeight: 400 }}>{value}</span>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: "6rem", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
            © 2026 {CV_DATA.name}
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "0.875rem", color: "rgba(255,255,255,0.25)" }}>
            Designed via University of Balamand Track.
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const { scrollY, progress } = useScrollProgress();
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const sections = ["about", "skills", "experience", "projects", "contact"];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.1 });
    sections.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const zoomThreshold = 600;
  
  let contentScale, contentOpacity, isPassedIntro;
  
  if (scrollY <= zoomThreshold) {
    const t = scrollY / zoomThreshold;
    const easeProgress = Math.pow(t, 1.5); 
    
    contentScale = 0.35 + easeProgress * 0.65;
    contentOpacity = Math.pow(t, 2);
    isPassedIntro = false;
  } else {
    contentScale = 1;
    contentOpacity = 1;
    isPassedIntro = true;
  }

  return (
    <div style={{ background: "#000", minHeight: "400vh" }}>
      <Noise />
      <Cursor />
      <ProgressBar progress={progress} />
      <Nav activeSection={activeSection} isSticky={scrollY > zoomThreshold} />
      
      <Hero scrollY={scrollY} zoomThreshold={zoomThreshold} />
      
      <div 
        style={
          !isPassedIntro 
            ? {
                position: "fixed",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                overflowY: "hidden",
                transform: `scale(${contentScale})`,
                opacity: contentOpacity,
                transformOrigin: "center center",
                zIndex: 5,
                background: "#000",
                pointerEvents: "none",
                transition: "transform 0.08s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.05s linear"
              }
            : {
                position: "relative",
                zIndex: 5,
                background: "#000",
                marginTop: `${zoomThreshold}px`,
                transform: "scale(1)",
                opacity: 1
              }
        }
      >
        <div style={{ width: "100%", height: "auto" }}>
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <ContactSection />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Courier+Prime:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes charIn { from { opacity:0; transform:translateY(40px) skewY(2deg); } to { opacity:1; transform:translateY(0) skewY(0); } }
        * { cursor: none !important; }
      `}</style>
    </div>
  );
}
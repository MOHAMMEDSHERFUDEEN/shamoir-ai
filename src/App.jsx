
import {
  useEffect,
  useRef,
  useState,
  lazy,
  Suspense,
} from "react";

import {
  ArrowUpRight,
  Menu,
  X,
  ArrowRight,
  BrainCircuit,
  Code2,
  Workflow,
  MessageSquare,
  Layers3,
  Cpu,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  Sparkles as SparkleIcon,
} from "lucide-react";

import "./App.css";

const AdvancedHero3D = lazy(() => import("./AdvancedHero3D.jsx"));

/* MAGNETIC INTERACTIVE LINK */
function MagneticLink({
  href,
  className = "",
  children,
  target,
  rel,
  onClick,
}) {
  const linkRef = useRef(null);

  const handlePointerMove = (event) => {
    if (event.pointerType !== "mouse") return;

    const element = linkRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    element.style.transform =
      `translate3d(${x * 0.12}px, ${y * 0.12}px, 0)`;

    element.style.filter =
      "drop-shadow(0 8px 18px rgba(16,166,107,0.22))";
  };

  const handlePointerLeave = () => {
    const element = linkRef.current;
    if (!element) return;

    element.style.transform = "translate3d(0,0,0)";
    element.style.filter = "";
  };

  return (
    <a
      ref={linkRef}
      href={href}
      className={`magnetic-button ${className}`}
      target={target}
      rel={rel}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </a>
  );
}

/* PREMIUM CUSTOM CURSOR */
function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(pointer: fine) and (min-width: 701px)"
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (!finePointer.matches || reducedMotion.matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;

    if (!ring || !dot) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let animationFrame = null;
    let visible = false;

    document.body.classList.add("shamoir-custom-cursor");

    const animate = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;

      ring.style.transform =
        `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

      const distance = Math.hypot(
        targetX - currentX,
        targetY - currentY
      );

      if (distance > 0.15) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        animationFrame = null;
      }
    };

    const handlePointerMove = (event) => {
      if (event.pointerType !== "mouse") return;

      targetX = event.clientX;
      targetY = event.clientY;

      dot.style.transform =
        `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;

      if (!visible) {
        visible = true;
        ring.classList.add("cursor-visible");
        dot.classList.add("cursor-visible");
      }

      if (!animationFrame) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const handlePointerOver = (event) => {
      if (!(event.target instanceof Element)) return;

      const interactive = event.target.closest(
        "a, button, input, textarea, select, [role='button'], .product-card, .capability-card"
      );

      ring.classList.toggle("cursor-hover", Boolean(interactive));
    };

    const handlePointerDown = () => {
      ring.classList.add("cursor-pressed");
    };

    const handlePointerUp = () => {
      ring.classList.remove("cursor-pressed");
    };

    const handlePointerLeave = () => {
      visible = false;
      ring.classList.remove("cursor-visible", "cursor-hover");
      dot.classList.remove("cursor-visible");
    };

    const handlePointerEnter = () => {
      visible = true;
      ring.classList.add("cursor-visible");
      dot.classList.add("cursor-visible");
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    document.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("pointerenter", handlePointerEnter);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("pointerenter", handlePointerEnter);

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      document.body.classList.remove("shamoir-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="shamoir-cursor-ring" />
      <div ref={dotRef} className="shamoir-cursor-dot" />
    </>
  );
}

/* PRODUCTS */
const products = [
  {
    number: "01",
    name: "ZeeWash",
    type: "INTELLIGENT DIGITAL PRODUCT",
    description:
      "Discover our first product — a modern digital experience designed to make everyday tasks simpler.",
    url: "https://zeewash-ui.vercel.app/",
    status: "AVAILABLE",
  },
  {
    number: "02",
    name: "Coming Next",
    type: "NEXT IN OUR ECOSYSTEM",
    description:
      "We are working on the next intelligent product in the SHAMOIR AI ecosystem.",
    url: null,
    status: "IN DEVELOPMENT",
  },
];

/* CAPABILITIES */
const capabilities = [
  {
    icon: BrainCircuit,
    number: "01",
    title: "AI APPLICATIONS",
    description:
      "Intelligent applications built to solve meaningful real-world problems.",
  },
  {
    icon: Workflow,
    number: "02",
    title: "INTELLIGENT AUTOMATION",
    description:
      "Smarter workflows that reduce repetitive work and improve efficiency.",
  },
  {
    icon: Code2,
    number: "03",
    title: "SOFTWARE DEVELOPMENT",
    description:
      "Modern web applications and software built for real-world use.",
  },
  {
    icon: MessageSquare,
    number: "04",
    title: "AI ASSISTANTS",
    description:
      "Conversational experiences that help people access information and get things done.",
  },
  {
    icon: Layers3,
    number: "05",
    title: "UI / UX DESIGN",
    description:
      "Thoughtful interfaces combining clarity, usability and visual identity.",
  },
  {
    icon: Cpu,
    number: "06",
    title: "DIGITAL PRODUCTS",
    description:
      "A growing ecosystem of useful, connected digital experiences.",
  },
];

/* 3D HERO */
function Hero3D({ scrollProgress }) {
  return (
    <div className="hero-visual">
      <div className="hero-orbit hero-orbit-one" />
      <div className="hero-orbit hero-orbit-two" />

      <div
        className="advanced-hero-3d"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Suspense
          fallback={
            <div className="hero-3d-loading">
              <span className="status-dot" />
            </div>
          }
        >
          <AdvancedHero3D scrollProgress={scrollProgress} />
        </Suspense>
      </div>

      <div className="visual-caption">
        <span className="status-dot" />
        INTELLIGENCE IN MOTION
      </div>
    </div>
  );
}

/* SCROLL REVEAL */
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* MAIN WEBSITE */
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;

        const progress =
          scrollableHeight > 0
            ? window.scrollY / scrollableHeight
            : 0;

        setScrollProgress(Math.min(1, Math.max(0, progress)));
        setScrolled(window.scrollY > 30);

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    ["ABOUT", "#about"],
    ["ECOSYSTEM", "#ecosystem"],
    ["CAPABILITIES", "#capabilities"],
    ["TECHNOLOGY", "#technology"],
    ["CONTACT", "#contact"],
  ];

  return (
    <main
      className="shamoir-site"
      style={{
        "--scroll-progress": scrollProgress,
        "--scroll-glow-y": `${scrollProgress * 100}%`,
      }}
    >
      <CustomCursor />

      <div
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <div className="background-glow" />
      <div className="ambient-grid" />

      {/* NAVIGATION */}
      <header className={`site-header ${scrolled ? "header-scrolled" : ""}`}>
        <a href="#home" className="brand" onClick={closeMenu}>
          <img src="/shamoir-logo.png" alt="SHAMOIR AI emblem" />
          <span>
            SHAMOIR <b>AI</b>
          </span>
        </a>

        <nav className={`navigation ${menuOpen ? "navigation-open" : ""}`}>
          {navLinks.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}

          <MagneticLink
            href="#contact"
            className="mobile-contact"
            onClick={closeMenu}
          >
            LET'S TALK <ArrowUpRight size={15} />
          </MagneticLink>
        </nav>

        <MagneticLink href="#contact" className="header-cta">
          LET'S TALK <ArrowUpRight size={15} />
        </MagneticLink>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* HERO */}
      <section className="hero-section" id="home">
        <div className="hero-copy">
          <Reveal>
            <div className="eyebrow">
              <span className="eyebrow-line" />
              AN AI INNOVATION COMPANY
            </div>
          </Reveal>

          <Reveal>
            <h1>
              SHAMOIR
              <span className="hero-ai">
                AI<span className="hero-period">.</span>
              </span>
            </h1>
          </Reveal>

          <Reveal>
            <h2>
              Beyond Imagination<span>.</span>
            </h2>
          </Reveal>

          <Reveal>
            <p className="hero-description">
              We transform ambitious ideas into intelligent digital products.
              Building technology that moves possibilities beyond imagination.
            </p>
          </Reveal>

          <Reveal>
            <div className="hero-actions">
              <MagneticLink href="#ecosystem" className="button-primary">
                EXPLORE OUR PRODUCTS <ArrowUpRight size={17} />
              </MagneticLink>

              <MagneticLink href="#about" className="button-secondary">
                DISCOVER SHAMOIR <ArrowRight size={16} />
              </MagneticLink>
            </div>
          </Reveal>

          <div className="hero-location">
            <MapPin size={14} /> CHENNAI, INDIA
            <span />
            INDEPENDENT AI INNOVATION
          </div>
        </div>

        <Reveal className="hero-scene-wrap">
          <Hero3D scrollProgress={scrollProgress} />
        </Reveal>

        <a href="#about" className="scroll-indicator">
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown size={17} />
        </a>

        <div className="hero-index">01 / 06</div>
      </section>

      {/* ABOUT */}
      <section className="intro-section section-padding" id="about">
        <Reveal>
          <div className="section-label">
            <span>01</span> / ABOUT SHAMOIR
          </div>

          <div className="intro-layout">
            <h2>
              Imagination is the
              <span> beginning.</span>
              Intelligence makes
              <span> it real.</span>
            </h2>

            <div className="intro-description">
              <p>
                SHAMOIR AI is an emerging technology company headquartered in
                Chennai, India. We build intelligent digital products by
                combining artificial intelligence, modern software engineering
                and thoughtful design.
              </p>

              <p>
                Our focus is simple: turn ambitious ideas into practical
                experiences that empower individuals and businesses.
              </p>

              <MagneticLink href="#capabilities" className="text-link">
                WHAT WE DO <ArrowUpRight size={17} />
              </MagneticLink>
            </div>
          </div>
        </Reveal>

        <div className="mission-grid">
          <Reveal delay={0}>
            <article className="statement-card">
              <span>OUR MISSION</span>
              <h3>Make intelligence useful.</h3>
              <p>
                Transform imagination into intelligent solutions by building
                innovative, accessible and impactful AI-powered products.
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.15}>
            <article className="statement-card">
              <span>OUR VISION</span>
              <h3>Shape what comes next.</h3>
              <p>
                Become a trusted AI innovation company creating a connected
                ecosystem of intelligent products for the future.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className="ecosystem-section section-padding" id="ecosystem">
        <Reveal>
          <div className="section-label">
            <span>02</span> / OUR ECOSYSTEM
          </div>

          <div className="section-heading-row">
            <div>
              <p className="section-kicker">BUILT WITH PURPOSE</p>
              <h2>
                Products that
                <span> move ideas forward.</span>
              </h2>
            </div>

            <p className="section-side-description">
              An expanding ecosystem of intelligent digital experiences,
              designed around real needs.
            </p>
          </div>
        </Reveal>

        <div className="products-grid">
          {products.map((product, index) => (
            <Reveal key={product.number} delay={index * 0.16}>
              <article className="product-card">
                <div className="product-topline">
                  <span>{product.number} / PRODUCT</span>
                  <span className="product-status">{product.status}</span>
                </div>

                <div className="product-art">
                  {product.number === "01" ? (
                    <div className="zeewash-art">
                      <span className="art-orbit" />
                      <span className="art-orbit art-orbit-two" />
                      <SparkleIcon size={55} strokeWidth={1} />
                      <span className="art-word">Z</span>
                    </div>
                  ) : (
                    <div className="future-art">
                      <BrainCircuit size={66} strokeWidth={1} />
                      <span>THE NEXT POSSIBILITY</span>
                    </div>
                  )}
                </div>

                <div className="product-info">
                  <span className="product-type">{product.type}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>

                  {product.url ? (
                    <MagneticLink
                      href={product.url}
                      target="_blank"
                      rel="noreferrer"
                      className="product-link"
                    >
                      EXPLORE PRODUCT <ExternalLink size={16} />
                    </MagneticLink>
                  ) : (
                    <span className="product-coming">MORE TO COME</span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CAPABILITIES */}
      <section
        className="capabilities-section section-padding"
        id="capabilities"
      >
        <Reveal>
          <div className="section-label">
            <span>03</span> / OUR CAPABILITIES
          </div>

          <div className="section-heading-row">
            <div>
              <p className="section-kicker">IDEAS INTO REALITY</p>
              <h2>
                Technology with
                <span> intention.</span>
              </h2>
            </div>

            <p className="section-side-description">
              The capabilities behind the products we imagine, engineer and
              bring to life.
            </p>
          </div>
        </Reveal>

        <div className="capabilities-grid">
          {capabilities.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal key={item.number} delay={index * 0.09}>
                <article className="capability-card">
                  <div className="capability-top">
                    <span>{item.number}</span>
                    <Icon size={25} strokeWidth={1.4} />
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="capability-line" />
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section
        className="technology-section section-padding"
        id="technology"
      >
        <Reveal>
          <div className="section-label">
            <span>04</span> / TECHNOLOGY & INNOVATION
          </div>

          <div className="technology-layout">
            <div>
              <p className="section-kicker">ALWAYS EXPLORING</p>
              <h2>
                Building beyond
                <span> the ordinary.</span>
              </h2>
            </div>

            <div className="technology-copy">
              <p>
                We explore the intersection of artificial intelligence,
                software engineering and creative technology to develop
                experiences that feel intuitive, useful and forward-looking.
              </p>

              <p>
                Our approach combines experimentation with practical
                engineering — because innovation matters most when it creates
                real value.
              </p>

              <div className="technology-tags">
                <span>ARTIFICIAL INTELLIGENCE</span>
                <span>MODERN SOFTWARE</span>
                <span>INTELLIGENT SYSTEMS</span>
                <span>PRODUCT DESIGN</span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="technology-banner">
          <div className="banner-glow" />
          <span className="banner-overline">THE SHAMOIR PHILOSOPHY</span>

          <h3>
            Think beyond.
            <span> Build intelligently.</span>
          </h3>

          <MagneticLink href="#contact" className="button-primary">
            START A CONVERSATION <ArrowUpRight size={17} />
          </MagneticLink>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section section-padding" id="contact">
        <Reveal>
          <div className="section-label">
            <span>05</span> / CONTACT
          </div>

          <div className="contact-layout">
            <div className="contact-heading">
              <p className="section-kicker">HAVE AN IDEA?</p>

              <h2>
                Let's make
                <span> it happen.</span>
              </h2>

              <p>
                Have a question, an idea or an opportunity to explore?
                We'd love to hear from you.
              </p>
            </div>

            <div className="contact-details">
              <a
                href="mailto:shamoir5719@gmail.com"
                className="contact-item"
              >
                <span className="contact-icon">
                  <Mail size={20} />
                </span>

                <span>
                  <small>EMAIL</small>
                  shamoir5719@gmail.com
                </span>

                <ArrowUpRight size={18} />
              </a>

              <a href="tel:+918778034279" className="contact-item">
                <span className="contact-icon">
                  <Phone size={20} />
                </span>

                <span>
                  <small>PHONE</small>
                  +91 8778034279
                </span>

                <ArrowUpRight size={18} />
              </a>

              <div className="contact-item">
                <span className="contact-icon">
                  <MapPin size={20} />
                </span>

                <span>
                  <small>HEADQUARTERS</small>
                  Chennai, Tamil Nadu, India
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <a href="#home" className="footer-brand">
          <img src="/shamoir-logo.png" alt="" />
          <span>
            SHAMOIR <b>AI</b>
          </span>
        </a>

        <p>Beyond Imagination.</p>

        <div className="footer-bottom">
          <span>© 2026 SHAMOIR AI. ALL RIGHTS RESERVED.</span>
          <a href="#home">BACK TO TOP ↑</a>
          <span>CHENNAI, INDIA</span>
        </div>
      </footer>
    </main>
  );
}

export default App;

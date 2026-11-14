
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, ContactShadows, Sparkles } from "@react-three/drei";
import * as THREE from "three";
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

const capabilities = [
  {
    icon: BrainCircuit,
    number: "01",
    title: "AI APPLICATIONS",
    description: "Intelligent applications built to solve meaningful real-world problems.",
  },
  {
    icon: Workflow,
    number: "02",
    title: "INTELLIGENT AUTOMATION",
    description: "Smarter workflows that reduce repetitive work and improve efficiency.",
  },
  {
    icon: Code2,
    number: "03",
    title: "SOFTWARE DEVELOPMENT",
    description: "Modern web applications and software built for real-world use.",
  },
  {
    icon: MessageSquare,
    number: "04",
    title: "AI ASSISTANTS",
    description: "Conversational experiences that help people access information and get things done.",
  },
  {
    icon: Layers3,
    number: "05",
    title: "UI / UX DESIGN",
    description: "Thoughtful interfaces combining clarity, usability and visual identity.",
  },
  {
    icon: Cpu,
    number: "06",
    title: "DIGITAL PRODUCTS",
    description: "A growing ecosystem of useful, connected digital experiences.",
  },
];

function LogoScene() {
  const group = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;

    const targetY = state.pointer.x * 0.3;
    const targetX = -state.pointer.y * 0.2;

    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetY,
      3,
      delta
    );

    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetX,
      3,
      delta
    );
  });

  return (
    <>
      <ambientLight intensity={1.8} />
      <directionalLight position={[4, 5, 5]} intensity={2.5} />
      <pointLight position={[-3, 1, 3]} color="#0b9b63" intensity={5} />
      <pointLight position={[3, -2, 1]} color="#a4aaa9" intensity={2} />

      <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.18}>
        <group ref={group}>
          <mesh position={[0, 0, -0.12]}>
            <circleGeometry args={[1.75, 80]} />
            <meshStandardMaterial
              color="#063b2c"
              metalness={0.8}
              roughness={0.3}
              transparent
              opacity={0.16}
            />
          </mesh>

          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[3.5, 3.5]} />
            <meshBasicMaterial
              map={new THREE.TextureLoader().load("/shamoir-logo.png")}
              transparent
              toneMapped={false}
            />
          </mesh>
        </group>
      </Float>

      <Sparkles
        count={55}
        scale={5}
        size={2}
        speed={0.3}
        opacity={0.65}
        color="#16b879"
      />

      <ContactShadows
        position={[0, -2.1, -0.5]}
        opacity={0.35}
        scale={6}
        blur={2.5}
      />

      <Environment preset="city" />
    </>
  );
}

function Hero3D() {
  return (
    <div className="hero-visual">
      <div className="hero-orbit hero-orbit-one" />
      <div className="hero-orbit hero-orbit-two" />

      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
      >
        <LogoScene />
      </Canvas>

      <div className="visual-caption">
        <span className="status-dot" />
        INTELLIGENCE IN MOTION
      </div>
    </div>
  );
}

function Reveal({ children, className = "" }) {
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
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
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
    <main className="shamoir-site">
      <div className="background-glow" />
      <div className="ambient-grid" />

      <header className={`site-header ${scrolled ? "header-scrolled" : ""}`}>
        <a href="#home" className="brand" onClick={closeMenu}>
          <img src="/shamoir-logo.png" alt="SHAMOIR AI emblem" />
          <span>SHAMOIR <b>AI</b></span>
        </a>

        <nav className={`navigation ${menuOpen ? "navigation-open" : ""}`}>
          {navLinks.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
          <a className="mobile-contact" href="#contact" onClick={closeMenu}>
            LET'S TALK <ArrowUpRight size={15} />
          </a>
        </nav>

        <a href="#contact" className="header-cta">
          LET'S TALK <ArrowUpRight size={15} />
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

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
              <span className="hero-ai">AI<span className="hero-period">.</span></span>
            </h1>
          </Reveal>

          <Reveal>
            <h2>Beyond Imagination<span>.</span></h2>
          </Reveal>

          <Reveal>
            <p className="hero-description">
              We transform ambitious ideas into intelligent digital products.
              Building technology that moves possibilities beyond imagination.
            </p>
          </Reveal>

          <Reveal>
            <div className="hero-actions">
              <a href="#ecosystem" className="button-primary">
                EXPLORE OUR PRODUCTS <ArrowUpRight size={17} />
              </a>
              <a href="#about" className="button-secondary">
                DISCOVER SHAMOIR <ArrowRight size={16} />
              </a>
            </div>
          </Reveal>

          <div className="hero-location">
            <MapPin size={14} /> CHENNAI, INDIA
            <span />
            INDEPENDENT AI INNOVATION
          </div>
        </div>

        <Reveal className="hero-scene-wrap">
          <Hero3D />
        </Reveal>

        <a href="#about" className="scroll-indicator">
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown size={17} />
        </a>

        <div className="hero-index">01 / 06</div>
      </section>

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
              <a href="#capabilities" className="text-link">
                WHAT WE DO <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mission-grid">
          <Reveal>
            <article className="statement-card">
              <span>OUR MISSION</span>
              <h3>Make intelligence useful.</h3>
              <p>
                Transform imagination into intelligent solutions by building
                innovative, accessible and impactful AI-powered products.
              </p>
            </article>
          </Reveal>

          <Reveal>
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
          {products.map((product) => (
            <Reveal key={product.number}>
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
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noreferrer"
                      className="product-link"
                    >
                      EXPLORE PRODUCT <ExternalLink size={16} />
                    </a>
                  ) : (
                    <span className="product-coming">MORE TO COME</span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="capabilities-section section-padding" id="capabilities">
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
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.number}>
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

      <section className="technology-section section-padding" id="technology">
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
          <a href="#contact" className="button-primary">
            START A CONVERSATION <ArrowUpRight size={17} />
          </a>
        </div>
      </section>

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
              <a href="mailto:shamoir5719@gmail.com" className="contact-item">
                <span className="contact-icon"><Mail size={20} /></span>
                <span>
                  <small>EMAIL</small>
                  shamoir5719@gmail.com
                </span>
                <ArrowUpRight size={18} />
              </a>

              <a href="tel:+91877803279" className="contact-item">
                <span className="contact-icon"><Phone size={20} /></span>
                <span>
                  <small>PHONE</small>
                  +91 8778034279
                </span>
                <ArrowUpRight size={18} />
              </a>

              <div className="contact-item">
                <span className="contact-icon"><MapPin size={20} /></span>
                <span>
                  <small>HEADQUARTERS</small>
                  Chennai, Tamil Nadu, India
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="site-footer">
        <a href="#home" className="footer-brand">
          <img src="/shamoir-logo.png" alt="" />
          <span>SHAMOIR <b>AI</b></span>
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

import React, { useEffect, useState, useRef } from "react";
import "../CSS/HomePage.css";
import { useNavigate, Link } from "react-router-dom";
import { FiMoon, FiSun, FiMenu, FiX, FiPhone, FiMail, FiMapPin, FiTrendingUp, FiShoppingCart, FiStar, FiSmile, FiCamera, FiCheckCircle, FiBell, FiGrid, FiUsers, FiCloud, FiPackage, FiAward } from "react-icons/fi";
import { motion, useInView } from "framer-motion";
import Aurora from "./Aurora";
import Particles from "./Particles";
import Galaxy from "./Galaxy";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import missionImage from '../Images/mission.jpeg';
// About Tabs Component
const AboutTabs = () => {
  const [activeTab, setActiveTab] = useState("mission");

  const tabs = [
    { id: "mission", label: "Our Mission", icon: <FiTrendingUp /> },
    { id: "vision", label: "Our Vision", icon: <FiStar /> },
    { id: "values", label: "Core Values", icon: <FiCheckCircle /> },
    { id: "team", label: "Our Team", icon: <FiUsers /> }
  ];

  const tabContent = {
    mission: {
      title: "Our Mission",
      description: "To revolutionize the aquaculture industry by delivering sustainable, healthy, and profitable solutions for shrimp and prawn farmers across the nation.",
      image: missionImage,
      highlights: [
        { icon: <FiCheckCircle />, text: "Sustainable aquaculture practices" },
        { icon: <FiCheckCircle />, text: "Healthy & profitable solutions" },
        { icon: <FiCheckCircle />, text: "Supporting farmers nationwide" }
      ]
    },
    vision: {
      title: "Our Vision",
      description: "To be recognized as a trusted global brand in the hatchery industry, promoting eco-friendly aquaculture practices and supporting farmers with reliable and result-driven seed quality.",
      image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=800&auto=format&fit=crop",
      highlights: [
        { icon: <FiStar />, text: "Trusted global brand" },
        { icon: <FiStar />, text: "Eco-friendly practices" },
        { icon: <FiStar />, text: "Result-driven quality" }
      ]
    },
    values: {
      title: "Core Values",
      description: "We are built on the foundation of trust, transparency, and technology. These three pillars guide every decision we make and every seed we produce.",
      image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=800&auto=format&fit=crop",
      highlights: [
        { icon: <FiCheckCircle />, text: "Trust - Building lasting relationships" },
        { icon: <FiCheckCircle />, text: "Transparency - Open and honest practices" },
        { icon: <FiCheckCircle />, text: "Technology - Innovation in aquaculture" }
      ]
    },
    team: {
      title: "Expert Team",
      description: "Our team of aquaculture experts ensures every stage, from broodstock selection to larval rearing, follows world-class biosecurity and water quality standards.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop",
      highlights: [
        { icon: <FiUsers />, text: "Experienced aquaculture professionals" },
        { icon: <FiUsers />, text: "World-class biosecurity standards" },
        { icon: <FiUsers />, text: "Dedicated to farmer success" }
      ]
    }
  };

  const content = tabContent[activeTab];

  return (
    <div className="about-tabs-container">
      <div className="about-tabs-navigation">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`about-tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      <motion.div
        className="about-tab-content"
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="tab-content-grid">
          <div className="tab-content-text">
            <h3 className="tab-content-title">{content.title}</h3>
            <p className="tab-content-description">{content.description}</p>

            <div className="tab-content-highlights">
              {content.highlights.map((item, index) => (
                <motion.div
                  key={index} 
                  className="highlight-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="highlight-icon">{item.icon}</span>
                  <span className="highlight-text">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {activeTab === "mission" && (
              <blockquote className="tab-quote">
                "Hey boss, don't just buy any random seed - with us, you get Healthy Seeds, High Profits."
              </blockquote>
            )}

            {activeTab === "team" && (
              <blockquote className="tab-quote">
                "Because here, we believe in raising prawns, not problems."
              </blockquote>
            )}
          </div>

          <div className="tab-content-image">
            <motion.div
              className="image-wrapper"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img src={content.image} alt={content.title} />
              <div className="image-overlay"></div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formPopupOpen, setFormPopupOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("lords-aqua-theme") || "light";
    } catch {
      return "light";
    }
  });

  // Counter animation state
  const [countersStarted, setCountersStarted] = useState(false);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.remove("lords-dark");
      root.classList.add("lords-light");
    } else {
      root.classList.remove("lords-light");
      root.classList.add("lords-dark");
    }
    localStorage.setItem("lords-aqua-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (statsInView && !countersStarted) {
      setCountersStarted(true);
    }
  }, [statsInView, countersStarted]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // Counter animation component
  const Counter = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!countersStarted) return;

      let startTime;
      let animationFrame;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);

        const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
        setCount(Math.floor(end * easeOutQuart));

        if (percentage < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [countersStarted, end, duration]);

    return <span>{count.toLocaleString()}{suffix}</span>;
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <div className="lords-root">
      {/* FLOATING NAVBAR */}
      <header className={`lords-navbar ${scrolled ? "lords-navbar--scrolled" : ""}`}>
        <div className="lords-container lords-navbar-inner">
          <div className="lords-brand">
            <Link to="/" className="lords-brand-link">
              <img src="/logo.png" alt="Lords Aqua Hatcheries" className="lords-logo" />
              <div className="lords-brand-text">
                <span className="lords-brand-title">Lords Aqua Hatcheries</span>
              </div>
            </Link>
          </div>

          <nav className="lords-nav-desktop">
            <button onClick={() => scrollToSection("about")} className="lords-nav-link">About</button>
            <button onClick={() => scrollToSection("features")} className="lords-nav-link">Features</button>
            <button onClick={() => scrollToSection("contact")} className="lords-nav-link">Contact Us</button>

            <div className="lords-login-group">
              <button className="lords-btn lords-btn-outline" onClick={() => navigate("/user-login")}>User Login</button>
              <button className="lords-btn lords-btn-primary" onClick={() => navigate("/admin-login")}>Admin Login</button>
            </div>

            <button className="lords-icon-btn lords-theme-toggle" onClick={toggleTheme}>
              {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </nav>

          <div className="lords-nav-mobile">
            <button className="lords-icon-btn lords-theme-toggle" onClick={toggleTheme}>
              {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <button className="lords-icon-btn" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div className={`lords-mobile-drawer ${mobileOpen ? "open" : ""}`}>
          <div className="lords-mobile-links">
            <button onClick={() => scrollToSection("about")}>About</button>
            <button onClick={() => scrollToSection("features")}>Features</button>
            <button onClick={() => scrollToSection("contact")}>Contact Us</button>
            <div className="lords-mobile-divider" />
            <button className="lords-btn lords-btn-outline block" onClick={() => { setMobileOpen(false); navigate("/user-login"); }}>User Login</button>
            <button className="lords-btn lords-btn-primary block" onClick={() => { setMobileOpen(false); navigate("/admin-login"); }}>Admin Login</button>
          </div>
        </div>
      </header>

      <main className="lords-main">
        {/* HERO SECTION */}
        <section className="lords-hero">
          <div className="lords-hero-bg">
            <Aurora
              colorStops={["#2563eb", "#06b6d4", "#10b981"]}
              blend={0.5}
              amplitude={1.2}
              speed={0.4}
            />
            <div className="lords-hero-overlay"></div>
          </div>

          <div className="lords-container lords-hero-content">
            <motion.div
              className="lords-hero-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="lords-hero-title">
                A New Vision in the<br />
                <span className="lords-gradient-text">Hatchery World</span>
              </h1>
              <p className="lords-hero-subtitle">
                 Redefining aquaculture with innovation, sustainability, and science to deliver healthy, high-quality prawn seeds for better yields and better profits.
              </p>
              <div className="lords-hero-ctas">
                <button className="lords-btn lords-btn-primary lords-btn-lg" onClick={() => navigate("/user-login")}>
                  Get Started
                </button>
                <button className="lords-btn lords-btn-outline lords-btn-lg" onClick={() => scrollToSection("features")}>
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>

          {/* Animated wave decoration */}
          <div className="lords-wave">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="lords-wave-path"></path>
              <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="lords-wave-path"></path>
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="lords-wave-path"></path>
            </svg>
          </div>
        </section>

        {/* STATISTICS SECTION */}
        <section className="lords-stats-section" ref={statsRef}>
          <div className="lords-container">
            <div className="lords-stats-grid">
              <motion.div
                className="lords-stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="lords-stat-icon">
                  <FiTrendingUp />
                </div>
                <div className="lords-stat-number">
                  {countersStarted ? <Counter end={250000} suffix="+" /> : "0"}
                </div>
                <div className="lords-stat-label">Total Seeds Available</div>
              </motion.div>

              <motion.div
                className="lords-stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="lords-stat-icon">
                  <FiShoppingCart />
                </div>
                <div className="lords-stat-number">
                  {countersStarted ? <Counter end={180000} suffix="+" /> : "0"}
                </div>
                <div className="lords-stat-label">Seeds Purchased</div>
              </motion.div>

              <motion.div
                className="lords-stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="lords-stat-icon">
                  <FiStar />
                </div>
                <div className="lords-stat-number">
                  {countersStarted ? <><Counter end={4} suffix="." /><Counter end={8} /></> : "0"}
                </div>
                <div className="lords-stat-label">User Rating</div>
              </motion.div>

              <motion.div
                className="lords-stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="lords-stat-icon">
                  <FiSmile />
                </div>
                <div className="lords-stat-number">
                  {countersStarted ? <Counter end={500} suffix="+" /> : "0"}
                </div>
                <div className="lords-stat-label">Happy Customers</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="lords-about-section">
          <div className="lords-particles-wrapper">
            <Particles
              particleColors={['#667eea', '#764ba2', '#f093fb']}
              particleCount={150}
              particleSpread={8}
              speed={0.05}
              particleBaseSize={80}
              moveParticlesOnHover={true}
              alphaParticles={true}
              disableRotation={false}
            />
          </div>
          <div className="lords-container">
            <motion.div
              className="lords-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="lords-section-title">About Lords Aqua Hatcheries</h2>
              <p className="lords-section-subtitle">
                Built on trust, transparency, and technology - we're redefining aquaculture excellence
              </p>
            </motion.div>

            <AboutTabs />
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="lords-features-section lords-features-scroll-section">
          <div className="lords-particles-wrapper">
            <Particles
              particleColors={['#4facfe', '#00f2fe', '#43e97b']}
              particleCount={150}
              particleSpread={8}
              speed={0.05}
              particleBaseSize={80}
              moveParticlesOnHover={true}
              alphaParticles={true}
              disableRotation={false}
            />
          </div>

          <div className="lords-features-scroll-header">
            <div className="lords-container">
              <motion.div
                className="lords-section-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="lords-section-title">What We Offer</h2>
                <p className="lords-section-subtitle">Premium quality prawn seeds and comprehensive support from hatch to harvest</p>
              </motion.div>
            </div>
          </div>

          <ScrollStack
            itemDistance={50}
            itemScale={0.05}
            itemStackDistance={40}
            stackPosition="30%"
            scaleEndPosition="15%"
            baseScale={0.9}
            useWindowScroll={true}
          >
            <ScrollStackItem itemClassName="lords-scroll-card-1">
              <div className="lords-feature-icon lords-scroll-icon">
                <FiCamera />
              </div>
              <h3 className="lords-feature-title">Bio-Secure Hatchery Systems</h3>
              <p className="lords-feature-desc">
                100% monitored and controlled environments ensuring disease-free, fast-growing, and high-survival-rate seeds for consistent success from hatch to harvest.
              </p>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="lords-scroll-card-2">
              <div className="lords-feature-icon lords-scroll-icon">
                <FiCheckCircle />
              </div>
              <h3 className="lords-feature-title">Expert Guidance & Support</h3>
              <p className="lords-feature-desc">
                Technical support from experienced aquaculture professionals throughout the growing cycle, ensuring healthy ponds, faster growth, and profitable harvests.
              </p>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="lords-scroll-card-3">
              <div className="lords-feature-icon lords-scroll-icon">
                <FiBell />
              </div>
              <h3 className="lords-feature-title">Sustainable Practices</h3>
              <p className="lords-feature-desc">
                Responsible and eco-conscious farming from hatch to harvest. Year-round production capacity with world-class biosecurity and water quality standards.
              </p>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="lords-scroll-card-4">
              <div className="lords-feature-icon lords-scroll-icon">
                <FiGrid />
              </div>
              <h3 className="lords-feature-title">High-Quality Prawn Seeds</h3>
              <p className="lords-feature-desc">
                Uniform size, fast growth, and strong survival rate. Every seed is bred, tested, and nurtured with care and precision for maximum results. Healthy Seeds, High Profits.
              </p>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="lords-scroll-card-5">
              <div className="lords-feature-icon lords-scroll-icon">
                <FiPackage />
              </div>
              <h3 className="lords-feature-title">Consistent Supply</h3>
              <p className="lords-feature-desc">
                Year-round production capacity means you get reliable seed supply whenever you need it. We ensure you never face stock shortages during critical farming seasons.
              </p>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="lords-scroll-card-6">
              <div className="lords-feature-icon lords-scroll-icon">
                <FiAward />
              </div>
              <h3 className="lords-feature-title">Proven Track Record</h3>
              <p className="lords-feature-desc">
                Join hundreds of successful farmers who trust us for their aquaculture needs. Our results speak for themselves with higher survival rates and better harvest outcomes.
              </p>
            </ScrollStackItem>
          </ScrollStack>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="lords-contact-section">
          <div className="lords-container">
            <motion.div
              className="lords-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="lords-section-title">Contact Us</h2>
              <p className="lords-section-subtitle">For any queries, support, or information about our premium prawn seeds - we're here to help you succeed</p>
            </motion.div>

            <div className="lords-contact-grid">
              <motion.div
                className="lords-contact-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="lords-contact-icon">
                  <FiPhone />
                </div>
                <h3 className="lords-contact-title">Phone</h3>
                <p className="lords-contact-info">+91 98765 43210</p>
                <p className="lords-contact-info">+91 87654 32109</p>
              </motion.div>

              <motion.div
                className="lords-contact-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="lords-contact-icon">
                  <FiMail />
                </div>
                <h3 className="lords-contact-title">Email</h3>
                <p className="lords-contact-info">info@lordsaquahatcheries.com</p>
                <p className="lords-contact-info">support@lordsaquahatcheries.com</p>
              </motion.div>

              <motion.div
                className="lords-contact-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="lords-contact-icon">
                  <FiMapPin />
                </div>
                <h3 className="lords-contact-title">Location</h3>
                <p className="lords-contact-info">123 Aquaculture Park</p>
                <p className="lords-contact-info">Hyderabad, Telangana 500001</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* OUR PROMISE SECTION */}
        <section className="lords-promise-section" style={{
          position: 'relative',
          background: 'linear-gradient(135deg, var(--lords-primary) 0%, var(--lords-primary-dark) 100%)',
          color: 'white',
          padding: '4rem 0',
          textAlign: 'center',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.3 }}>
            <Aurora
              colorStops={["#3b82f6", "#a78bfa", "#ec4899"]}
              blend={0.7}
              amplitude={1.2}
              speed={0.2}
            />
          </div>
          <div className="lords-container" style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                Our Promise to You
              </h2>
              <p style={{ fontSize: '1.25rem', maxWidth: '900px', margin: '0 auto 2rem', lineHeight: '1.8', opacity: '0.95' }}>
                We understand that your success depends on the quality of your seed. That's why every seed from <strong>Lord's Aqua Hatcheries</strong> is bred, tested, and nurtured with care and precision to help you harvest more, faster, and healthier.
              </p>
              <blockquote style={{
                fontSize: '1.5rem',
                fontStyle: 'italic',
                fontWeight: '500',
                maxWidth: '800px',
                margin: '2rem auto',
                padding: '2rem',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)'
              }}>
                "From hatch to harvest, sustainable aquaculture."
              </blockquote>
              <p style={{ fontSize: '1.1rem', maxWidth: '850px', margin: '2rem auto 0', opacity: '0.9' }}>
                Our journey doesn't end with seed delivery; it begins there. We support farmers throughout the growing cycle, ensuring healthy ponds, faster growth, and profitable harvests.
              </p>
            </motion.div>
          </div>
        </section>

        {/* GET IN TOUCH WITH US SECTION */}
        <section className="lords-collaborate-section">
          <div className="lords-collaborate-bg-wrapper">
            <Particles
              particleColors={['#667eea', '#764ba2', '#f093fb', '#4facfe']}
              particleCount={100}
              particleSpread={10}
              speed={0.03}
              particleBaseSize={60}
              moveParticlesOnHover={true}
              alphaParticles={true}
              disableRotation={false}
            />
          </div>

          <div className="lords-container">
            <motion.div
              className="lords-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="lords-section-title">Get in Touch With Us</h2>
              <p className="lords-section-subtitle">
                Let's build a healthier, more sustainable aquaculture future together
              </p>
            </motion.div>

            <div className="lords-collaborate-grid">
              <motion.div
                className="lords-collab-card lords-collab-card-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <div className="lords-collab-icon-lg">
                  <FiUsers />
                </div>
                <h3>Partnership Opportunities</h3>
                <p>Explore collaboration possibilities and grow together</p>
              </motion.div>

              <motion.div
                className="lords-collab-card lords-collab-card-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                <div className="lords-collab-icon-lg">
                  <FiTrendingUp />
                </div>
                <h3>Business Inquiries</h3>
                <p>Bulk orders, distribution rights, franchise opportunities</p>
              </motion.div>

              <motion.div
                className="lords-collab-card lords-collab-card-3"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <div className="lords-collab-icon-lg">
                  <FiCheckCircle />
                </div>
                <h3>Expert Support</h3>
                <p>Guidance from aquaculture professionals</p>
              </motion.div>
            </div>

            <motion.div
              className="lords-collab-cta-wrapper"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button
                className="lords-collab-open-btn"
                onClick={() => setFormPopupOpen(true)}
              >
                <span>Start a Conversation</span>
                <FiMail style={{ fontSize: '1.25rem' }} />
              </button>
              <p className="lords-collab-subtext">Click to open our collaboration form</p>
            </motion.div>
          </div>

          {/* FORM POPUP MODAL */}
          {formPopupOpen && (
            <motion.div
              className="lords-form-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFormPopupOpen(false)}
            >
              <motion.div
                className="lords-form-modal-container"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="lords-form-modal-bg">
                  <div className="lords-form-modal-gradient"></div>
                  <Aurora
                    colorStops={["#667eea", "#f093fb", "#4facfe"]}
                    blend={0.8}
                    amplitude={1.5}
                    speed={0.3}
                  />
                </div>

                <button
                  className="lords-form-modal-close"
                  onClick={() => setFormPopupOpen(false)}
                >
                  <FiX />
                </button>

                <div className="lords-form-modal-content">
                  <div className="lords-form-modal-header">
                    <h2>Let's Collaborate</h2>
                    <p>Share your details and let's create something amazing together</p>
                  </div>

                  <form className="lords-modal-form">
                    <div className="lords-form-group">
                      <label htmlFor="modal-name">Full Name *</label>
                      <input
                        type="text"
                        id="modal-name"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="lords-form-row">
                      <div className="lords-form-group">
                        <label htmlFor="modal-email">Email Address *</label>
                        <input
                          type="email"
                          id="modal-email"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>

                      <div className="lords-form-group">
                        <label htmlFor="modal-phone">Phone Number *</label>
                        <input
                          type="tel"
                          id="modal-phone"
                          placeholder="+91 98765 43210"
                          required
                        />
                      </div>
                    </div>

                    <div className="lords-form-group">
                      <label htmlFor="modal-company">Company/Farm Name</label>
                      <input
                        type="text"
                        id="modal-company"
                        placeholder="Enter your company or farm name"
                      />
                    </div>

                    <div className="lords-form-group">
                      <label htmlFor="modal-inquiry">Type of Inquiry *</label>
                      <select id="modal-inquiry" required>
                        <option value="">Select inquiry type</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="bulk">Bulk Order</option>
                        <option value="distribution">Distribution Rights</option>
                        <option value="franchise">Franchise Opportunity</option>
                        <option value="support">Technical Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="lords-form-group">
                      <label htmlFor="modal-message">Your Message *</label>
                      <textarea
                        id="modal-message"
                        rows="4"
                        placeholder="Tell us about your inquiry, requirements, or how we can collaborate..."
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="lords-modal-submit-btn">
                      <span>Send Message</span>
                      <FiCheckCircle />
                    </button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </section>

        {/* DOWNLOAD APP SECTION */}
        <section className="lords-download-section">
          <div className="lords-container">
            <motion.div
              className="lords-download-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="lords-download-content">
                <h2 className="lords-download-title">We Are Available At Your Fingertips</h2>
                <p className="lords-download-subtitle">
                  Track your hatchery progress, get real-time updates, connect with experts, and manage your aquaculture journey - all from the palm of your hand. Download the Lord's Aqua Hatcheries app and experience aquaculture excellence on the go.
                </p>
                <div className="lords-app-features">
                  <div className="lords-app-feature-item">
                    <FiCamera />
                    <span>Daily Progress Tracking</span>
                  </div>
                  <div className="lords-app-feature-item">
                    <FiBell />
                    <span>Instant Notifications</span>
                  </div>
                  <div className="lords-app-feature-item">
                    <FiUsers />
                    <span>Expert Support 24/7</span>
                  </div>
                </div>
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lords-playstore-btn"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" />
                </a>
              </div>
              <div className="lords-download-image">
                <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop" alt="Mobile App" />
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="lords-footer">
        <div className="lords-container">
          <div className="lords-footer-content">
            <div className="lords-footer-left">
              <div className="lords-footer-logo">
                <img src="/logo.png" alt="Lords Aqua Hatcheries" />
                <span>Lords Aqua Hatcheries</span>
              </div>
              <p className="lords-footer-desc">
                "From hatch to harvest, sustainable aquaculture" - Your trusted partner for healthy seeds and high profits.
              </p>
              <p className="lords-copyright">
                © {new Date().getFullYear()} Lords Aqua Hatcheries. All rights reserved.
              </p>
            </div>

            <div className="lords-footer-links">
              <div className="lords-footer-col">
                <h4>Quick Links</h4>
                <button onClick={() => scrollToSection("about")}>About</button>
                <button onClick={() => scrollToSection("features")}>Features</button>
                <button onClick={() => scrollToSection("contact")}>Contact</button>
              </div>

              <div className="lords-footer-col">
                <h4>Account</h4>
                <Link to="/user-login">User Login</Link>
                <Link to="/admin-login">Admin Login</Link>
              </div>

              <div className="lords-footer-col">
                <h4>Legal</h4>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="lords-whatsapp-float"
        aria-label="Contact us on WhatsApp"
      >
        <svg viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 0C7.164 0 0 7.163 0 16c0 2.825.739 5.607 2.137 8.048L.393 30.25c-.138.413.281.83.693.69l6.202-1.743A15.926 15.926 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333c-2.61 0-5.147-.764-7.333-2.208l-.415-.273-4.32 1.214 1.214-4.32-.273-.415A13.25 13.25 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.81-10.03c-.427-.213-2.528-1.247-2.92-1.39-.392-.143-.677-.213-.963.214-.285.427-1.105 1.39-1.355 1.676-.25.285-.498.321-.925.107-.427-.214-1.802-.664-3.432-2.117-1.268-1.132-2.125-2.53-2.375-2.957-.25-.427-.027-.658.187-.87.192-.192.427-.498.64-.748.214-.25.285-.427.427-.712.143-.285.072-.535-.035-.748-.107-.214-.963-2.32-1.32-3.177-.348-.835-.7-.722-.963-.735-.25-.013-.535-.016-.82-.016s-.748.107-1.14.535c-.392.427-1.498 1.462-1.498 3.568s1.533 4.137 1.747 4.423c.214.285 3.01 4.595 7.293 6.444 1.018.44 1.813.703 2.432.9.1.032 1.906.611 2.175.611.269 0 .537-.174.675-.327.138-.153.69-.845.69-1.645 0-.8-.138-1.428-.507-1.645z"/>
        </svg>
      </a>
    </div>
  );
};

export default HomePage;

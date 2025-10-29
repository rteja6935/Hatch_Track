import React, { useEffect, useState, useRef } from "react";
import "../CSS/HomePage.css";
import { useNavigate, Link } from "react-router-dom";
import { FiMoon, FiSun, FiMenu, FiX, FiPhone, FiMail, FiMapPin, FiTrendingUp, FiShoppingCart, FiStar, FiSmile, FiCamera, FiCheckCircle, FiBell, FiGrid, FiUsers, FiCloud } from "react-icons/fi";
import { motion, useInView } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
                Welcome to<br />
                <span className="lords-gradient-text">Lords Aqua Hatcheries</span>
              </h1>
              <p className="lords-hero-subtitle">
                Your trusted partner in aquaculture excellence. Track, manage, and grow your fish hatchery operations with cutting-edge technology and expert support.
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

        {/* FEATURES SECTION */}
        <section id="features" className="lords-features-section">
          <div className="lords-container">
            <motion.div
              className="lords-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="lords-section-title">Powerful Features</h2>
              <p className="lords-section-subtitle">Everything you need to manage your aquaculture business efficiently</p>
            </motion.div>

            <div className="lords-features-grid">
              <motion.div
                className="lords-feature-card"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="lords-feature-icon">
                  <FiCamera />
                </div>
                <h3 className="lords-feature-title">Upload & Track Daily Growth</h3>
                <p className="lords-feature-desc">
                  Capture and monitor the growth of your fish stocks with daily photo uploads and detailed tracking metrics.
                </p>
              </motion.div>

              <motion.div
                className="lords-feature-card"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="lords-feature-icon">
                  <FiCheckCircle />
                </div>
                <h3 className="lords-feature-title">Admin Approval & Feedback</h3>
                <p className="lords-feature-desc">
                  Get expert feedback and approval from administrators to ensure optimal growth conditions and best practices.
                </p>
              </motion.div>

              <motion.div
                className="lords-feature-card"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="lords-feature-icon">
                  <FiBell />
                </div>
                <h3 className="lords-feature-title">Real-time Notifications</h3>
                <p className="lords-feature-desc">
                  Stay updated with instant alerts for critical events, approvals, and important updates about your hatchery.
                </p>
              </motion.div>

              <motion.div
                className="lords-feature-card"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="lords-feature-icon">
                  <FiGrid />
                </div>
                <h3 className="lords-feature-title">Manage All Hatcheries in One Place</h3>
                <p className="lords-feature-desc">
                  Centralized dashboard to oversee multiple hatcheries, track performance, and manage operations seamlessly.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="lords-about-section">
          <div className="lords-container">
            <div className="lords-about-content">
              <motion.div
                className="lords-about-text"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="lords-section-title">About Lords Aqua Hatcheries</h2>
                <p className="lords-about-para">
                  Lords Aqua Hatcheries is a pioneering platform in aquaculture management, dedicated to revolutionizing the way fish hatcheries operate. Our comprehensive solution combines cutting-edge technology with industry expertise to provide seamless tracking, monitoring, and management of your aquaculture operations.
                </p>
                <p className="lords-about-para">
                  With years of experience in the aquaculture industry, we understand the challenges faced by hatchery operators. Our platform is designed to simplify daily operations, improve productivity, and maximize yields through real-time data tracking, expert feedback, and automated workflows.
                </p>
                <p className="lords-about-para">
                  Whether you're managing a single hatchery or multiple facilities, our platform scales with your needs, providing powerful tools for monitoring growth rates, managing inventory, receiving expert guidance, and making data-driven decisions that drive success.
                </p>
                <div className="lords-about-features">
                  <div className="lords-about-feature-item">
                    <span className="lords-check-icon">✓</span>
                    <span>Expert-backed technology</span>
                  </div>
                  <div className="lords-about-feature-item">
                    <span className="lords-check-icon">✓</span>
                    <span>Real-time monitoring and analytics</span>
                  </div>
                  <div className="lords-about-feature-item">
                    <span className="lords-check-icon">✓</span>
                    <span>Scalable solutions for all sizes</span>
                  </div>
                  <div className="lords-about-feature-item">
                    <span className="lords-check-icon">✓</span>
                    <span>24/7 customer support</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="lords-about-image"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="lords-about-img-wrapper">
                  <img src="https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=1200&auto=format&fit=crop" alt="Fish Hatchery" />
                </div>
              </motion.div>
            </div>
          </div>
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
              <p className="lords-section-subtitle">Get in touch for more details and support</p>
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
                <h2 className="lords-download-title">Download Our Mobile App</h2>
                <p className="lords-download-subtitle">
                  Manage your hatchery operations on the go. Download our app from Google Play Store.
                </p>
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
                Your trusted partner in aquaculture excellence
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft, FiHelpCircle, FiBook, FiCamera, FiMessageCircle,
  FiPhone, FiMail, FiGlobe, FiChevronDown, FiChevronUp,
  FiCheckCircle, FiUpload, FiEye, FiVideo
} from "react-icons/fi";
import "../CSS/UserDashboard.css";

export default function UserHelp() {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [language, setLanguage] = useState("English");

  const howToSteps = [
    { icon: <FiUpload />, title: "Sign Up & Login", description: "Create your account using your phone number and login to access your dashboard" },
    { icon: <FiCamera />, title: "Upload Photos", description: "Upload growth photos for 4 time periods: Day 1-10, 10-20, 20-30, and 30-40" },
    { icon: <FiEye />, title: "Track Progress", description: "Monitor your hatchery growth and receive admin feedback on your uploads" },
    { icon: <FiCheckCircle />, title: "Get Approval", description: "Receive approval notifications and expert comments from our team" }
  ];

  const photoTips = [
    { tip: "Good Lighting", detail: "Take photos in natural daylight for best clarity" },
    { tip: "Clear Focus", detail: "Ensure the fish/seeds are clearly visible and in focus" },
    { tip: "Consistent Angle", detail: "Use the same angle for all photos to track growth" },
    { tip: "Size Reference", detail: "Include a ruler or coin for size comparison" }
  ];

  const faqs = [
    {
      question: "How do I upload growth photos?",
      answer: "Navigate to the 'Upload New' section from the sidebar or click the Quick Upload button. Select the appropriate day range (1-10, 10-20, 20-30, or 30-40) and upload your image. Make sure the photo is clear and well-lit."
    },
    {
      question: "What happens after I upload a photo?",
      answer: "Once you upload a photo, it will be sent to our admin team for review. You'll receive a notification when the admin approves, rejects, or adds comments to your upload. Check the Notifications section regularly for updates."
    },
    {
      question: "How many photos do I need to upload?",
      answer: "You need to upload 4 photos in total - one for each growth period: Day 1-10, Day 10-20, Day 20-30, and Day 30-40. This helps us track the complete growth cycle of your hatchery."
    },
    {
      question: "What if my photo is rejected?",
      answer: "If a photo is rejected, you'll receive a notification explaining the reason (usually image quality or clarity issues). Simply retake the photo following our photo tips and upload it again."
    },
    {
      question: "Can I edit my profile information?",
      answer: "Yes! Go to Profile/Edit from the sidebar menu. Click 'Edit Profile', make your changes, and click 'Save Changes' to update your information."
    },
    {
      question: "How do I contact support?",
      answer: "You can reach our support team via phone at +91 9876543210, email at support@lordsaqua.com, or use the live chat feature during business hours (9 AM - 6 PM IST)."
    }
  ];

  const languages = ["English", "हिंदी (Hindi)", "తెలుగు (Telugu)", "தமிழ் (Tamil)", "বাংলা (Bengali)"];

  const videos = [
    { title: "Getting Started", duration: "3:45", description: "Learn how to create your account and navigate the dashboard" },
    { title: "Uploading Photos", duration: "2:30", description: "Step-by-step guide to uploading growth photos" },
    { title: "Understanding Notifications", duration: "2:15", description: "How to read and respond to admin feedback" }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--dashboard-bg)" }}>
      <header className="dashboard-header">
        <button onClick={() => navigate("/user/dashboard")} style={{
          background: "rgba(255, 255, 255, 0.2)", border: "none", color: "white",
          padding: "0.75rem 1.5rem", borderRadius: "10px", fontWeight: "700",
          cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem"
        }}>
          <FiArrowLeft /> Back to Dashboard
        </button>
        <h1 className="header-title">Help Center</h1>
        <div></div>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {/* Hero */}
        <div style={{
          background: "var(--dashboard-card-bg)", padding: "3rem 2rem", borderRadius: "16px",
          textAlign: "center", marginBottom: "3rem", boxShadow: "var(--dashboard-shadow-md)"
        }}>
          <FiHelpCircle style={{ fontSize: "4rem", color: "var(--dashboard-primary)", marginBottom: "1rem" }} />
          <h1 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "1rem" }}>
            How Can We Help You?
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--dashboard-text-secondary)" }}>
            Everything you need to know about using Lords Aqua Hatcheries
          </p>
        </div>

        {/* How to Use */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: "900", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <FiBook style={{ color: "var(--dashboard-primary)" }} /> How to Use the App
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            {howToSteps.map((step, i) => (
              <div key={i} style={{
                background: "var(--dashboard-card-bg)", padding: "2rem", borderRadius: "12px",
                boxShadow: "var(--dashboard-shadow-sm)", border: "1px solid var(--dashboard-border-light)",
                textAlign: "center"
              }}>
                <div style={{
                  width: "70px", height: "70px", background: "var(--dashboard-gradient-primary)",
                  borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1.5rem", fontSize: "2rem", color: "white"
                }}>
                  {step.icon}
                </div>
                <div style={{
                  background: "var(--dashboard-primary)", color: "white", width: "35px", height: "35px",
                  borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1rem", fontWeight: "900"
                }}>
                  {i + 1}
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "800", marginBottom: "0.75rem" }}>{step.title}</h3>
                <p style={{ fontSize: "0.95rem", color: "var(--dashboard-text-secondary)", lineHeight: "1.6" }}>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Photo Tips */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: "900", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <FiCamera style={{ color: "var(--dashboard-primary)" }} /> Photo Tips for Best Results
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {photoTips.map((item, i) => (
              <div key={i} style={{
                background: "var(--dashboard-card-bg)", padding: "1.5rem", borderRadius: "12px",
                border: "2px solid var(--dashboard-border-light)", display: "flex", gap: "1rem"
              }}>
                <FiCheckCircle style={{ fontSize: "1.5rem", color: "#22c55e", flexShrink: 0, marginTop: "0.25rem" }} />
                <div>
                  <h4 style={{ fontSize: "1rem", fontWeight: "800", marginBottom: "0.5rem" }}>{item.tip}</h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--dashboard-text-secondary)" }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: "900", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <FiMessageCircle style={{ color: "var(--dashboard-primary)" }} /> Frequently Asked Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{
                background: "var(--dashboard-card-bg)", borderRadius: "12px",
                boxShadow: "var(--dashboard-shadow-sm)", border: "1px solid var(--dashboard-border-light)"
              }}>
                <button onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)} style={{
                  width: "100%", padding: "1.5rem", background: "transparent", border: "none",
                  display: "flex", justifyContent: "space-between", cursor: "pointer", textAlign: "left"
                }}>
                  <span style={{ fontSize: "1.05rem", fontWeight: "700" }}>{faq.question}</span>
                  {expandedFAQ === i ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
                </button>
                {expandedFAQ === i && (
                  <div style={{
                    padding: "0 1.5rem 1.5rem", fontSize: "0.95rem",
                    color: "var(--dashboard-text-secondary)", lineHeight: "1.7",
                    borderTop: "1px solid var(--dashboard-border-light)"
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: "900", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <FiPhone style={{ color: "var(--dashboard-primary)" }} /> Contact Support
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            <a href="tel:+919876543210" style={{
              background: "var(--dashboard-card-bg)", padding: "2rem", borderRadius: "12px",
              boxShadow: "var(--dashboard-shadow-sm)", textAlign: "center", textDecoration: "none", color: "inherit"
            }}>
              <div style={{
                width: "60px", height: "60px", background: "linear-gradient(135deg, #22c55e 0%, #4ade80 100%)",
                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1rem", fontSize: "1.75rem", color: "white"
              }}>
                <FiPhone />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "800", marginBottom: "0.5rem" }}>Call Us</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--dashboard-text-secondary)" }}>+91 9876543210</p>
              <p style={{ fontSize: "0.85rem", color: "var(--dashboard-text-light)", marginTop: "0.5rem" }}>Mon-Sat, 9 AM - 6 PM IST</p>
            </a>

            <a href="mailto:support@lordsaqua.com" style={{
              background: "var(--dashboard-card-bg)", padding: "2rem", borderRadius: "12px",
              boxShadow: "var(--dashboard-shadow-sm)", textAlign: "center", textDecoration: "none", color: "inherit"
            }}>
              <div style={{
                width: "60px", height: "60px", background: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1rem", fontSize: "1.75rem", color: "white"
              }}>
                <FiMail />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "800", marginBottom: "0.5rem" }}>Email Us</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--dashboard-text-secondary)" }}>support@lordsaqua.com</p>
              <p style={{ fontSize: "0.85rem", color: "var(--dashboard-text-light)", marginTop: "0.5rem" }}>Response within 24 hours</p>
            </a>

            <button onClick={() => alert("Live chat coming soon!")} style={{
              background: "var(--dashboard-card-bg)", padding: "2rem", borderRadius: "12px",
              boxShadow: "var(--dashboard-shadow-sm)", textAlign: "center", cursor: "pointer", border: "1px solid var(--dashboard-border-light)"
            }}>
              <div style={{
                width: "60px", height: "60px", background: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1rem", fontSize: "1.75rem", color: "white"
              }}>
                <FiMessageCircle />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "800", marginBottom: "0.5rem" }}>Live Chat</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--dashboard-text-secondary)" }}>Chat with our team</p>
              <p style={{ fontSize: "0.85rem", color: "var(--dashboard-text-light)", marginTop: "0.5rem" }}>Available during business hours</p>
            </button>
          </div>
        </section>

        {/* Language */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: "900", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <FiGlobe style={{ color: "var(--dashboard-primary)" }} /> Language Help
          </h2>
          <div style={{
            background: "var(--dashboard-card-bg)", padding: "2rem", borderRadius: "12px",
            boxShadow: "var(--dashboard-shadow-sm)"
          }}>
            <p style={{ marginBottom: "1.5rem", color: "var(--dashboard-text-secondary)" }}>
              Select your preferred language:
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {languages.map((lang) => (
                <button key={lang} onClick={() => setLanguage(lang)} style={{
                  padding: "0.85rem 1.5rem",
                  background: language === lang ? "var(--dashboard-gradient-primary)" : "transparent",
                  color: language === lang ? "white" : "var(--dashboard-text-primary)",
                  border: `2px solid ${language === lang ? "var(--dashboard-primary)" : "var(--dashboard-border)"}`,
                  borderRadius: "10px", fontWeight: "700", cursor: "pointer"
                }}>
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Videos */}
        <section>
          <h2 style={{ fontSize: "1.75rem", fontWeight: "900", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <FiVideo style={{ color: "var(--dashboard-primary)" }} /> Video Tutorials
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {videos.map((video, i) => (
              <div key={i} style={{
                background: "var(--dashboard-card-bg)", borderRadius: "12px",
                boxShadow: "var(--dashboard-shadow-sm)", overflow: "hidden"
              }}>
                <div onClick={() => alert("Video player coming soon!")} style={{
                  background: "var(--dashboard-gradient-primary)", height: "180px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "3rem", color: "white", cursor: "pointer"
                }}>
                  <FiVideo />
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "800" }}>{video.title}</h3>
                    <span style={{ fontSize: "0.85rem", color: "var(--dashboard-text-light)", fontWeight: "600" }}>{video.duration}</span>
                  </div>
                  <p style={{ fontSize: "0.9rem", color: "var(--dashboard-text-secondary)", lineHeight: "1.6" }}>{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

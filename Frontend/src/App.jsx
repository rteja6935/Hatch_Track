import React, { useEffect, useRef } from 'react';

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      time += 0.005;
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `rgba(0, 40, 80, ${0.9 + Math.sin(time) * 0.1})`);
      gradient.addColorStop(0.3, `rgba(20, 60, 100, ${0.7 + Math.cos(time * 0.8) * 0.1})`);
      gradient.addColorStop(0.6, `rgba(80, 40, 100, ${0.6 + Math.sin(time * 1.2) * 0.1})`);
      gradient.addColorStop(1, `rgba(0, 60, 80, ${0.8 + Math.cos(time * 0.7) * 0.1})`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const drawOrb = (x, y, radius, color, opacity) => {
        const orbGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        orbGradient.addColorStop(0, `${color}, ${opacity})`);
        orbGradient.addColorStop(0.5, `${color}, ${opacity * 0.4})`);
        orbGradient.addColorStop(1, `${color}, 0)`);
        
        ctx.fillStyle = orbGradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      };

      drawOrb(
        canvas.width * 0.15 + Math.sin(time) * 100,
        canvas.height * 0.3 + Math.cos(time * 0.8) * 80,
        250,
        'rgba(0, 150, 255',
        0.6
      );

      drawOrb(
        canvas.width * 0.85 + Math.cos(time * 0.9) * 120,
        canvas.height * 0.7 + Math.sin(time * 1.1) * 90,
        300,
        'rgba(150, 50, 255',
        0.5
      );

      drawOrb(
        canvas.width * 0.5 + Math.sin(time * 1.3) * 60,
        canvas.height * 0.5 + Math.cos(time * 0.6) * 60,
        200,
        'rgba(255, 100, 150',
        0.4
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in {
            animation: fadeIn 1s ease-out;
          }

          .animate-fade-in-delay {
            animation: fadeIn 1s ease-out 0.2s backwards;
          }

          .animate-fade-in-delay-2 {
            animation: fadeIn 1s ease-out 0.4s backwards;
          }
        `}
      </style>

      <div className="relative min-h-screen overflow-hidden bg-black">
        {/* Animated Background Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Content */}
        <div className="relative z-10">
          {/* Navigation */}
          <nav className="flex items-center justify-between px-8 py-6">
            <div className="flex items-center space-x-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                AI Process
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                AI Solutions
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                Case Studies
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                Client Reviews
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                Get Started <span className="ml-1">↗</span>
              </a>
            </div>
            <button className="bg-green-400 hover:bg-green-300 text-black px-6 py-2 rounded-full text-sm font-medium transition-colors">
              Free Consultation
            </button>
          </nav>

          {/* Hero Content */}
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-88px)] px-8 text-center">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight animate-fade-in">
              Revolutionizing business
              <br />
              with <span className="text-green-300">AI products.</span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-12 animate-fade-in-delay">
              We develop cutting-edge AI products and intelligent solutions that
              <br />
              transform how businesses operate and compete.
            </p>

            <div className="flex space-x-4 animate-fade-in-delay-2">
              <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-3 rounded-full text-sm font-medium transition-all border border-white/20">
                Our services
              </button>
              <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-3 rounded-full text-sm font-medium transition-all border border-white/20 flex items-center">
                Get in touch <span className="ml-2">↗</span>
              </button>
            </div>
          </div>
        </div>

        {/* AI Products Section */}
        <section className="relative z-10 bg-black py-20 px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
              Our AI <span className="text-green-300">products</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Machine Learning Models Card */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all group">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 mb-6 h-48 flex items-center justify-center">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg transition-colors cursor-pointer">
                      <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                    <span className="text-gray-400 text-xl">+</span>
                    <div className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg transition-colors cursor-pointer">
                      <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span className="text-gray-400 text-xl">+</span>
                    <div className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg transition-colors cursor-pointer">
                      <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Machine Learning Models</h3>
                <p className="text-gray-400 leading-relaxed">
                  Custom ML models for predictive analytics, classification, regression, and pattern recognition. Boost decision-making with data-driven AI insights.
                </p>
              </div>

              {/* Natural Language Processing Card */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all group">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 mb-6 h-48 flex flex-col justify-center space-y-3">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">User Query</span>
                    </div>
                    <p className="text-gray-400 text-xs">Analyze customer sentiment</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-xs text-white font-bold">
                        AI
                      </div>
                      <span className="text-gray-300 text-sm">NLP Engine</span>
                    </div>
                    <p className="text-blue-300 text-xs font-medium">Sentiment: 85% Positive</p>
                    <p className="text-gray-500 text-xs mt-1">Key themes: satisfaction, quality, service, value...</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Natural Language Processing</h3>
                <p className="text-gray-400 leading-relaxed">
                  Advanced NLP solutions for text analysis, sentiment analysis, language translation, and intelligent document processing to understand human language.
                </p>
              </div>

              {/* Computer Vision Card */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all group">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 mb-6 h-48 flex items-center justify-center relative">
                  <div className="absolute top-8 right-8 w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div className="border-2 border-green-400 rounded-lg px-6 py-3 bg-gray-800/50">
                    <p className="text-green-400 font-medium">Object Detected</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Computer Vision</h3>
                <p className="text-gray-400 leading-relaxed">
                  AI-powered image and video analysis including object detection, facial recognition, quality inspection, and visual content understanding for automation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 bg-black border-t border-gray-900 py-12 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                ai@nebula.com
              </h2>
            </div>

            <div className="h-px bg-gray-900 mb-12"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Contact Info */}
              <div>
                <p className="text-gray-400 mb-2">ai@nebula.com</p>
                <p className="text-gray-400">+1 (234) 567-8900</p>
              </div>

              {/* Navigation Links */}
              <div>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Process
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      AI Products
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Projects
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Testimonials
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                      Contact <span className="ml-1">↗</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Dribbble
                    </a>
                  </li>
                  <li className="pt-4">
                    <p className="text-gray-500 text-sm">Powered by Readdy</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Zap, Target, TrendingUp, Brain, FileText, Search, BarChart, MessageSquare, CheckCircle, ArrowRight, Play, Menu, X, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const particlesRef = useRef(null);
  const logoMarqueeRef = useRef(null);
  const terminalRef = useRef(null);
  const navigate = useNavigate();

  // Hero animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Particle animation
      gsap.to('.particle', {
        y: 'random(-100, 100)',
        x: 'random(-100, 100)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.2
      });

      // Hero title animation
      const tl = gsap.timeline();
      tl.from(titleRef.current?.children || [], {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out'
      })
        .from(subtitleRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.5')
        .from(ctaRef.current?.children || [], {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out'
        }, '-=0.4');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Logo marquee
  useEffect(() => {
    const marquee = logoMarqueeRef.current;
    if (!marquee) return;

    gsap.to(marquee, {
      x: '-50%',
      duration: 20,
      repeat: -1,
      ease: 'none'
    });
  }, []);

  // Terminal typing effect
  useEffect(() => {
    const terminal = terminalRef.current;
    if (!terminal) return;

    const lines = [
      '> Initializing AutoJob AI...',
      '> Analyzing resume... ✓',
      '> Scanning 1,247 job postings...',
      '> Found 23 perfect matches ✓',
      '> Customizing applications...',
      '> Submitted 23 applications ✓',
      '> Success! You have 5 interview requests.'
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = '';

    const typeWriter = () => {
      if (lineIndex < lines.length) {
        if (charIndex < lines[lineIndex].length) {
          currentLine += lines[lineIndex].charAt(charIndex);
          terminal.innerHTML = lines.slice(0, lineIndex).join('<br>') +
            (lineIndex > 0 ? '<br>' : '') + currentLine + '<span class="animate-pulse">_</span>';
          charIndex++;
          setTimeout(typeWriter, 30);
        } else {
          lineIndex++;
          charIndex = 0;
          currentLine = '';
          setTimeout(typeWriter, 500);
        }
      }
    };

    ScrollTrigger.create({
      trigger: terminal,
      start: 'top 80%',
      onEnter: () => typeWriter()
    });
  }, []);

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/10"
      >
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent cursor-pointer">
              AutoJob AI
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="hover:text-blue-400 transition-colors cursor-pointer">Features</a>
            <a href="#how-it-works" className="hover:text-blue-400 transition-colors cursor-pointer">How It Works</a>
            <a href="#demo" className="hover:text-blue-400 transition-colors cursor-pointer">Demo</a>
            <a href="#pricing" className="hover:text-blue-400 transition-colors cursor-pointer">Pricing</a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>navigate('/signup')}
              className="px-6 py-2 bg-linear-to-r from-blue-500 to-purple-500 rounded-full font-semibold cursor-pointer"
            >
              Get Started
            </motion.button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-lg border-b border-white/10 px-6 py-4 space-y-4"
          >
            <a href="#features" className="block hover:text-blue-400">Features</a>
            <a href="#how-it-works" className="block hover:text-blue-400">How It Works</a>
            <a href="#demo" className="block hover:text-blue-400">Demo</a>
            <a href="#pricing" className="block hover:text-blue-400">Pricing</a>
            <button className="w-full px-6 py-2 bg-linear-to-r from-blue-500 to-purple-500 rounded-full font-semibold">
              Get Started
            </button>
          </motion.div>
        )}
      </motion.header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated background */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-900/20 via-purple-900/20 to-black">
          <div ref={particlesRef} className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="particle absolute w-2 h-2 bg-blue-500/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-[radial-linear(ellipse_at_center,var(--tw-linear-stops))] from-blue-900/10 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div ref={titleRef} className="mb-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
              <span className="block">AI That Applies to Jobs</span>
              <span className="block bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                While You Sleep
              </span>
            </h1>
          </div>

          <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            AutoJob AI finds perfect job matches, customizes your resume, and submits applications automatically.
            Wake up to interview requests.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer group relative px-8 py-4 bg-linear-to-r from-blue-500 to-purple-500 rounded-full font-bold text-lg overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer px-8 py-4 border-2 border-white/20 rounded-full font-bold text-lg hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <Play className="w-5 h-5" /> Watch Demo
            </motion.button>
          </div>
        </div>
      </section>

      {/* Trusted By Logos */}
      <section className="py-12 border-y border-white/10 bg-white/5 overflow-hidden">
        <p className="text-center text-gray-400 mb-8">Trusted by job seekers at</p>
        <div ref={logoMarqueeRef} className="flex gap-12 items-center whitespace-nowrap">
          {[...Array(2)].map((_, setIndex) => (
            <React.Fragment key={setIndex}>
              {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Tesla', 'OpenAI'].map((company, i) => (
                <div key={`${setIndex}-${i}`} className="text-2xl font-bold text-gray-600 mx-8">
                  {company}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-6">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-center mb-20"
          >
            How AutoJob AI <span className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Works</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FileText, title: 'Upload Resume', desc: 'Upload your resume and set your preferences', step: '01' },
              { icon: Brain, title: 'AI Matches Jobs', desc: 'Our AI analyzes thousands of jobs to find perfect matches', step: '02' },
              { icon: Zap, title: 'Auto Apply', desc: 'AI customizes and submits applications instantly', step: '03' },
              { icon: BarChart, title: 'Track & Improve', desc: 'Monitor applications and get AI-powered improvement tips', step: '04' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative p-8 bg-linear-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl group hover:border-blue-500/50 transition-all"
              >
                <div className="absolute top-4 right-4 text-6xl font-bold text-white/5 group-hover:text-blue-500/10 transition-colors">
                  {item.step}
                </div>
                <item.icon className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section id="features" className="py-32 px-6 bg-linear-to-b from-blue-900/10 to-purple-900/10">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-center mb-8"
          >
            Powered by <span className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Advanced AI</span>
          </motion.h2>
          <p className="text-center text-gray-400 text-xl mb-20 max-w-2xl mx-auto">
            Our AI agents work 24/7 to get you hired faster
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, title: 'AI Resume Optimizer', desc: 'Automatically tailors your resume for each job application', color: 'from-blue-500 to-cyan-500' },
              { icon: Search, title: 'Smart Job Scraper', desc: 'Scans thousands of job boards in real-time', color: 'from-purple-500 to-pink-500' },
              { icon: Zap, title: 'Auto Apply Bot', desc: 'Submits applications with one-click or fully automated', color: 'from-orange-500 to-red-500' },
              { icon: BarChart, title: 'Application Tracker', desc: 'Track all applications and responses in one dashboard', color: 'from-green-500 to-emerald-500' },
              { icon: Brain, title: 'Interview Prediction AI', desc: 'Predicts interview questions and provides prep materials', color: 'from-indigo-500 to-blue-500' },
              { icon: Target, title: 'Success Analytics', desc: 'Get insights on what works and optimize your strategy', color: 'from-pink-500 to-rose-500' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-lg bg-linear-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Terminal */}
      <section id="demo" className="py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-center mb-20"
          >
            See AutoJob AI <span className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">In Action</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-sm text-gray-400">AutoJob AI Terminal</span>
            </div>
            <div ref={terminalRef} className="p-6 font-mono text-sm text-green-400 h-64 overflow-y-auto">
              <span className="animate-pulse">_</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why AutoJob AI */}
      <section className="py-32 px-6 bg-linear-to-b from-purple-900/10 to-black">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Why Choose <span className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">AutoJob AI</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Traditional job hunting is time-consuming and frustrating. AutoJob AI changes the game with AI automation.
              </p>
              <ul className="space-y-4">
                {[
                  'Save 20+ hours per week on job applications',
                  'Apply to 10x more jobs with personalized resumes',
                  'Get interview requests while you sleep',
                  'AI learns from your successes and improves',
                  'Track everything in one beautiful dashboard'
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                    <span className="text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '10x', label: 'More Applications' },
                  { value: '95%', label: 'Time Saved' },
                  { value: '3x', label: 'Interview Rate' },
                  { value: '24/7', label: 'AI Working' }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5, rotateY: -45 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    className="p-6 bg-linear-to-br from-white/10 to-white/5 border border-white/20 rounded-xl text-center backdrop-blur-sm"
                  >
                    <div className="text-4xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 overflow-hidden">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-center mb-20"
          >
            Loved by <span className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Job Seekers</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah Chen', role: 'Software Engineer', text: 'Got 5 interviews in my first week! AutoJob AI is a game-changer.', avatar: '👩‍💻' },
              { name: 'Marcus Johnson', role: 'Product Manager', text: 'Applied to 100+ jobs while focusing on interview prep. Hired in 3 weeks!', avatar: '👨‍💼' },
              { name: 'Emily Rodriguez', role: 'Data Scientist', text: 'The AI resume optimization is incredible. Every application felt personal.', avatar: '👩‍🔬' }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-6 bg-white/5 border border-white/10 rounded-xl"
              >
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 bg-linear-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              Let AI Get You <span className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Hired Faster</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Join thousands of job seekers who are landing their dream jobs with AutoJob AI
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              className="px-12 cursor-pointer py-5 bg-linear-to-r from-blue-500 to-purple-500 rounded-full font-bold text-xl relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2 justify-center">
                Start Your Job Search Now <Sparkles className="w-6 h-6 animate-pulse" />
              </span>
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-purple-500 to-pink-500"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            <p className="text-sm text-gray-500 mt-4">No credit card required • Free 7-day trial</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-8 h-8 text-blue-500" />
                <span className="text-xl font-bold">AutoJob AI</span>
              </div>
              <p className="text-gray-400 text-sm">AI-powered job application automation for the modern job seeker.</p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <motion.li whileHover={{ x: 5, color: '#60a5fa' }} className="cursor-pointer transition-colors">Features</motion.li>
                <motion.li whileHover={{ x: 5, color: '#60a5fa' }} className="cursor-pointer transition-colors">Pricing</motion.li>
                <motion.li whileHover={{ x: 5, color: '#60a5fa' }} className="cursor-pointer transition-colors">Demo</motion.li>
                <motion.li whileHover={{ x: 5, color: '#60a5fa' }} className="cursor-pointer transition-colors">API</motion.li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <motion.li whileHover={{ x: 5, color: '#60a5fa' }} className="cursor-pointer transition-colors">About</motion.li>
                <motion.li whileHover={{ x: 5, color: '#60a5fa' }} className="cursor-pointer transition-colors">Blog</motion.li>
                <motion.li whileHover={{ x: 5, color: '#60a5fa' }} className="cursor-pointer transition-colors">Careers</motion.li>
                <motion.li whileHover={{ x: 5, color: '#60a5fa' }} className="cursor-pointer transition-colors">Contact</motion.li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <motion.li whileHover={{ x: 5, color: '#60a5fa' }} className="cursor-pointer transition-colors">Privacy</motion.li>
                <motion.li whileHover={{ x: 5, color: '#60a5fa' }} className="cursor-pointer transition-colors">Terms</motion.li>
                <motion.li whileHover={{ x: 5, color: '#60a5fa' }} className="cursor-pointer transition-colors">Security</motion.li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2025 AutoJob AI. All rights reserved.</p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2, color: '#60a5fa' }}
                  className="text-gray-400 transition-colors"
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
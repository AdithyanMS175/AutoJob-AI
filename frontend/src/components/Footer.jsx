// src/components/Footer.jsx
import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HandwritingText from "./HandwritingText";

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",      // footer enters viewport
          end: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      // 1️⃣ Footer slide up
      tl.fromTo(
        footerRef.current,
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      // 2️⃣ Brand handwriting
      tl.to(
        ".footer-brand .char-animate",
        {
          opacity: 1,
          duration: 0.05,
          stagger: 0.06,
          ease: "none",
        },
        "-=0.5"
      );

      // 3️⃣ Links handwriting
      tl.to(
        ".footer-links .char-animate",
        {
          opacity: 1,
          duration: 0.04,
          stagger: 0.03,
          ease: "none",
        },
        "-=0.4"
      );

      // 4️⃣ Button text handwriting
      tl.to(
        ".footer-btn .char-animate",
        {
          opacity: 1,
          duration: 0.04,
          stagger: 0.03,
          ease: "none",
        },
        "-=0.3"
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-black text-white border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="footer-brand">
            <HandwritingText
              text="AutoJob AI"
              className="text-2xl font-extrabold tracking-wide"
            />
            <p className="mt-4 text-sm text-neutral-100 leading-relaxed">
              Building intelligent hiring experiences with precision, speed,
              and scalable cloud-first technology.
            </p>
          </div>

          {/* Navigation */}
          <div className="footer-links">
            <h3 className="text-sm uppercase tracking-widest text-neutral-100 mb-4">
              Navigation
            </h3>
            <ul className="space-y-3 text-sm">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <HandwritingText text={item} />
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-links">
            <h3 className="text-sm uppercase tracking-widest text-neutral-200 mb-4">
              Services
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                "AI Job Matching",
                "Resume Intelligence",
                "Freelancer Hiring",
                "Cloud Deployment",
              ].map((item) => (
                <li key={item}>
                  <HandwritingText text={item} />
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="footer-btn">
            <h3 className="text-sm uppercase tracking-widest text-neutral-200 mb-4">
              Get Started
            </h3>
            <p className="text-sm text-neutral-100 mb-6">
              Join AutoJob AI and experience the future of hiring.
            </p>
            <Link
              to="/signup"
              className="inline-block border border-white px-6 py-3 rounded-xl"
            >
              <HandwritingText text="Sign Up" />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row
                        items-center justify-between gap-4 text-sm text-neutral-300">
          <span>© {new Date().getFullYear()} AutoJob AI. All rights reserved.</span>
          <div className="flex gap-6 footer-links">
            <HandwritingText text="Privacy" />
            <HandwritingText text="Terms" />
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;

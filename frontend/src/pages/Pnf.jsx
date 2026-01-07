import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { Navigate, useNavigate } from "react-router-dom";

const HandwritingText = ({ text, className }) => {
  const chars = text.split("");
  return (
    <div className={`flex flex-wrap ${className}`}>
      {chars.map((char, index) => (
        <span
          key={index}
          className="char-animate opacity-0 inline-block min-w-[0.3em]"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};

function Pnf() {
  const containerRef = useRef(null);
  const navigate = useNavigate()
  const handleSign = () => {
    navigate('/')
  }

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Draw the divider line (now serves as a top margin line or you can remove)
      tl.fromTo(
        ".divider-line",
        { width: "0%" },
        { width: "100%", duration: 1.5, ease: "power2.inOut" }
      );

      // 2. "Write" the Main 404 Text
      tl.to(
        ".hero-text .char-animate",
        { opacity: 1, duration: 0.1, stagger: 0.1, ease: "none" },
        "-=0.5"
      );

      // 3. "Write" the subtext
      tl.to(
        ".sub-text .char-animate",
        { opacity: 1, duration: 0.05, stagger: 0.02, ease: "none" },
        "<"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white text-black p-8 font-['Architects_Daughter'] overflow-hidden flex flex-col items-center justify-center relative selection:bg-black selection:text-white"
    >
      {/* Decorative Line above the content */}
      <div className="divider-line h-[2px] bg-black w-1/2 mb-12 rounded-full"></div>

      {/* --- Main 404 Content --- */}
      <div className="flex flex-col items-center justify-center space-y-6">

        {/* Big 404 Text */}
        <div className="hero-text text-9xl font-bold tracking-tighter transform -rotate-2">
          <HandwritingText text="404" />
        </div>

        {/* Message */}
        <div className="sub-text text-3xl text-center max-w-2xl leading-relaxed">
          <HandwritingText text="Oops. looks like someone tore this page out..." />
        </div>

        {/* Button drawn by hand */}
        <button onClick={handleSign} className="mt-12 group relative inline-block">
          {/* SVG border for rough box look */}
          <svg className="absolute top-0 left-0 w-full h-full -z-10 overflow-visible">
            <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="black" strokeWidth="2"
              className="path-draw opacity-0 group-hover:opacity-100 transition-opacity" />
          </svg>
          <div className=" cursor-pointer sub-text px-8 py-3 text-2xl border-2 border-black border-dashed hover:border-solid hover:bg-black hover:text-white transition-all duration-300">
            <HandwritingText text="Go Home ->" />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Pnf;
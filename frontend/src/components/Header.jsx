import React, { useRef, useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { RxHamburgerMenu } from 'react-icons/rx';

// --- Helper: Handwriting Effect ---
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

function Header() {
  const headerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);


  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Draw Line
      tl.fromTo(
        ".header-line",
        { width: "0%" },
        { width: "100%", duration: 1.2, ease: "power2.inOut" }
      );

      // 2. Logo
      tl.to(
        ".logo-area .char-animate",
        { opacity: 1, duration: 0.05, stagger: 0.05, ease: "none" },
        "-=0.8"
      );

      // 3. Links
      tl.to(
        ".menu-item .char-animate",
        { opacity: 1, duration: 0.05, stagger: 0.02, ease: "none" },
        "-=0.5"
      );

      // 4. Button Text
      tl.to(
        ".btn-text .char-animate",
        { opacity: 1, duration: 0.05, stagger: 0.02, ease: "none" },
        "<"
      );

    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>

      {/*  Main Header Structure */}
      <div
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 text-white font-['Architects_Daughter']"
      >
        <div className='flex justify-between mx-10 p-5 items-center relative'>

          {/* Logo */}
          <div className='logo-area text-2xl md:text-4xl font-extrabold select-none cursor-pointer'>
            <HandwritingText text="AutoJob AI" />
          </div>

          {/* Nav Links */}
          <ul className='hidden lg:flex '>
            {["About", "Services", "Contact", "Careers"].map((item, idx) => (
              <li key={idx} className='menu-item mx-4 text-xl cursor-pointer hover:font-bold hover:text-2xl transition-all'>
                <HandwritingText text={item} />
              </li>
            ))}
          </ul>

          <ul
            className={`md:hidden absolute top-24 left-0 right-0  backdrop-blur-sm border border-black
                           flex flex-col items-center gap-6 py-8 transition-all duration-300
                           ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"}`}
          >
            {["About", "Services", "Contact", "Careers"].map((item, idx) => (
              <li
                key={idx}
                className="menu-item text-2xl cursor-pointer hover:font-bold transition-all"
                onClick={() => setMenuOpen(false)}
              >
                <HandwritingText text={item} />
              </li>
            ))}
          </ul>

          <div
            className="md:hidden block cursor-pointer z-50"
            onClick={() => setMenuOpen(prev => !prev)}
          >
            <RxHamburgerMenu size={28} />
          </div>


          {/* --- LIQUID SIGN UP BUTTON --- */}
          <Link
            to="/signup"
            className="hidden md:block relative overflow-hidden border-2 border-black text-white px-8 py-3 rounded-xl group font-bold"
          >
            {/* The Text (z-20 to sit on top of the ink) */}
            <span className="btn-text relative z-20 group-hover:text-white transition-colors duration-500 ease-in-out block">
              <HandwritingText text="Sign Up" />
            </span>

            {/* The Ink Container */}
            {/* Starts fully pushed down (translate-y-[120%]) and moves up on hover */}
            <div className="absolute inset-0 translate-y-[120%] group-hover:translate-y-[0%] transition-transform duration-700 ease-in-out z-10 w-full h-full bg-black">

              {/* The Wavy Top Edge */}
              {/* It sits just above (-top-4) the black fill */}
              <div className="absolute -top-3 left-0 w-[200%] h-6 flex animate-wave">
                {/* We repeat the SVG twice to create a seamless infinite scroll loop */}
                <svg className="w-1/2 h-full fill-black" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                    transform="scale(1, -1) translate(0, -120)" />
                  {/* Note: Path is flipped to look like a liquid surface */}
                </svg>
                <svg className="w-1/2 h-full fill-black" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                    transform="scale(1, -1) translate(0, -120)" />
                </svg>
              </div>
            </div>

          </Link>

          {/* Animated Header Line */}
          <div className="header-line absolute bottom-0 left-0 h-0.5 bg-white"></div>
        </div>
      </div>
    </>
  )
}

export default Header
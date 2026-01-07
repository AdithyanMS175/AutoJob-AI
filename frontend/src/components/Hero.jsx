import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    gsap.from(".hero-char", {
      y: 20,
      opacity: 50,
      stagger: 0.04,
      duration: 1.2,
      ease: "power4.out",
    });
  }, []);

  const text = "AI That Finds Jobs For You";

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="text-center max-w-4xl">
        <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight">
          {text.split("").map((c, i) => (
            <span key={i} className="hero-char inline-block">
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </h1>

        <p className="mt-6 text-neutral-400 text-lg">
          Smart job matching, resume optimization, and auto-apply powered by AI.
        </p>

        <div className="mt-10 flex gap-4 justify-center">
          <button className="px-8 py-3 bg-white text-black rounded-xl">
            Get Started
          </button>
          <button className="px-8 py-3 border border-white/30 rounded-xl">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
}

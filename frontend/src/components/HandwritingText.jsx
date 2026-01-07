import React from "react";

const HandwritingText = ({ text, className }) => {
  return (
    <div className={`flex flex-wrap ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char-animate opacity-0 inline-block min-w-[0.3em]"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};

export default HandwritingText;
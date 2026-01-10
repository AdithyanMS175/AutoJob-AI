import { X } from "lucide-react";
import { useState } from "react";

function SkillsInput({ skills, setSkills }) {
  const [input, setInput] = useState("");

  const addSkill = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();

      if (!skills.includes(input.trim())) {
        setSkills([...skills, input.trim()]);
      }
      setInput("");
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            {skill}
            <button onClick={() => removeSkill(index)}>
              <X size={14} />
            </button>
          </span>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={addSkill}
        placeholder="Add a skill and press Enter"
        className="w-full px-4 py-3 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}

export default SkillsInput;



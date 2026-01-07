import React from 'react';

const AIMatchBadge = ({ score }) => {
  // Determine color based on score
  let colorClass = "bg-red-500/10 text-red-400 border-red-500/20"; // Low
  if (score >= 80) {
    colorClass = "bg-green-500/10 text-green-400 border-green-500/20"; // High
  } else if (score >= 50) {
    colorClass = "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"; // Medium
  }

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${colorClass} w-fit`}>
      <span className="text-sm font-bold">{score}%</span>
      <span className="text-xs opacity-70">Match</span>
    </div>
  );
};

export default AIMatchBadge;
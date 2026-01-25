import React from "react";

function ResumeATSModal({ data, onClose, onApply }) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-[#0f0f0f] rounded-2xl w-full max-w-xl lg:h-[85vh] overflow-y-auto no-scrollbar p-6 border border-white/10">
        
        <h2 className="text-xl font-bold text-white mb-2">
          Resume ATS Analysis
        </h2>

        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl font-bold text-purple-400">
            {data.atsScore}%
          </div>
          <p className="text-gray-400 text-sm">
            {data.summary}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-white font-semibold mb-1">
              Missing Keywords
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.missingKeywords.map((k, i) => (
                <span
                  key={i}
                  className="bg-white/10 text-sm px-2 py-1 rounded"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-1">
              Improvement Suggestions
            </h4>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              {data.improvements.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          {data.optimizedSummary && (
            <div>
              <h4 className="text-white font-semibold mb-1">
                Optimized Summary
              </h4>
              <p className="text-gray-300 text-sm bg-white/5 p-3 rounded-lg">
                {data.optimizedSummary}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-white/10 text-white"
          >
            Close
          </button>

          <button
            onClick={onApply}
            className="px-4 py-2 rounded bg-purple-600 text-white"
          >
            Auto-Fill Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResumeATSModal;

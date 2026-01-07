import React from 'react';

const StatsWidget = ({ title, count, trend, icon }) => {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all duration-300 shadow-lg flex items-start justify-between">
      <div>
        <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
        <div className="flex items-end gap-3 mt-2">
          <span className="text-3xl font-bold text-white">{count}</span>
          {trend && (
            <span className="text-purple-400 text-xs bg-purple-500/10 px-2 py-1 rounded-full border border-purple-500/20">
              {trend}
            </span>
          )}
        </div>
      </div>
      {icon && <div className="text-2xl p-3 bg-slate-800 rounded-lg text-purple-400">{icon}</div>}
    </div>
  );
};

export default StatsWidget;
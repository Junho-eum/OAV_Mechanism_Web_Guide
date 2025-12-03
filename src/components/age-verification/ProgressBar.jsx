import React from "react";

export default function ProgressBar({ total = 0, viewed = 0 }) {
  const safeTotal = total > 0 ? total : 1;
  const clampedViewed = Math.min(viewed, safeTotal);
  const percent = Math.min(100, Math.round((clampedViewed / safeTotal) * 100));

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-base text-gray-600">
        <span>
          Viewed {clampedViewed} of {safeTotal} methods
        </span>
        <span>{percent}%</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gray-800 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
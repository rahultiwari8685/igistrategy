"use client";

import { useEffect, useState } from "react";

// 🔢 Smooth count animation
const useCountUp = (end, duration = 800) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (end === undefined || end === null) return;

    let start = 0;
    const frames = duration / 16;
    const increment = end / frames;

    const counter = setInterval(() => {
      start += increment;

      if (start >= end) {
        setValue(end);
        clearInterval(counter);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [end, duration]);

  return value;
};

// 🎯 Single option bar
const ResultBar = ({ opt, isSelected }) => {
  const animatedPercent = useCountUp(opt.percent);

  return (
    <div
      className={`p-3 rounded-md transition-all ${
        isSelected
          ? "bg-gray-100 border border-black"
          : "bg-white border border-gray-200"
      }`}
    >
      {/* Text + % */}
      <div className="flex justify-between items-center text-sm mb-2">
        <div className="flex items-center gap-2">
          <span className={isSelected ? "font-semibold" : ""}>{opt.text}</span>

          {/* ✅ Your vote badge */}
          {isSelected && (
            <span className="text-xs bg-black text-white px-2 py-0.5 rounded">
              Your Vote
            </span>
          )}
        </div>

        <span className="font-medium">{animatedPercent}%</span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-gray-200 rounded overflow-hidden">
        <div
          className={`h-2 transition-all duration-700 ${
            isSelected ? "bg-black" : "bg-gray-400"
          }`}
          style={{ width: `${animatedPercent}%` }}
        />
      </div>
    </div>
  );
};

// 🧠 Main Component
const EditorialPollResult = ({ poll, results, selectedIndex }) => {
  if (!poll || !results?.options) return null;

  return (
    <div className="border border-gray-200 bg-white p-6 md:p-8 max-w-3xl mx-auto rounded-md shadow-sm">
      {/* Heading */}
      <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
        Public Opinion
      </p>

      <h2 className="text-2xl font-serif font-semibold mb-6 leading-snug">
        {poll.question}
      </h2>

      {/* Results */}
      <div className="space-y-3">
        {results.options.map((opt, i) => (
          <ResultBar key={i} opt={opt} isSelected={i === selectedIndex} />
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6 text-xs text-gray-500">
        <span>{(results?.totalVotes ?? 0).toLocaleString()} votes</span>

        {selectedIndex !== null && (
          <span className="text-green-600 font-medium">✔ You have voted</span>
        )}
      </div>
    </div>
  );
};

export default EditorialPollResult;

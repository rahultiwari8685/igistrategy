"use client";

import { useEffect, useState } from "react";

const useCountUp = (end, duration = 800) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!end) return;

        let start = 0;
        const increment = end / (duration / 16);

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

const EditorialPollResult = ({ poll, results, selectedIndex }) => {

    if (!poll || !results?.options) return null;

    return (
        <div className="border border-gray-200 bg-white p-6 md:p-8 max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                Poll Results
            </p>

            <h2 className="text-2xl font-serif font-semibold mb-6">
                {poll.question}
            </h2>

            <div className="space-y-4">
                {results.options.map((opt, i) => {
                    const animatedPercent = useCountUp(opt.percent);

                    return (
                        <div key={i}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className={i === selectedIndex ? "font-semibold" : ""}>
                                    {opt.text}
                                </span>

                                <span>{animatedPercent}%</span>
                            </div>

                            <div className="h-2 bg-gray-200 overflow-hidden">
                                <div
                                    className={`h-2 transition-all duration-700 ${i === selectedIndex ? "bg-black" : "bg-gray-400"
                                        }`}
                                    style={{ width: `${animatedPercent}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <p className="text-xs text-gray-500 mt-6">
                {(results?.totalVotes ?? 0).toLocaleString()} readers participated
            </p>
        </div>
    );
};

export default EditorialPollResult;

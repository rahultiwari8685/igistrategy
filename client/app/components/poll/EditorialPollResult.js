"use client";

const EditorialPollResult = ({ poll, results, selectedIndex }) => {
    return (
        <div className="border border-gray-200 bg-white p-6 md:p-8 max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                Poll Results
            </p>

            <h2 className="text-2xl font-serif font-semibold mb-6">
                {poll.question}
            </h2>

            <div className="space-y-4">
                {results.options.map((opt, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className={i === selectedIndex ? "font-semibold" : ""}>
                                {opt.text}
                            </span>
                            <span>{opt.percent}%</span>
                        </div>

                        <div className="h-2 bg-gray-200">
                            <div
                                className={`h-2 ${i === selectedIndex ? "bg-black" : "bg-gray-400"
                                    }`}
                                style={{ width: `${opt.percent}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-xs text-gray-500 mt-6">
                {results.totalVotes.toLocaleString()} readers participated
            </p>
        </div>
    );
};

export default EditorialPollResult;

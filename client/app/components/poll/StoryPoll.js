"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import setting from "../../../setting.json";

const StoryPoll = ({ poll, onVoted }) => {
    const router = useRouter();
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);

    const vote = async (index) => {
        const logininfo = JSON.parse(localStorage.getItem("logininfo"));

        if (!logininfo?.token) {
            router.push("/login");
            return;
        }

        setSelected(index);
        setLoading(true);

        const res = await fetch(
            `${setting.api}/api/polls/${poll._id}/vote`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${logininfo.token}`,
                },
                body: JSON.stringify({ option_index: index }),
            }
        );

        const data = await res.json();

        if (data.success) {
            onVoted(index);
        } else {
            alert(data.message || "Already voted");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto rounded-3xl overflow-hidden shadow-lg
                        bg-gradient-to-br from-indigo-600 to-purple-600
                        text-white p-6">

            {/* HEADER */}
            <div className="mb-6">
                <p className="text-xs uppercase opacity-80 mb-1">
                    Community Poll
                </p>
                <h2 className="text-xl font-bold leading-snug">
                    {poll.question}
                </h2>
            </div>

            {/* OPTIONS */}
            <div className="space-y-4">
                {poll.options.map((opt, i) => (
                    <button
                        key={i}
                        disabled={loading}
                        onClick={() => vote(i)}
                        className="w-full text-left px-5 py-4 rounded-xl
                                   bg-white/15 backdrop-blur
                                   hover:bg-white/25 transition
                                   font-medium"
                    >
                        {opt.text}
                    </button>
                ))}
            </div>

            {/* FOOTER */}
            <p className="text-xs text-center mt-6 opacity-70">
                Tap to vote • Secure & private
            </p>
        </div>
    );
};

export default StoryPoll;

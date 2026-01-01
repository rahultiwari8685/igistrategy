"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import setting from "../../../setting.json";

const PollCard = ({ poll, onVoted }) => {
    const router = useRouter();
    const [selected, setSelected] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const vote = async () => {
        const logininfo = JSON.parse(localStorage.getItem("logininfo"));

        if (!logininfo?.token) {
            router.push("/login");
            return;
        }

        if (selected === null) return alert("Please select an option");

        setSubmitting(true);

        const res = await fetch(
            `${setting.api}/api/polls/${poll._id}/vote`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${logininfo.token}`,
                },
                body: JSON.stringify({ option_index: selected }),
            }
        );

        const data = await res.json();

        if (data.success) {
            onVoted(poll._id);
        } else {
            alert(data.message || "Already voted");
        }

        setSubmitting(false);
    };

    return (
        <div className="border-l-4 border-blue-600 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
                {poll.question}
            </h3>

            <div className="space-y-2 mb-4">
                {poll.options.map((opt, i) => (
                    <label
                        key={i}
                        className={`flex items-center gap-3 p-2 rounded cursor-pointer
                    ${selected === i ? "bg-blue-50" : "hover:bg-gray-50"}`}
                    >
                        <input
                            type="radio"
                            name="poll"
                            checked={selected === i}
                            onChange={() => setSelected(i)}
                        />
                        <span>{opt.text}</span>
                    </label>
                ))}
            </div>

            <button
                onClick={vote}
                disabled={submitting}
                className="text-sm bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
                Vote
            </button>
        </div>

    );
};

export default PollCard;

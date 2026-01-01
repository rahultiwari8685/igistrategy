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
        <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4">{poll.question}</h2>

            <div className="space-y-3 mb-6">
                {poll.options.map((opt, i) => (
                    <label
                        key={i}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer
              ${selected === i ? "border-blue-600 bg-blue-50" : ""}`}
                    >
                        <input
                            type="radio"
                            name="poll"
                            className="mr-3"
                            checked={selected === i}
                            onChange={() => setSelected(i)}
                        />
                        {opt.text}
                    </label>
                ))}
            </div>

            <button
                onClick={vote}
                disabled={submitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
            >
                {submitting ? "Submitting..." : "Vote Now"}
            </button>
        </div>
    );
};

export default PollCard;

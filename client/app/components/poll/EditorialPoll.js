"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import setting from "../../../setting.json";

const EditorialPoll = ({ poll, onVoted }) => {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitVote = async () => {
    if (loading) return;

    const logininfo = JSON.parse(localStorage.getItem("logininfo"));
    if (!logininfo?.token) {
      router.push("/login");
      return;
    }

    if (selected === null) return;

    setLoading(true);

    try {
      const res = await fetch(`${setting.api}/api/polls/${poll._id}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${logininfo.token}`,
        },
        body: JSON.stringify({ option_index: selected }),
      });
      const data = await res.json();

      if (data.success) {
        alert("Vote submitted successfully");
        onVoted(selected);
      } else alert(data.message || "Already voted");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-200 bg-white p-6 md:p-8 max-w-3xl mx-auto">
      <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
        Public Opinion
      </p>

      <h2 className="text-2xl font-serif font-semibold leading-snug mb-6">
        {poll.question}
      </h2>

      <div className="space-y-3">
        if (!poll || !poll.options) return null;
        {poll.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-full text-left px-4 py-3 border rounded-md transition
              ${
                selected === i
                  ? "border-black bg-gray-100"
                  : "hover:border-gray-400"
              }`}
          >
            {opt.text}
          </button>
        ))}
      </div>

      <button
        onClick={submitVote}
        disabled={loading || selected === null}
        className="mt-6 px-6 py-2 bg-black text-white text-sm rounded disabled:opacity-50"
      >
        {loading ? "Submitting…" : "Submit Opinion"}
      </button>
    </div>
  );
};

export default EditorialPoll;

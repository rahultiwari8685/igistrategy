"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import setting from "../../../setting.json";

const StoryPoll = ({ poll, onVoted }) => {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!poll || !poll.options) return null;

  const vote = async (index) => {
    if (loading) return;

    const logininfo = JSON.parse(localStorage.getItem("logininfo"));

    if (!logininfo?.token) {
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${setting.api}/api/polls/${poll._id}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${logininfo.token}`,
        },
        body: JSON.stringify({ option_index: index }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid server response");
      }

      if (data.success) {
        setSelected(index);
        onVoted(index);
      } else {
        alert(data.message || "Already voted");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="max-w-md mx-auto rounded-3xl overflow-hidden shadow-lg
                    bg-gradient-to-br from-indigo-600 to-purple-600
                    text-white p-6"
    >
      <div className="mb-6">
        <p className="text-xs uppercase opacity-80 mb-1">Community Poll</p>
        <h2 className="text-xl font-bold leading-snug">{poll.question}</h2>
      </div>

      <div className="space-y-4">
        {poll.options.map((opt, i) => (
          <button
            key={opt._id || i}
            disabled={loading}
            onClick={() => vote(i)}
            className="w-full text-left px-5 py-4 rounded-xl
                       bg-white/15 backdrop-blur
                       hover:bg-white/25 transition
                       font-medium disabled:opacity-60"
          >
            {opt.text}
          </button>
        ))}
      </div>

      {loading && (
        <p className="text-xs text-center mt-4 opacity-70">Submitting...</p>
      )}

      <p className="text-xs text-center mt-6 opacity-70">
        Tap to vote • Secure & private
      </p>
    </div>
  );
};

export default StoryPoll;

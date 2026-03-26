"use client";

import { useEffect, useState } from "react";
import setting from "../../../setting.json";
import EditorialPoll from "./EditorialPoll";
import EditorialPollResult from "./EditorialPollResult";

const PollContainer = () => {
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);

  const [voted, setVoted] = useState(false);
  const [results, setResults] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const loadPoll = async () => {
      try {
        const res = await fetch(`${setting.api}/api/polls/active`);
        const data = await res.json();

        if (data.success && data.data) {
          setPoll(data.data);
        }
      } catch (err) {
        console.error("Failed to load poll", err);
      } finally {
        setLoading(false);
      }
    };

    loadPoll();
  }, []);

  const handleVoted = async (index) => {
    setSelectedIndex(index);

    const res = await fetch(`${setting.api}/api/polls/${poll._id}/results`);
    const data = await res.json();

    if (data.success) {
      setResults(data.data);
      setVoted(true);
    }
  };

  if (loading || !poll) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        {!voted ? (
          <EditorialPoll poll={poll} onVoted={handleVoted} />
        ) : (
          <EditorialPollResult
            poll={poll}
            results={results}
            selectedIndex={selectedIndex}
          />
        )}
      </div>
    </section>
  );
};

export default PollContainer;

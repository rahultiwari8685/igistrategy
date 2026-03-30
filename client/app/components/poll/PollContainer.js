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
  const [fetchingResult, setFetchingResult] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadPoll = async () => {
      try {
        const res = await fetch(`${setting.api}/api/polls/active`, {
          signal: controller.signal,
        });
        const data = await res.json();

        if (data.success && data.data) {
          setPoll(data.data);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to load poll", err);
        }
      } finally {
        setLoading(false);
      }
    };

    loadPoll();

    return () => controller.abort();
  }, []);

  // const handleVoted = async (index) => {
  //   if (fetchingResult || !poll?._id) return;

  //   setSelectedIndex(index);
  //   setFetchingResult(true);

  //   try {
  //     const res = await fetch(`${setting.api}/api/polls/${poll._id}/results`);
  //     const data = await res.json();

  //     if (data.success) {
  //       setResults(data.data);
  //       setVoted(true);
  //     }
  //   } catch (err) {
  //     console.error("Failed to fetch results", err);
  //   } finally {
  //     setFetchingResult(false);
  //   }
  // };

  const handleVoted = async (index) => {
    if (!poll?._id) return;

    setSelectedIndex(index);
    setFetchingResult(true);

    try {
      const res = await fetch(`${setting.api}/api/polls/${poll._id}/results`);
      const data = await res.json();

      if (data.success) {
        setResults(data.data);
        setVoted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingResult(false);
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading poll...</p>;
  }

  if (!poll) {
    return <p className="text-center py-10">No poll available</p>;
  }

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

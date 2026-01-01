"use client";

import { useEffect, useState } from "react";
import setting from "../../../setting.json";
import StoryPoll from "./StoryPoll";
import StoryPollResult from "./StoryPollResult";

const PollContainer = () => {
    const [poll, setPoll] = useState(null);
    const [voted, setVoted] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);

    /* FETCH ACTIVE POLL */
    useEffect(() => {
        const loadPoll = async () => {
            try {
                const res = await fetch(`${setting.api}/api/polls/active`);
                const data = await res.json();

                if (data.success && data.data) {
                    setPoll(data.data);
                }
            } catch (err) {
                console.error("Poll load failed", err);
            } finally {
                setLoading(false);
            }
        };

        loadPoll();
    }, []);

    /* AFTER VOTE */
    const handleVoted = async (index) => {
        setSelectedIndex(index);

        const res = await fetch(
            `${setting.api}/api/polls/${poll._id}/results`
        );
        const data = await res.json();

        if (data.success) {
            setResults(data.data);
            setVoted(true);
        }
    };

    if (loading || !poll) return null;

    return (
        <section className="container my-5">
            {!voted ? (
                <StoryPoll poll={poll} onVoted={handleVoted} />
            ) : (
                <StoryPollResult
                    poll={poll}
                    results={results}
                    selectedIndex={selectedIndex}
                />
            )}
        </section>
    );
};

export default PollContainer;

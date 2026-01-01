"use client";

import { useEffect, useState } from "react";
import PollCard from "./PollCard";
import PollResult from "./PollResult";
import setting from "../../../setting.json";

const PollContainer = () => {
    const [poll, setPoll] = useState(null);
    const [loading, setLoading] = useState(true);
    const [voted, setVoted] = useState(false);
    const [results, setResults] = useState(null);

    /* LOAD ACTIVE POLL */
    useEffect(() => {
        fetch(`${setting.api}/api/polls/active`)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    setPoll(data.data);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    /* AFTER VOTE → LOAD RESULTS */
    const loadResults = async (pollId) => {
        const res = await fetch(`${setting.api}/api/polls/${pollId}/results`);
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
                    <PollCard poll={poll} onVoted={loadResults} />
                ) : (
                    <PollResult poll={results} />
                )}

            </div>
        </section>
    );
};

export default PollContainer;

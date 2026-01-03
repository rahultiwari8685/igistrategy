"use client";

import { useEffect, useState } from "react";
import setting from "../../setting.json";

export default function YouTubeLive() {
    const [live, setLive] = useState(null);

    useEffect(() => {
        const fetchLive = async () => {
            const res = await fetch(`${setting.api}/api/live/status`);
            const data = await res.json();
            if (data.success) setLive(data.data);
        };

        fetchLive();
        const interval = setInterval(fetchLive, 60000);
        return () => clearInterval(interval);
    }, []);

    if (!live?.isLive) return null;

    return (
        <section className="container my-5">
            <h2 className="text-xl font-semibold mb-4">
                🔴 We are LIVE now
            </h2>

            <div className="aspect-video">
                <iframe
                    width="100%"
                    height="500"
                    src={`https://www.youtube.com/embed/${live.videoId}?autoplay=1`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                />
            </div>
        </section>
    );
}

"use client";

import { useEffect, useState } from "react";
import setting from "../../setting.json";

export default function YouTubeLive() {
  const [live, setLive] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchLive = async () => {
      try {
        const res = await fetch(`${setting.api}/api/live/status`, {
          signal: controller.signal,
        });

        let data;
        try {
          data = await res.json();
        } catch {
          throw new Error("Invalid response");
        }

        if (data.success) {
          setLive(data.data);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Live fetch error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLive();

    const interval = setInterval(fetchLive, 60000);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return <p className="text-center my-5">Checking live status...</p>;
  }

  if (!live?.isLive || !live?.videoId) return null;

  return (
    <section className="container my-5">
      <h2 className="text-xl font-semibold mb-4">🔴 We are LIVE now</h2>

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

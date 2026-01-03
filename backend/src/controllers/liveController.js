
export const getLiveStatus = async (req, res) => {
    try {
        // 🚫 disable caching completely
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
        res.setHeader("Surrogate-Control", "no-store");

        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${process.env.YOUTUBE_CHANNEL_ID}&eventType=live&type=video&key=${process.env.YOUTUBE_API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const liveVideo = data.items[0];

            return res.json({
                success: true,
                data: {
                    isLive: true,
                    videoId: liveVideo.id.videoId,
                    title: liveVideo.snippet.title,
                    thumbnail: liveVideo.snippet.thumbnails.high.url,
                },
            });
        }

        return res.json({
            success: true,
            data: {
                isLive: false,
            },
        });
    } catch (err) {
        console.error("LIVE API ERROR:", err.message);
        res.status(500).json({ success: false, message: "Live check failed" });
    }
};

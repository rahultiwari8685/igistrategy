import axios from "axios";

export const checkLiveStatus = async () => {
    const url = `https://www.googleapis.com/youtube/v3/search`;

    const res = await axios.get(url, {
        params: {
            part: "snippet",
            channelId: process.env.YOUTUBE_CHANNEL_ID,
            eventType: "live",
            type: "video",
            key: process.env.YOUTUBE_API_KEY
        }
    });

    if (res.data.items.length > 0) {
        const liveVideo = res.data.items[0];
        return {
            isLive: true,
            videoId: liveVideo.id.videoId,
            title: liveVideo.snippet.title
        };
    }

    return { isLive: false };
};

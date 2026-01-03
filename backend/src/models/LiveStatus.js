import mongoose from "mongoose";

const liveStatusSchema = new mongoose.Schema({
    isLive: Boolean,
    videoId: String,
    updatedAt: Date
});

export default mongoose.model("LiveStatus", liveStatusSchema);

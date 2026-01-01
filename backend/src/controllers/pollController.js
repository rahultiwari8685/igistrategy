import Poll from "../models/Poll.js";

/* CREATE POLL */
export const createPoll = async (req, res) => {
    try {
        const poll = await Poll.create(req.body);
        res.json({ success: true, data: poll });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

/* LIST ALL POLLS (ADMIN) */
export const getAllPolls = async (req, res) => {
    const polls = await Poll.find().sort({ createdAt: -1 });
    res.json({ success: true, data: polls });
};

/* UPDATE POLL */
export const updatePoll = async (req, res) => {
    const poll = await Poll.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: poll });
};

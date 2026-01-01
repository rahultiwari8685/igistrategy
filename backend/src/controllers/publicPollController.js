import Poll from "../models/Poll.js";
import PollVote from "../models/PollVote.js";

/* GET ACTIVE POLL */
export const getActivePoll = async (req, res) => {
    const now = new Date();

    const poll = await Poll.findOne({
        start_date: { $lte: now },
        end_date: { $gte: now }
    });

    if (!poll) {
        return res.json({ success: true, data: null });
    }

    res.json({ success: true, data: poll });
};

/* VOTE */
export const votePoll = async (req, res) => {
    try {
        const { option_index } = req.body;
        const customerId = req.user.customerId;

        const poll = await Poll.findById(req.params.id);

        // Save vote (one per user)
        await PollVote.create({
            poll_id: poll._id,
            customer_id: customerId,
            option_index
        });

        poll.options[option_index].votes += 1;
        await poll.save();

        res.json({ success: true, message: "Vote submitted" });

    } catch (err) {
        res.status(400).json({ success: false, message: "Already voted" });
    }
};

/* POLL RESULTS */
export const pollResults = async (req, res) => {
    const poll = await Poll.findById(req.params.id);
    res.json({ success: true, data: poll });
};

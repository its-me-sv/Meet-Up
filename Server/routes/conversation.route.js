const router = require("express").Router();
const Conversation = require("../models/Conversation.model");

// Create new conversation
router.post("/", async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.recieverId]
    });
    try {
        const savedConversation = await newConversation.save();
        return res.status(200).json(savedConversation);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// Get conversations of user
router.get("/:userId", async (req, res) => {
    try {
        const conversations = await Conversation.find({
            members: {$in: [req.params.userId]}
        });
        return res.status(200).json(conversations);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Get conversation between two users
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
        const { firstUserId, secondUserId } = req.params;
        const conversations = await Conversation.findOne({
            members: { $all: [firstUserId, secondUserId] }
        });
        if (!conversations) {
            const newConversation = new Conversation({
                members: [firstUserId, secondUserId]
            });
            try {
                const savedConversation = await newConversation.save();
                return res.status(200).json(savedConversation);
            } catch (err) {
                return res.status(500).json(err.message);
            }
        }
        return res.status(200).json(conversations);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

module.exports = router;
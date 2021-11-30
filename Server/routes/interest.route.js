const router = require("express").Router();
const Interest = require("../models/Interest.model");
const User = require("../models/User.model");

// Create interest
router.post("/create", async (req, res) => {
    try {
        const newInterest = new Interest({
            name: req.body.interestName
        });
        const interest = await newInterest.save();
        return res.status(200).json(interest);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// Add interest
router.put("/:interestId/add", async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        const interest = await Interest.findById(req.params.interestId);
        if (user.interests.includes(req.params.interestId))
            return res.status(400).json("Already in your interest");
        if (interest.people.includes(req.body.userId))
            return res.status(400).json("Already in your interest");
        await user.updateOne({ $push: { interests: req.params.interestId }});
        await interest.updateOne({ $push: { people: req.body.userId }});
        return res.status(200).json("New interest added");
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// Remove interest
router.put("/:interestId/remove", async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        const interest = await Interest.findById(req.params.interestId);
        if (!user.interests.includes(req.params.interestId))
            return res.status(400).json("Not in your interest");
        if (!interest.people.includes(req.body.userId))
            return res.status(400).json("Not in your interest");
        await user.updateOne({ $pull: { interests: req.params.interestId } });
        await interest.updateOne({ $pull: { people: req.body.userId } });
        return res.status(200).json("Removed from interests");
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// Get interests of user
router.get("/:userId", async (req, res) => {
    try {
        const interests = await Interest.find({
            people: { $in: [req.params.userId] }
        }, 'name _id');
        return res.status(200).json(interests);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Get keyword specific
router.get("/find/:keyword", async (req, res) => {
    try {
        const { keyword } = req.params;
        const re = new RegExp(keyword, 'i');
        const allUsers = await Interest.find({ name: { $regex: re }}, '_id name');
        return res.status(200).json(allUsers);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

module.exports = router;
const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");

// Update User
router.put("/:id", async (req, res) => {
    if (req.body.userId !== req.params.id)
        return res.status(400).json("Invalid id");
    if (req.body.password) {
        try {
            const salt = await bcrypt.genSalt(+process.env.SALT);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
    try {
        await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
        return res.status(200).json("Account has been updated");
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// Delete User
router.delete("/:id", async (req, res) => {
    if (req.body.userId !== req.params.id)
        return res.status(400).json("Invalid id");
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json("Account has been deleted");
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// Get User
router.get("/", async (req, res) => {
    const { userId, username } = req.query;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username });
        const { password, updatedAt, ...other } = user._doc;
        return res.status(200).json(other);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// Add friend
router.put("/:id/add-friend", async (req, res) => {
    if (req.body.userId === req.params.id)
        return res.status(400).json("Invalid id");
    try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.friends.includes(req.body.userId))
            return res.status(400).json("Already friends");
        if (currentUser.friends.includes(req.params.id))
            return res.status(400).json("Already friends");
        await user.updateOne({ $push: { friends: req.body.userId }});
        await currentUser.updateOne({ $push: { friends: req.params.id }});
        return res.status(200).json("You are now friends");
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// Remove friend
router.put("/:id/remove-friend", async (req, res) => {
    if (req.body.userId === req.params.id)
        return res.status(400).json("Invalid id");
    try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user.friends.includes(req.body.userId))
            return res.status(400).json("You weren't friends");
        if (!currentUser.friends.includes(req.params.id))
            return res.status(400).json("You weren't friends");
        await user.updateOne({ $pull: { friends: req.body.userId }});
        await currentUser.updateOne({ $pull: { friends: req.params.id }});
        return res.status(200).json("You are now not friends");
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// Get friends
router.get("/friends/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.friends.map(friendId => User.findById(friendId))
        );
        let friendsList = [];
        friends.forEach(friend => {
            const { _id, username, profilePicture, email } = friend;
            friendsList.push({ _id, username, profilePicture, email });
        });
        return res.status(200).json(friendsList);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// Get keyword specific
router.get("/find/:keyword", async (req, res) => {
    try {
        const { keyword } = req.params;
        const re = new RegExp(keyword, 'i');
        const allUsers = await User.find({$or: [
            { username: {$regex: re}}, 
            { email: {$regex: re}}
        ]});
        return res.status(200).json(allUsers);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

module.exports = router;
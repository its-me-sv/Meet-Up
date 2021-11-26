const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");

function sleep(n) { return new Promise(resolve => setTimeout(resolve, n)); }

// Register user
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(+process.env.SALT);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        const {pass, ...user} = await newUser.save();
        return res.status(200).json(user._doc);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// User login
router.post("/login", async (req, res) => {
    try {
        const { password, ...identifier } = req.body;
        let user = await User.findOne(identifier);
        if (!user) return res.status(400).json("User not found");
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json("Wrong password");
        const {pass, ...currUser} = user;
        return res.status(200).json(currUser._doc);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

module.exports = router;
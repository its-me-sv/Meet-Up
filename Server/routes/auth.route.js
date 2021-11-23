const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");

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
        const user = await newUser.save();
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// User login
router.post("/login", async (req, res) => {
    try {
        const { password, ...identifier } = req.body;
        const user = await User.findOne(identifier);
        if (!user) return res.status(400).json("User not found");
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json("Wrong password");
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

module.exports = router;
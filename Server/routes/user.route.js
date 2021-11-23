const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");

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

module.exports = router;
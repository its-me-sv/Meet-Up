const mongoose = require("mongoose");

const InterestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    people: {
        type: Array,
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model("Interest", InterestSchema);
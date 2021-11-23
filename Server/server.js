const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const conversationRoute = require("./routes/conversation.route");
const messageRoute = require("./routes/message.route");

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/conversation", conversationRoute);
app.use("/message", messageRoute);

const PORT = process.env.port || 5000;
app.listen(PORT, async () => {
    console.clear();
    console.log(`[SERVER] Listening to PORT ${PORT}`);
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "meet-up"
        });
        console.log("[SERVER] Database connection SUCCESS");
    } catch (err) {
        console.log(`[SERVER] Database connection FAILURE - ${err.message}`);
    }
});
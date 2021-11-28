const express = require("express");
const cors = require("cors");
const multer = require("multer");
const multerConfig = require("./configs/multer.config");
const path = require("path");
const morgan = require("morgan");
const morganConfig = require("./configs/morgan.config");

const app = express();

app.use(cors());
app.use(morgan(morganConfig));
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multerConfig(multer);
const upload = multer({ storage });
app.post("/upload", upload.single("file"), (req, res) => {
    try {
        const {fileDest} = req;
        return res.status(200).json({fileDest});
    } catch (err) {
        console.log(err);
        return res.status(500).json(err.message);
    }
});

app.get("/", (req, res) => {
    return res.status(200).json("File Server - Base route");
});

const PORT = process.env.port || 5001;
app.listen(PORT, () => {
    console.clear();
    console.log(`[FILE SERVER] Listening to PORT ${PORT}`);
});
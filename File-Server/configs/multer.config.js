const multerConfig = multerInstance => {
    return multerInstance.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "public/images");
        },
        filename: (req, file, cb) => {
            let fileType = file.originalname.split('.').slice(-1)[0];
            let filename = `${req.body.userId}.${fileType}`;
            req.fileDest = `/images/${filename}`;
            cb(null, filename);
        }
    });
};

module.exports = multerConfig;
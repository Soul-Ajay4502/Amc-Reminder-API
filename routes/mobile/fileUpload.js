const fs = require("fs");
const path = require("path");
const express = require("express");
const multer = require("multer");
const app = express();

const send500Error = require("../../common/send500Error");
const db = require("../../config/dbConnection");
const { checkAuth } = require("../../middlewares");
const os = require("os");

const getLocalIp = () => {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
        for (const interfaceDetails of networkInterfaces[interfaceName]) {
            // Filter for IPv4 and non-internal addresses
            if (
                interfaceDetails.family === "IPv4" &&
                !interfaceDetails.internal
            ) {
                return interfaceDetails.address;
            }
        }
    }
    return "localhost"; // fallback to localhost if no IP found
};

const getImgUrl = ({ fileName = "", req = {} }) => {
    const ipWithPort = `${getLocalIp()}:${process.env.PORT || 7075}`;
    const imageUrl = `${req.protocol}://${ipWithPort}/profile/${fileName}`;

    // Modify the rows to include the dpUrl
    return imageUrl;
};

// Set storage engine for multer
const storage = multer.diskStorage({
    destination: path.join("public", "profile"), // Use absolute path for 'uploads' folder
    filename: (req, file, cb) => {
        // Generate unique file name with extension
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit (optional)
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
}).single("image"); // 'image' is the key for form data

// Check file type (image only)
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Error: Images Only!");
    }
}

// Route to handle image upload
app.post("/upload", checkAuth, async (req, res) => {
    const { user_id } = req.user;

    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        try {
            // Fetch the current image filename for the user
            const queryGetImage = `SELECT * FROM user_details WHERE user_id = ?`;
            const [result] = await db.query(queryGetImage, [user_id]);
            const user = result[0] || {};
            const existingFilename = result[0]?.dp_image;
            if (existingFilename) {
                // Remove the existing image from the file system
                const existingImagePath = path.join(
                    "public",
                    "profile",
                    existingFilename
                );
                fs.unlink(existingImagePath, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error(
                            "Error deleting existing image:",
                            unlinkErr
                        );
                    }
                });
            }

            // Update the user record with the new image filename
            const queryUpdateImage = `UPDATE user_details SET dp_image = ? WHERE user_id = ?`;
            await db.query(queryUpdateImage, [req.file.filename, user_id]);

            // Send success response
            res.status(200).json({
                // message: 'Image uploaded successfully',
                // filePath: `/profile/${req.file.filename}`
                statusCode: 200,
                isError: false,
                responseData: [
                    {
                        ...user,
                        dp_url: getImgUrl({
                            fileName: req.file.filename,
                            req: req,
                        }),
                    },
                ],
                statusText: "Image uploaded successfully",
            });
        } catch (err) {
            console.log(err);
            return send500Error(res, err);
        }
    });
});

app.get("/userProfile", checkAuth, async (req, res) => {
    try {
        const query = `SELECT * FROM view_user_details WHERE user_id = ?`;
        const [result] = await db.query(query, [req.user.user_id]);

        if (!result || result.length === 0 || !result[0].dp_image) {
            return res.status(404).json({ error: "Profile image not found" });
        }

        const filename = result[0].dp_image;
        const imageUrl = `${req.protocol}://${req.get(
            "host"
        )}/profile/${filename}`;
        result.forEach((item) => {
            item.imageUrl = imageUrl;
        });
        // Return the image URL that can be accessed via the browser
        return res.status(200).json({
            statusCode: 200,
            isError: false,
            responseData: result,
            statusText: "Profile retrieved successfully",
        });
    } catch (error) {
        console.error("Error fetching profile image:", error);
        return send500Error(res, error);
    }
});

module.exports = app;

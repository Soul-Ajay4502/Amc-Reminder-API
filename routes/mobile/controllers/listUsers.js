const send500Error = require("../../../common/send500Error");
const db = require("../../../config/dbConnection");
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

const listUsers = async (req, res, next) => {
    try {
        const [rows] = await db.query("SELECT * FROM view_user_details");
        const response =
            rows.length > 0
                ? rows.map((element) => ({
                      ...element,
                      dp_url:
                          element.dp_image &&
                          getImgUrl({
                              fileName: element.dp_image,
                              req: req,
                          }), // Add the image URL to each user
                  }))
                : [];

        res.status(200).json({
            statusCode: 200,
            isError: false,
            responseData: response,
            statusText: "Users retrieved successfully",
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return send500Error(res, error);
    }
};

// const getUserWithId = async (req, res, next) => {
//     const userId = req.query.id || req.user.user_id;
//     try {
//         const [rows] = await db.query(
//             "SELECT * FROM view_user_details WHERE user_id = ?",
//             [userId]
//         );

//         res.status(200).json({
//             statusCode: 200,
//             isError: false,
//             responseData: rows,
//             statusText: "Users retrieved successfully",
//         });
//     } catch (error) {
//         console.error("Error fetching users:", error);
//         return send500Error(res, error);
//     }
// };

const getUserWithId = async (req, res, next) => {
    const userId = req.query.id || req.user.user_id;
    try {
        const [rows] = await db.query(
            "SELECT * FROM user_details_with_login WHERE user_id = ?",
            [userId]
        );

        // Check if rows exist
        if (rows.length === 0) {
            return res.status(400).json({
                statusCode: 400,
                isError: true,
                statusText: "User not found",
            });
        }

        // Assuming dp_image contains the filename
        const filename = rows[0].dp_image;
        const ipWithPort = `${getLocalIp()}:${process.env.PORT || 7075}`;
        const imageUrl = `${req.protocol}://${ipWithPort}/profile/${filename}`;

        // Modify the rows to include the dpUrl
        rows.forEach((element) => {
            element.dp_url = imageUrl;
            element.email = element.username; // Add the image URL to each user
        });

        // Send the modified response
        res.status(200).json({
            statusCode: 200,
            isError: false,
            responseData: rows, // Return the modified rows with dpUrl
            statusText: "Users retrieved successfully",
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return send500Error(res, error);
    }
};

module.exports = { listUsers, getUserWithId };

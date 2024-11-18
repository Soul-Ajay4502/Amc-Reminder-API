const send500Error = require("../../../common/send500Error");
const db = require("../../../config/dbConnection");

const createAssignment = async (req, res) => {
    const { userId, allowNotification } = req.body;
    // Validate required fields
    if (!userId) {
        return res.status(400).json({
            statusCode: 400,
            isError: true,
            statusText: "userId required",
        });
    }
    const ACCESS = {
        0: "Removed",
        1: "Granted",
    };
    // SQL query to insert the assignment
    const query = `
        UPDATE user_details (user_id, allow_notification)
        VALUES (?, ?)
    `;
    try {
        const [result] = await db.query(query, [userId, allowNotification]);
        res.status(201).json({
            statusCode: 201,
            isError: false,
            responseData: {
                item_id: result.insertId,
            },
            statusText: `Notification access ${
                ACCESS[Number(allowNotification)]
            } successfully`,
        });
    } catch (error) {
        console.error("Error creating item:", error);
        return send500Error(res, error);
    }
};
module.exports = createAssignment;

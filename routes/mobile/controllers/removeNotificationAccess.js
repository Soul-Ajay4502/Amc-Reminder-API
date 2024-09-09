const send500Error = require('../../../common/send500Error');
const db = require('../../../config/dbConnection');

const removeAssignment = async (req, res) => {
    const { userId:user_id } = req.params;
    const assigned_by=req.user.user_id;

    // Validate if assignment_id is provided
    if (!user_id) {
        return res.status(400).json({ error: "user_id is required" });
    }
    // SQL query to delete the assignment
    const query = `
            DELETE FROM user_notification_assignment
            WHERE user_id = ? AND assigned_by = ?
        `;

    try {
        const [result] = await db.query(query, [user_id, assigned_by]);
        res.status(201).json({
            statusCode: 201,
            isError: false,
            responseData: result,
            statusText: 'Assignment removed successfully',
        });
    } catch (error) {
        console.error('Error removing item:', error);
        return send500Error(res, error);
    }
};

module.exports = removeAssignment;

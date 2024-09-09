const send500Error = require('../../../common/send500Error');
const db = require('../../../config/dbConnection');

const createAssignment =async (req, res) => {
    const { user_id } = req.body;
    const assigned_by=req.user.user_id;    
    // Validate required fields
    if (!user_id ) {
        return res.status(400).json({ error: "user_id is required" });
    }

    // SQL query to insert the assignment
    const query = `
        INSERT INTO user_notification_assignment (user_id, assigned_by)
        VALUES (?, ?)
    `;
    try {
        const [result] = await db.query(query, [user_id, assigned_by]);
        res.status(201).json({
            statusCode: 201,
            isError: false,
            responseData: {
                item_id: result.insertId,
            },
            statusText: 'Item created successfully',
        });
    } catch (error) {
        console.error('Error creating item:', error);
        return send500Error(res, error);
    }
};
module.exports=createAssignment
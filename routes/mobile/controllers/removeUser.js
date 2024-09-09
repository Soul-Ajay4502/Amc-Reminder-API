const send500Error = require('../../../common/send500Error')


const removeUser = async (req, res, next) => {
    const userId = parseInt(req.params.userId, 10);
    const { conn } = req;

    if (isNaN(userId)) {
        return res.status(400).json({
            statusCode: 400,
            isError: true,
            responseData: null,
            statusText: 'Invalid user ID',
        });
    }

   
    try {
        // Start a transaction
        await conn.beginTransaction();

        // Delete user from user_token_assignment
        await conn.query('DELETE FROM user_token_assignment WHERE user_id = ?', [userId]);

        // Delete user from user_notification_assignment
        await conn.query('DELETE FROM user_notification_assignment WHERE user_id = ?', [userId]);

        // Delete user from notifications
        await conn.query('DELETE FROM notifications WHERE notified_user_id = ?', [userId]);

        // Delete user from item_details if needed
        await conn.query('DELETE FROM item_details WHERE created_by = ?', [userId]);

        // Delete user from user_login
        await conn.query('DELETE FROM user_login WHERE user_id = ?', [userId]);

        // Delete user from user_details
        await conn.query('DELETE FROM user_details WHERE user_id = ?', [userId]);

        // Commit the transaction
        await conn.commit();

        res.status(200).json({
            statusCode: 200,
            isError: false,
            responseData: null,
            statusText: 'User deleted successfully',
        });
    } catch (error) {
        // Rollback the transaction in case of an error
        await conn.rollback();
        console.error('Error deleting user:', error);
        return send500Error(res, error);

    } finally {
        // Release the conn
        if(conn)
        conn.release();
    }
}

module.exports = removeUser;
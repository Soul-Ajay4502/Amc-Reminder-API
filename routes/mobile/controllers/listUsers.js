const send500Error = require('../../../common/send500Error')
const db = require('../../../config/dbConnection'); 


const listUsers = async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM view_user_details');
        res.status(200).json({
            statusCode: 200,
            isError: false,
            responseData: rows,
            statusText: 'Users retrieved successfully',
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return send500Error(res, error);

    }
}

module.exports = listUsers;
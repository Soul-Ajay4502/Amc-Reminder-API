const send500Error = require('../../../common/send500Error');
const db = require('../../../config/dbConnection');


const listItems = async (req, res, next) => {
    try {
        
        const [rows] = await db.query('SELECT * FROM view_item_details');
        res.status(200).json({
            statusCode: 200,
            isError: false,
            responseData: rows,
            statusText: 'Items retrieved successfully',
        });
    } catch (error) {
        console.error('Error fetching items:', error);
        return send500Error(res, error);
    }
};

module.exports = listItems;

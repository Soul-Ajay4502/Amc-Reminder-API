const send500Error = require('../../../common/send500Error');
const db = require('../../../config/dbConnection');

const getItemById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const [rows] = await db.query('SELECT * FROM view_item_details WHERE item_id = ?', [id]);
        if (rows.length > 0) {
            res.status(200).json({
                statusCode: 200,
                isError: false,
                responseData: rows[0],
                statusText: 'Item retrieved successfully',
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                isError: true,
                responseData: null,
                statusText: 'Item not found',
            });
        }
    } catch (error) {
        console.error('Error fetching item:', error);
        return send500Error(res, error);
    }
};

module.exports = getItemById;
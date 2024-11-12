const send500Error = require('../../../common/send500Error');
const db = require('../../../config/dbConnection');

const removeItem = async (req, res, next) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM item_details WHERE item_id = ?', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                statusCode: 200,
                isError: false,
                responseData: null,
                statusText: 'Item deleted successfully',
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
        console.error('Error deleting item:', error);
        return send500Error(res, error);
    }
};

module.exports = removeItem;
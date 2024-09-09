const send500Error = require('../../../common/send500Error');
const db = require('../../../config/dbConnection');

const updateItem = async (req, res, next) => {
    const { id } = req.params;
    const { item_name, purchase_date, expiry_date, item_location, total_number_of_item } = req.body;

    const query = `
        UPDATE item_details 
        SET item_name = ?, purchase_date = ?, expiry_date = ?, item_location = ?, total_number_of_item = ? 
        WHERE item_id = ?
    `;
    const values = [item_name, purchase_date, expiry_date, item_location, total_number_of_item, id];

    try {
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            res.status(200).json({
                statusCode: 200,
                isError: false,
                responseData: null,
                statusText: 'Item updated successfully',
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
        console.error('Error updating item:', error);
        return send500Error(res, error);
    }
};

module.exports = updateItem;
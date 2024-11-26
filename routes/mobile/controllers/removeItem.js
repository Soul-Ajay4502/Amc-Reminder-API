const send500Error = require("../../../common/send500Error");
const db = require("../../../config/dbConnection");

const removeItem = async (req, res, next) => {
    const { id, status } = req.body;

    if (!id) {
        return res.status(400).json({
            statusCode: 400,
            isError: true,
            statusText: "Id field required",
        });
    }
    const itemStatus = status ? status : 1;

    try {
        const [result] = await db.query(
            `UPDATE item_details SET item_status = ${itemStatus} WHERE item_id = ?`,
            [id]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({
                statusCode: 200,
                isError: false,
                responseData: null,
                statusText: "Item Archived successfully",
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                isError: true,
                responseData: null,
                statusText: "Item not found",
            });
        }
    } catch (error) {
        console.error("Error deleting item:", error);
        return send500Error(res, error);
    }
};

const deleteItem = async (req, res, next) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({
            statusCode: 400,
            isError: true,
            statusText: "Id field required",
        });
    }

    try {
        const [result] = await db.query(
            `DELETE FROM item_details WHERE item_id = ?`,
            [id]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({
                statusCode: 200,
                isError: false,
                responseData: null,
                statusText: "Item Deleted successfully",
            });
        } else {
            res.status(403).json({
                statusCode: 403,
                isError: true,
                responseData: null,
                statusText: "Item not found",
            });
        }
    } catch (error) {
        console.error("Error deleting item:", error);
        return send500Error(res, error);
    }
};
module.exports = { removeItem, deleteItem };

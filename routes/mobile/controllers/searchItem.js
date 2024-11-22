const paginate = require("../../../common/paginator");
const send500Error = require("../../../common/send500Error");

const searchItemByName = async (req, res, next) => {
    const { ItemName } = req.query; // Get item name from query params
    const page = parseInt(req.query.page) || 1; // Default page is 1 if not provided
    const limit = parseInt(req.query.limit) || 10;

    if (!ItemName) {
        return res.status(400).json({
            statusCode: 400,
            isError: true,
            statusText: "Item name is required",
        });
    }

    try {
        const query =
            "SELECT * FROM item_details WHERE item_name LIKE ? AND item_status = 0";
        const params = [`%${ItemName}%`];
        const results = await paginate(
            query,
            params,
            parseInt(page),
            parseInt(limit)
        );

        res.status(200).json({
            statusCode: 200,
            isError: false,
            responseData: results.data,
            pagination: results.pagination,
            statusText: "Items found",
        });
    } catch (error) {
        console.error("Error searching for item:", error);
        return send500Error(res, error);
    }
};

module.exports = searchItemByName;

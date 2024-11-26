const paginate = require("../../../common/paginator");
const send500Error = require("../../../common/send500Error");

const listItems = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default page is 1 if not provided
        const limit = parseInt(req.query.limit) || 10;
        const params = [];
        const query = "SELECT * FROM item_details WHERE item_status = 0";
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
            statusText: "Items retrieved successfully",
        });
    } catch (error) {
        console.error("Error fetching items:", error);
        return send500Error(res, error);
    }
};

const listDeletedItems = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default page is 1 if not provided
        const limit = parseInt(req.query.limit) || 10;
        const params = [];
        const query = "SELECT * FROM item_details WHERE item_status = 1"; //deleted indicated by 1
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
            statusText: "Items retrieved successfully",
        });
    } catch (error) {
        console.error("Error fetching items:", error);
        return send500Error(res, error);
    }
};

module.exports = { listItems, listDeletedItems };

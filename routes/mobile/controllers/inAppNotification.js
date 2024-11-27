const paginate = require("../../../common/paginator");
const send500Error = require("../../../common/send500Error");
const dbConnection = require("../../../config/dbConnection");

const notificationUnreadList = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default page is 1 if not provided
        const limit = parseInt(req.query.limit) || 10;
        const params = [];
        const query =
            "SELECT * FROM item_details WHERE email_send_on IS NOT NULL AND notification_is_read = 0";
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

const notificationReadList = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default page is 1 if not provided
        const limit = parseInt(req.query.limit) || 10;
        const params = [];
        const query =
            "SELECT * FROM item_details WHERE email_send_on IS NOT NULL AND notification_is_read != 0";
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

const notificationRead = async (req, res, next) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({
            statusCode: 400,
            isError: true,
            statusText: "Id field required",
        });
    }

    try {
        const [result] = await dbConnection.query(
            `UPDATE item_details SET notification_is_read = 1 WHERE item_id = ?`,
            [id]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({
                statusCode: 200,
                isError: false,
                responseData: null,
                statusText: "Read success",
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
        console.error("Error set Reading notification:", error);
        return send500Error(res, error);
    }
};

const notificationList = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default page is 1 if not provided
        const limit = parseInt(req.query.limit) || 10;
        const params = [];
        const query =
            "SELECT * FROM item_details WHERE email_send_on IS NOT NULL";
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
module.exports = {
    notificationRead,
    notificationUnreadList,
    notificationReadList,
    notificationList,
};

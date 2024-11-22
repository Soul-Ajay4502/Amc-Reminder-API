const send500Error = require("../../../common/send500Error");
const db = require("../../../config/dbConnection");
const createItem = async (req, res, next) => {
    const {
        manufacturer,
        item_type,
        item_name,
        purchase_date,
        expiry_date,
        item_location,
        total_number_of_item,
    } = req.body;

    if (
        !manufacturer ||
        !item_type ||
        !item_name ||
        !purchase_date ||
        !expiry_date ||
        !item_location ||
        !total_number_of_item
    ) {
        return res.status(400).json({
            statusCode: 400,
            isError: true,
            statusText:
                total_number_of_item == 0
                    ? "Invalid total number "
                    : "All fields are required",
        });
    }

    const query = `
        INSERT IGNORE INTO item_details (manufacturer,item_name,item_type, purchase_date, expiry_date, item_location, total_number_of_item, created_by) 
        VALUES (?, ?, ?, ?, ?, ? ,?,?)
    `;
    const values = [
        manufacturer,
        item_name,
        item_type,
        purchase_date,
        expiry_date,
        item_location,
        total_number_of_item,
        req.user.user_id,
    ];

    try {
        const [result] = await db.query(query, values);
        res.status(201).json({
            statusCode: 201,
            isError: false,
            responseData: [
                {
                    item_id: result.insertId,
                },
            ],
            statusText: "Item created successfully",
        });
    } catch (error) {
        console.error("Error creating item:", error);
        return send500Error(res, error);
    }
};

module.exports = createItem;

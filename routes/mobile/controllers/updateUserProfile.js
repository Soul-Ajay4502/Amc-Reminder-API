const send500Error = require("../../../common/send500Error");
const bcrypt = require("bcryptjs");

const updateUserProfile = async (req, res, next) => {
    const { display_name, username, password } = req.body;
    const { conn } = req;

    if (!display_name || !username || !password) {
        return res.status(400).json({
            statusCode: 400,
            isError: true,
            statusText: "All fields are required",
        });
    }

    try {
        const [result] = await conn.query(
            "INSERT INTO user_details (display_name) VALUES (?)",
            [display_name]
        );
        const user_id = result.insertId;

        await conn.commit();

        return res.status(201).json({
            statusCode: 201,
            isError: false,
            statusText: "User created successfully",
            responseData: {
                user_id,
                username,
                display_name,
            },
        });
    } catch (error) {
        // Rollback transaction in case of error
        conn.rollback();
        console.error(error);
        return res.status(500).json({
            statusCode: 500,
            isError: true,
            statusText: "Internal server error",
        });
    } finally {
        if (conn) await conn.release();
    }
};

module.exports = updateUserProfile;

const send500Error = require('../../../common/send500Error')
const bcrypt = require('bcryptjs');

const createUser = async (req, res, next) => {
    const { display_name, username, password } = req.body;
    const { conn } = req;

    if (!display_name || !username || !password) {
        return res.status(400).json({
            statusCode: 400,
            isError: true,
            statusText: 'All fields are required',
        });
    }

    try {
        // Check if username already exists
        const [existingUser] = await conn.query('SELECT * FROM user_details WHERE user_id IN (SELECT user_id FROM user_login WHERE username = ?)', [username]);
        if (existingUser.length > 0) {
            return res.status(400).json({
                statusCode: 400,
                isError: true,
                statusText: 'Username already exists',
            });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 12);

        // Start a transaction
        await conn.beginTransaction();

        // Insert user details
        const [result] = await conn.query('INSERT INTO user_details (display_name) VALUES (?)', [display_name]);
        const user_id = result.insertId;

        // Insert user login details
        await conn.query('INSERT INTO user_login (user_id, username, user_password) VALUES (?, ?, ?)', [user_id, username, hashedPassword]);

        // Commit transaction
        await conn.commit();

        return res.status(201).json({
            statusCode: 201,
            isError: false,
            statusText: 'User created successfully',
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
            statusText: 'Internal server error',
        });
    }
    finally {
        if (conn) await conn.release();
    }
}

module.exports = createUser;
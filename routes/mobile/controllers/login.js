const send500Error = require('../../../common/send500Error')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { sendOtp } = require('../sendotp');


const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.JWT_KEY, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_JWT_KEY, { expiresIn: '7d' });
};

const refreshTokens = [];

const login = async (req, res, next) => {
    const { username, password } = req.body;
    const { conn } = req;
    const query = "SELECT * FROM user_details_with_login WHERE username = ?";
    const records = [username];

    try {
        const [userRows] = await conn.query(query, records);

        if (userRows.length > 0) {
            // Check the password
            const USER = userRows[0];

            if (bcrypt.compareSync(password, USER.user_password)) {
                // Generate tokens
                const token = generateAccessToken(USER);
                const refreshToken = generateRefreshToken(USER);
                refreshTokens.push(refreshToken);

                // const phoneNumber = '+919846027693'; // Replace with the recipient's phone number
                // sendOtp(phoneNumber).then(() => {
                //     console.log('OTP sending process completed.');
                // }).catch((error) => {

                //     console.error('Error sending OTP:', error);
                //     throw error
                // });

                return res.status(200).json({
                    statusCode: 200,
                    isError: false,
                    token,
                    refreshToken,
                    statusText: "Login successful",
                    responseData: {
                        userId: USER.user_id,
                        email: USER.username,
                        displayName: USER.display_name,
                        role: USER.ROLES,
                        createdAt: USER.created_at,
                    }
                });
            } else {
                return res.status(400).json({
                    statusCode: 400,
                    isError: true,
                    responseData: null,
                    statusText: "Invalid Email OR Password"
                });
            }
        } else {
            return res.status(400).json({
                statusCode: 400,
                isError: true,
                responseData: null,
                statusText: "Invalid Email OR Password"
            });
        }
    } catch (error) {
        return send500Error(res, error);
    }
}

module.exports = login;
const send500Error = require("../../../common/send500Error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkAuth = require("../../../middlewares/checkAuth");
const { sendOtp } = require("../sendotp"); //using watsapp
const { sendMail, sendWhatsAppMessage } = require("../../sendEmail");

const os = require("os");
const generateOtp = require("../../../common/generateOtp");

const getLocalIp = () => {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
        for (const interfaceDetails of networkInterfaces[interfaceName]) {
            // Filter for IPv4 and non-internal addresses
            if (
                interfaceDetails.family === "IPv4" &&
                !interfaceDetails.internal
            ) {
                return interfaceDetails.address;
            }
        }
    }
    return "localhost"; // fallback to localhost if no IP found
};

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.JWT_KEY, { expiresIn: "15m" });
};

const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_JWT_KEY, { expiresIn: "7d" });
};

let refreshTokens = [];

const login = async (req, res, next) => {
    const { username, password } = req.body;
    // await sendMail()
    // await sendWhatsAppMessage();
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
                const filename = USER.dp_image;
                const ipWithPort = `${getLocalIp()}:${
                    process.env.PORT || 7075
                }`;
                const imageUrl = `${req.protocol}://${ipWithPort}/profile/${filename}`;

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
                        role: USER.role_name,
                        roleId: USER.role_id,
                        createdAt: USER.created_at,
                        dp_image: USER.dp_image,
                        dp: imageUrl,
                    },
                });
            } else {
                return res.status(400).json({
                    statusCode: 400,
                    isError: true,
                    responseData: null,
                    statusText: "Invalid Email OR Password",
                });
            }
        } else {
            return res.status(400).json({
                statusCode: 400,
                isError: true,
                responseData: null,
                statusText: "Invalid Email OR Password",
            });
        }
    } catch (error) {
        return send500Error(res, error);
    }
};

const refreshtokenFn = async (req, res, next) => {
    const { refreshToken } = req.body;
    console.log(req.body);

    try {
        if (!refreshToken) {
            res.status(403)
                .json({
                    statusCode: 403,
                    isError: false,
                    responseData: null,
                    statusText: "Unauthorized",
                })
                .end();
        } else if (
            !refreshTokens.filter((obj) => {
                return obj.REFRESH_TOKEN !== refreshToken;
            })
        ) {
            // return res.sendStatus(403);

            res.status(403)
                .json({
                    statusCode: 403,
                    isError: false,
                    responseData: null,
                    statusText: "Forbidden - Refresh Token Not Valid",
                })
                .end();
        } else {
            jwt.verify(
                refreshToken,
                process.env.REFRESH_JWT_KEY,
                async (err, user) => {
                    if (err) {
                        // return res.sendStatus(403);
                        res.status(403)
                            .json({
                                statusCode: 403,
                                isError: false,
                                responseData: null,
                                statusText: err,
                            })
                            .end();
                    } else {
                        try {
                            console.log("us", user);

                            const token = generateAccessToken(user);

                            res.status(200)
                                .json({
                                    statusCode: 200,
                                    isError: false,
                                    token: token,
                                    refreshToken: refreshToken,
                                    statusText: "Authenticated",
                                    responseData: { ...user },
                                })
                                .end();
                        } catch (error) {
                            return send500Error(res, error);
                        }
                    }
                }
            );
        }
    } catch (error) {
        console.log(error);
        send500Error(res, error);
    }
};

const logout = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        res.status(400)
            .json({
                statusCode: 400,
                isError: true,
                responseData: null,
                statusText: "refreshToken MISSING",
            })
            .end();
    } else {
        try {
            // refreshTokens = refreshTokens.filter(refreshToken => t !== refreshToken);
            refreshTokens = refreshTokens.filter((obj) => {
                return obj.REFRESH_TOKEN !== refreshToken;
            });

            res.status(200)
                .json({
                    statusCode: 200,
                    isError: false,
                    responseData: null,
                    statusText: "LOGOUT SUCCESS",
                })
                .end();
        } catch (error) {
            console.log(error);
            res.status(500)
                .json({
                    statusCode: 500,
                    isError: true,
                    responseData: null,
                    statusText: error,
                })
                .end();
        }
    }
};

const changePassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    // await sendMail()
    // await sendWhatsAppMessage();
    const { conn, user } = req;

    try {
        const query =
            "SELECT * FROM user_details_with_login WHERE username = ?";
        const records = [user.username];
        const [userRows] = await conn.query(query, records);

        if (userRows.length > 0) {
            // Check the password
            const USER = userRows[0];

            if (bcrypt.compareSync(oldPassword, USER.user_password)) {
                const hashedPassword = bcrypt.hashSync(newPassword, 12);
                const updateQuery = `UPDATE user_login SET user_password = ? WHERE user_id= ?`;
                const updateData = [hashedPassword, user.user_id];
                const [updateResult] = await conn.query(
                    updateQuery,
                    updateData
                );

                return res.status(200).json({
                    statusCode: 200,
                    isError: false,
                    statusText: "Password Updated Successfully",
                    responseData: updateResult,
                });
            } else {
                return res.status(400).json({
                    statusCode: 400,
                    isError: true,
                    responseData: null,
                    statusText: "Invalid old Password",
                });
            }
        } else {
            return res.status(400).json({
                statusCode: 400,
                isError: true,
                responseData: null,
                statusText: "user not found",
            });
        }
    } catch (error) {
        return send500Error(res, error);
    }
};

const forgotPassword = async (req, res, next) => {
    const { username } = req.body;
    const { conn } = req;
    const query = "SELECT * FROM user_login WHERE username = ?";
    const records = [username];

    try {
        const [userRows] = await conn.query(query, records);
        const USER = userRows[0];
        if (userRows.length > 0) {
            const { user_id, username } = USER;
            const { otp, expiresAt } = generateOtp();
            const updateQuery = `UPDATE user_login SET forgot_otp = ? , expires_at = ? WHERE user_id= ?`;
            const updateData = [otp, expiresAt, user_id];
            const [updateResult] = await conn.query(updateQuery, updateData);
            const htmlTemplate = getChangePasswordOTPEmailHtml(otp);
            await sendMail({
                to: username, // recipient's email
                subject: "AMC-UCC OTP FOR FORGOT PASSWORD",
                text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`,
                html: htmlTemplate,
            });

            return res.status(200).json({
                statusCode: 200,
                isError: false,
                responseData: updateResult,
                statusText: "Otp send to the email address",
            });
        } else {
            return res.status(400).json({
                statusCode: 400,
                isError: true,
                responseData: null,
                statusText: "invalid username : user not found",
            });
        }
    } catch (error) {
        return send500Error(res, error);
    }
};

const resetPassword = async (req, res, next) => {
    const { username, otp, newPassword } = req.body;
    const { conn } = req;
    const query = "SELECT * FROM user_login WHERE username = ?";
    const records = [username];

    try {
        const [userRows] = await conn.query(query, records);
        const USER = userRows[0];
        if (userRows.length > 0) {
            const { user_id, username, forgot_otp, expires_at } = USER;

            if (otp != forgot_otp) {
                return res.status(400).json({
                    statusCode: 400,
                    isError: true,
                    responseData: null,
                    statusText: "Invalid OTP",
                });
            }

            if (Date.now() > Number(expires_at)) {
                return res.status(400).json({
                    statusCode: 400,
                    isError: true,
                    responseData: null,
                    statusText: "OTP has expired",
                });
            }

            const hashedPassword = bcrypt.hashSync(newPassword, 12);
            const updateQuery = `UPDATE user_login SET user_password = ? , forgot_otp = NULL  WHERE user_id= ?`;
            const updateData = [hashedPassword, user_id];
            const [updateResult] = await conn.query(updateQuery, updateData);

            return res.status(200).json({
                statusCode: 200,
                isError: false,
                statusText: `Password Updated Successfully for ${username}`,
                responseData: updateResult,
            });
        } else {
            return res.status(400).json({
                statusCode: 400,
                isError: true,
                responseData: null,
                statusText: "invalid username : user not found",
            });
        }
    } catch (error) {
        return send500Error(res, error);
    }
};

module.exports = {
    login,
    refreshtokenFn,
    logout,
    changePassword,
    forgotPassword,
    resetPassword,
};

function getChangePasswordOTPEmailHtml(otp) {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	
	<head>
	  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Verify your login</title>
	  <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
	</head>
	
	<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
	  <table role="presentation"
		style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
		<tbody>
		  <tr>
			<td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
			  <table role="presentation" style="background-color: rgb(255, 255, 255);max-width: 600px; border: 0px;border-radius:10px; border-spacing: 0px; text-align: left;">
				<tbody>
				  <tr>
					<td style="padding: 40px 0px 0px;">
					  <div style="text-align: center;">
					
					  <div style="padding: 20px; background-color: rgb(255, 255, 255);">
						<div style="color: rgb(0, 0, 0); text-align: center;">
						  <h1 style="margin: 1rem 0">Verification code</h1>
						  <p style="padding-bottom: 16px">Your OTP for resetting the password is:</p>
						  <p style="padding-bottom: 16px"><strong style="font-size: 130%"> ${otp} </strong></p>
						   <p style="padding-bottom: 16px">This OTP is valid for 10 minutes. Please use it promptly to reset your password.If you did not request a password reset, please ignore this email.</p>
						  <p style="padding-bottom: 16px; text-align:left">Thanks,<br>AMC-UCC</p>
						</div>
					  </div>
					  <div style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center;">
					  </div>
					</td>
				  </tr>
				</tbody>
			  </table>
			</td>
		  </tr>
		</tbody>
	
	</html>`;
}

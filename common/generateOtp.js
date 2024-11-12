const crypto = require("crypto");

const generateOtp = () => {
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes from now
    return { otp, expiresAt };
};

module.exports = generateOtp;

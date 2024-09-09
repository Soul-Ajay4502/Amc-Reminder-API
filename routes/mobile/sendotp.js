const wbm = require('wbm');

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
};

const sendOtp = async (phoneNumber) => {
    const otp = generateOTP();
    const message = `Your OTP is: ${otp}`;
    try {
        await wbm.start();
        await wbm.send([phoneNumber], message);
        console.log('OTP sent successfully');
        await wbm.end();
    } catch (err) {
        console.log(err);
        await wbm.end();
    }
};

module.exports = { sendOtp };

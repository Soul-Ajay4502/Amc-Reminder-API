const express = require("express");
const router = express.Router();
const {
    refreshtokenFn,
    logout,
    changePassword,
    login,
    forgotPassword,
    resetPassword,
    setFcmToken,
} = require("./controllers/controllerIndex");
const { checkAuth, getDbConnection } = require("../../middlewares");

router.post("/login", getDbConnection, login);
router.post("/refresh-token", refreshtokenFn);
router.post("/logout", logout);
router.post("/changePassword", checkAuth, getDbConnection, changePassword);
router.post("/forgotPassword", getDbConnection, forgotPassword); //for send otp mail
router.post("/resetPassword", getDbConnection, resetPassword); //for validate otp and update password
router.post("/setFcm", checkAuth, getDbConnection, setFcmToken); //for validate otp and update password

module.exports = router;

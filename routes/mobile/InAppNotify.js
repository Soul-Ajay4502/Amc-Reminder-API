const express = require("express");
const router = express.Router();
const { checkAuth } = require("../../middlewares");
const {
    notificationRead,
    notificationUnreadList,
    notificationReadList,
    notificationList,
} = require("./controllers/controllerIndex");

router.post("/notificationRead", checkAuth, notificationRead); //assign and remove in single update added use only this route
router.get("/notificationUnreadList", checkAuth, notificationUnreadList);
router.get("/notificationReadList", checkAuth, notificationReadList);
router.get("/notificationList", checkAuth, notificationList);

module.exports = router;

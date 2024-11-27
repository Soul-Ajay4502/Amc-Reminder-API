const express = require("express");
const routes = express();

const {
    userLogin,
    users,
    items,
    notification,
    imageUpload,
    auth,
    inAppNotify,
} = require("./mobile");

routes.use("/auth", auth);
routes.use("/login", userLogin);
routes.use("/user", users);
routes.use("/items", items);
routes.use("/notification", notification);
routes.use("/imageUpload", imageUpload);
routes.use("/inAppNotify", inAppNotify);

module.exports = routes;

const express = require("express");
const router = express.Router();
const db = require("../../config/dbConnection");
const { getDbConnection, checkAuth } = require("../../middlewares");
const {
    createItem,
    listItems,
    removeItem,
    getItemById,
    updateItem,
    searchItem,
} = require("./controllers/controllerIndex");

router.post("/add", checkAuth, getDbConnection, createItem);
router.get("/list", checkAuth, listItems);
router.post("/remove", checkAuth, removeItem);
router.get("/listby/:id", checkAuth, getItemById);
router.post("/update", checkAuth, updateItem);
router.post("/searchItem", checkAuth, searchItem);

module.exports = router;

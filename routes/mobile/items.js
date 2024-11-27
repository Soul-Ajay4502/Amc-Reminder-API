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
    listDeletedItems,
    deleteItem,
    listDueItems,
} = require("./controllers/controllerIndex");

router.post("/add", checkAuth, getDbConnection, createItem);
router.get("/list", checkAuth, listItems);
router.get("/listDeletedItems", checkAuth, listDeletedItems);
router.post("/remove", checkAuth, removeItem);
router.post("/delete", checkAuth, deleteItem);
router.get("/listby/:id", checkAuth, getItemById);
router.post("/update", checkAuth, updateItem);
router.post("/searchItem", checkAuth, searchItem);
router.get("/listDueItems", checkAuth, listDueItems);

module.exports = router;

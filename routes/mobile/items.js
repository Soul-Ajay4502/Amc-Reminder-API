const express = require("express");
const router = express.Router();
const db = require('../../config/dbConnection');
const { getDbConnection,checkAuth } = require('../../middlewares')
const { createItem,listItems,removeItem,getItemById,updateItem } = require('./controllers/controllerIndex')


router.post('/add',checkAuth, getDbConnection, createItem);
router.get('/list',checkAuth, listItems);
router.post('/remove/:id',checkAuth, removeItem);
router.get('/listby/:id',checkAuth, getItemById);
router.put('/update/:id',checkAuth, updateItem);




module.exports = router;

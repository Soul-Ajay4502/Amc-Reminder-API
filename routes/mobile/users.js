const express = require("express");
const router = express.Router();
const db = require('../../config/dbConnection');
const { getDbConnection,checkAuth } = require('../../middlewares')
const { createUser,listUsers,removeUser } = require('./controllers/controllerIndex')


router.post('/add',checkAuth, getDbConnection, createUser);
router.get('/list',checkAuth, listUsers);
router.delete('/remove/:userId',checkAuth,getDbConnection, removeUser);


module.exports = router;

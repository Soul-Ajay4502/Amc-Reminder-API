const express = require("express");
const router = express.Router();
const db = require('../../config/dbConnection');
const { getDbConnection,checkAuth } = require('../../middlewares')
const { createUser,listUsers,getUserWithId,removeUser } = require('./controllers/controllerIndex')


router.post('/add',checkAuth, getDbConnection, createUser);
router.get('/list',checkAuth, listUsers);
router.get('/',checkAuth, getUserWithId);
router.delete('/remove/:userId',checkAuth,getDbConnection, removeUser);


module.exports = router;

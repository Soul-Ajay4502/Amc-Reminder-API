const express = require("express");
const router = express.Router();
const db = require('../../config/dbConnection');
const { getDbConnection } = require('../../middlewares')
const { login } = require('./controllers/controllerIndex')


router.post('/', getDbConnection, login);

module.exports = router;

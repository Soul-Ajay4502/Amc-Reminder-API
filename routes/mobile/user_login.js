const express = require("express");
const router = express.Router();
const { getDbConnection } = require('../../middlewares')
const { login } = require('./controllers/controllerIndex')


router.post('/', getDbConnection, login);

module.exports = router;

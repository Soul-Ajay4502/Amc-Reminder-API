const express = require("express");
const router = express.Router();
const {checkAuth } = require('../../middlewares')
const { removeAssignment,assignNotification } = require('./controllers/controllerIndex')


router.post('/assign',checkAuth, assignNotification);
router.delete('/remove/:userId',checkAuth, removeAssignment);



module.exports = router;

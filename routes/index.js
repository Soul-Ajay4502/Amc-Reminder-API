const express = require('express');
const routes = express();

const { userLogin,users,items,notification,imageUpload,auth } = require('./mobile');

routes.use('/auth', auth);
routes.use('/login', userLogin);
routes.use('/user', users);
routes.use('/items', items);
routes.use('/notification', notification);
routes.use('/imageUpload', imageUpload);




module.exports = routes;
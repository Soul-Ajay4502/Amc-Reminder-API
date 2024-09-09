const express = require('express');
const routes = express();

const { userLogin,users,items,notification,imageUpload } = require('./mobile');

routes.use('/login', userLogin);
routes.use('/user', users);
routes.use('/items', items);
routes.use('/notification', notification);
routes.use('/imageUpload', imageUpload);




module.exports = routes;
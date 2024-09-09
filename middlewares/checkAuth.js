const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) {
                return res.status(401).json({
                    statusCode: 401,
                    isError: true,
                    responseData: null,
                    statusText: 'INVALID TOKEN'
                }).end();
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({
            statusCode: 401,
            isError: true,
            responseData: null,
            statusText: 'TOKEN NOT FOUND'
        }).end();
    }
};
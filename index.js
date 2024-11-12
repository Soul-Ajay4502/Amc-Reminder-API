const http = require('http');
require('dotenv').config();
const app = require('./app');

const port = process.env.PORT || 7075;

const server = http.createServer(app);

server.listen(port);

console.log('Server Running on port ' + port);

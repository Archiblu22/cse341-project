const http = require('http');

const routes = require('./prove01-routes.js');

const server = http.createServer(routes.handler);

server.listen(3000);
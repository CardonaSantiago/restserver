//impotaciones de node
require('dotenv').config();
//importaciones de terceros
const Server = require('./models/server');

const server = new Server;

server.listen();







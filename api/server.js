console.log('Im here');
const jsonServer = require('json-server');
const path = require('path');
console.log('Im here 1');

const server = jsonServer.create();
console.log('Im here 2');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
console.log('Im here 3');
const middlewares = jsonServer.defaults();
console.log('Im here 4');

server.use(middlewares);
console.log('Im here 5');
server.use(router);
console.log('Im here 6');


module.exports = (req, res) => {
  console.log('Im here 7');
  server(req, res);
};

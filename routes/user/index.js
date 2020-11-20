const Router = require('koa-router');

const user = new Router();

const userCtrl = require('./user.ctrl');

user.post('/register', userCtrl.register);
user.post('/login', userCtrl.login);

module.exports = user;

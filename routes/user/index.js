const Router = require('koa-router');

const user = new Router();

const userCtrl = require('./user');

user.post('/register', userCtrl.register);
user.post('/login', userCtrl.login);
user.get('/check', userCtrl.check);
user.get('/logout', userCtrl.logout);
user.get('/admin', userCtrl.isadmin);

module.exports = user;

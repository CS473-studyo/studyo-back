const Router = require("koa-router");

const user = new Router();

const userCtrl = require("./user.ctrl");

user.post("/", userCtrl.register);

module.exports = user;
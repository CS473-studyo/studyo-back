const models = require("../../database/models");

exports.register = async (ctx) => {
  console.log("received")
  const { email, password } = ctx.request.body;
  const new_user = await models.User.create({email, password});
  ctx.assert(new_user, 500);
  ctx.status = 204;
};
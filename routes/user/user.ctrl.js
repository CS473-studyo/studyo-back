const models = require('@models');
const { generateToken } = require('@utils/jwt');
const { hashed, getRandomString } = require('@utils/crypto');

exports.register = async (ctx) => {
  const { email, password, key } = ctx.request.body;
  ctx.assert(!process.env.ADMIN_KEY || key === process.env.ADMIN_KEY, 404);
  const res = await models.User.findOne({ where: { email } });
  ctx.assert(!res, 400);
  // Generate random string of length 16
  const salt = getRandomString(16);
  const value = hashed(password, salt);
  ctx.response.body = await models.User.create({
    email,
    salt,
    password: value,
  });
};

exports.login = async (ctx) => {
  ctx.assert(ctx.request.user, 401);
  const userId = ctx.request.user.id;
  const { email, password } = ctx.request.body;
  const res = await models.User.findOne({ where: { email } });
  ctx.assert(res, 204);
  const value = hashed(password, res.salt);
  ctx.assert(value === res.password, 204);
  const token = await generateToken({ id: res.id });
  ctx.cookies.set(process.env.ACCESS_TOKEN, token, {
    maxAge: 1000 * 60 * 60 * 24,
    overwrite: true,
  });
  ctx.status = 204;
};

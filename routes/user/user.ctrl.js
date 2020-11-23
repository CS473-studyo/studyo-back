const models = require('@models');
const { generateToken } = require('@utils/jwt');
const { hashed, getRandomString } = require('@utils/crypto');
const { checkAndGetUserId } = require('@utils/auth');

exports.register = async (ctx) => {
  const { name, email, password, key } = ctx.request.body;
  ctx.assert(!process.env.ADMIN_KEY || key === process.env.ADMIN_KEY, 404);
  const res = await models.User.findOne({
    where: { email },
    attributes: { include: ['email', 'password', 'salt'] },
  });
  ctx.assert(!res, 400, 'The email is already taken.');
  // Generate random string of length 16
  const salt = getRandomString(16);
  const value = hashed(password, salt);
  ctx.response.body = await models.User.create({
    name,
    email,
    salt,
    password: value,
  });
};

exports.login = async (ctx) => {
  const { email, password } = ctx.request.body;
  const res = await models.User.findOne({
    where: { email },
    attributes: { include: ['email', 'password', 'salt'] },
  });
  ctx.assert(res, 400, 'The account does not exist.');
  const value = hashed(password, res.salt);
  ctx.assert(value === res.password, 401, 'The password is incorrect.');
  const token = await generateToken({ id: res.id });
  ctx.cookies.set(process.env.ACCESS_TOKEN, token, {
    maxAge: 1000 * 60 * 60 * 24,
    overwrite: true,
  });
  ctx.status = 204;
};

exports.check = async (ctx) => {
  const id = await checkAndGetUserId(ctx);
  ctx.body = id;
};

exports.logout = async (ctx) => {
  ctx.cookies.set(process.env.ACCESS_TOKEN, null);
  ctx.status = 204;
};

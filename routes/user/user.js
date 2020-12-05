const models = require('@models');
const { generateToken } = require('@utils/jwt');
const { hashed, getRandomString } = require('@utils/crypto');
const { checkAndGetUserId } = require('@utils/auth');

exports.register = async (ctx) => {
  const { name, email, password, key } = ctx.request.body;
  const res = await models.User.findOne({
    where: { email },
    attributes: ['email', 'password', 'salt', 'admin'],
  });
  ctx.assert(!res, 400, 'The email is already taken.');
  // Generate random string of length 16
  const salt = getRandomString(16);
  const value = hashed(password, salt);
  const newUser = await models.User.create({
    name,
    email,
    salt,
    password: value,
    admin: 0,
    badge: false,
  });

  models.Course.findOne({ where: { code: 'CS101' } }).then(async (course) => {
    await newUser.addCourse(course);
    await newUser.save();
  });

  ctx.response.body = newUser;
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
  ctx.assert(ctx.request.user, 401, '401: Unauthorized user');
  const { id } = ctx.request.user;
  const user = await models.User.findOne({
    where: { id },
    attributes: { include: ['email', 'password', 'salt'] },
  });
  ctx.assert(user, 401, '401: Unauthorized user');
  ctx.body = { id, name: user.name, admin: user.admin };
};

exports.logout = async (ctx) => {
  ctx.cookies.set(process.env.ACCESS_TOKEN, null);
  ctx.status = 204;
};

exports.isadmin = async (ctx) => {
  const UserId = await checkAndGetUserId(ctx);

  const user = await models.User.findOne({
    where: { id: UserId },
    attributes: { include: ['email', 'password', 'salt', 'admin'] },
  });

  ctx.assert(user, 404, '404: user not found');

  if (user.admin) {
    ctx.body = 1;
  } else {
    ctx.body = 0;
  }
};

const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'not-a-secret-anymore';

const generateToken = async (payload) => {
  const sign = new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      jwtSecret,
      {
        expiresIn: '7d',
      },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    );
  });
  return sign;
};

exports.generateToken = generateToken;

function decodeToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) reject(error);
      resolve(decoded);
    });
  });
}

exports.jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get(process.env.ACCESS_TOKEN);
  if (!token) return next(); // Skip process if there is no token
  try {
    const decoded = await decodeToken(token.toString());
    if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
      const { id } = decoded;
      const freshToken = await generateToken({ id });
      ctx.cookies.set(process.env.ACCESS_TOKEN, freshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
      });
    }
    ctx.request.user = decoded;
  } catch (e) {
    ctx.request.user = 'ERROR';
  }

  return next();
};

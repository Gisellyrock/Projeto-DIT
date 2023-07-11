const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: 'Usuário não autenticado' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(401).send({ error: 'Usuário não autenticado' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Usuário não autenticado' });
  }

  jwt.verify(token, 'gisellyrock', (error, decoder) => {
    if (error)
      return res.status(401).send({ error: 'Usuário não autenticado' });
    req.user_id = decoder.id;
    return next();
  });
};

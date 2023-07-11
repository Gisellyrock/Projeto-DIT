var express = require('express');
var router = express.Router();
var User = require('../models/user');
const jwt = require('jsonwebtoken');
const loginMidleware = require('../midleware/login');

// Listar todos os usuários
router.get('/', loginMidleware, async function (req, res, next) {
  try {
    var users = await User.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter um usuário específico
router.get('/:id', loginMidleware, async function (req, res, next) {
  try {
    var user = await User.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Criar um novo usuário
router.post('/', loginMidleware, async function (req, res, next) {
  try {
    var user = new User(req.body);
    user = await User.createUser(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar um usuário
router.put('/:id', loginMidleware, async function (req, res, next) {
  try {
    var user = await User.getUserById(req.params.id);
    if (user) {
      user.name = req.body.name;
      user.email = req.body.email;
      // Atualize outros campos conforme necessário

      await user.updateUser();
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async function (req, res, next) {
  try {
    var user = await User.getUserByUsernamePassword(
      req.body.username,
      req.body.password,
    );
    if (user) {
      // Gerar o token JWT
      const token = jwt.sign({ userId: user.id }, 'gisellyrock');

      res.json({ user: user, token: token });
    } else {
      res.status(401).json({ message: 'Usuário ou senha inválida' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', loginMidleware, async function (req, res, next) {
  try {
    var user = await User.getUserById(req.params.id);
    if (user) {
      await user.deleteUser();
      res.json({ message: 'Usuário excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

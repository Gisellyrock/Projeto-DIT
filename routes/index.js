var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send({ message: 'Bem vindo a minha API' });
});

module.exports = router;

const router = require('express').Router();
const userRouter = require('./users.js');
const articleRouter = require('./articles');
const { createUser, login } = require('../controllers/users');
const { validateUserOnRegister, validateUser } = require('../middlewares/responseValid');
const auth = require('../middlewares/auth');

router.post('/signup', validateUserOnRegister, createUser);
router.post('/signin', validateUser, login);

router.use(auth);
router.use('/', userRouter, articleRouter);

module.exports = router;

const router = require('express').Router();
const userRouter = require('./users');
const articleRouter = require('./articles');
const { createUser, login } = require('../controllers/users');
const { validateUserOnRegister, validateUser } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

router.post('/signup', validateUserOnRegister, createUser);
router.post('/signin', validateUser, login);

router.use(auth);
router.use('/users', userRouter);
router.use('/articles', articleRouter);

module.exports = router;

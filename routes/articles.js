const router = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { validatePostArticle, validateDeleteArticle } = require('../middlewares/validation');

router.get('/articles', getArticles);
router.post('/articles', validatePostArticle, createArticle);
router.delete('/articles/:id', validateDeleteArticle, deleteArticle);

module.exports = router;

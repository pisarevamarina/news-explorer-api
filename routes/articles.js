const router = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { validatePostArticle, validateDeleteArticle } = require('../middlewares/responseValid');

router.get('/articles', getArticles);
router.post('/articles', validatePostArticle, createArticle);
router.delete('/articles/:articleId', validateDeleteArticle, deleteArticle);

module.exports = router;

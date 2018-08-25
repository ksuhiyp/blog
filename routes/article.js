const app = require('express');
const router = app.Router();
const articleController = require('../controllers/article');

router.get('/', articleController.getAllArticles);
router.get('/:_id', articleController.getOneArticle);
router.get('/getArticlesByCategory/:_id', articleController.getArticlesByCategory);
router.get('/getArticlesByTag/:_id', articleController.getArticlesByTag);

router.post('/', articleController.createArticle);
router.delete('/deleteArticles', articleController.deleteArticles);
router.delete('/:_id', articleController.deleteArticle);
router.put('/:_id', articleController.updateArticle);



module.exports = router;

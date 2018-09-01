const app = require('express');
const router = app.Router();
const articleController = require('../controllers/article');
const createError = require('http-errors')
const multer = require('../config/multer')


router.get('/', articleController.getAllArticles);
router.get('/:_id', articleController.getOneArticle);
router.get('/getArticlesByCategory/:_id', articleController.getArticlesByCategory);
router.get('/getArticlesByTag/:_id', articleController.getArticlesByTag);

router.post('/', multer, articleController.createArticle);
router.delete('/deleteArticles', articleController.deleteArticles);
router.delete('/:_id', articleController.deleteArticle);
router.put('/:_id', cpUpload, articleController.updateArticle);



module.exports = router;

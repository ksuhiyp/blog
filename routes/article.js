const app = require('express');
const router = app.Router();
const articleController = require('../controllers/article');
const multer = require('../config/multer').articleUpload


router.get('/', articleController.getAllArticles);
router.get('/:_id', articleController.getOneArticle);
router.get('/getArticlesByCategory/:_id', articleController.getArticlesByCategory);
router.get('/getArticlesByTag/:_id', articleController.getArticlesByTag);

router.post('/', multer, articleController.createArticle);
router.delete('/:_id', articleController.deleteArticle);
router.delete('/', articleController.deleteArticles);

router.put('/:_id', multer, articleController.updateArticle);



module.exports = router;

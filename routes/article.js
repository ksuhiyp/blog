const app = require('express');
const router = app.Router();
const articleController = require('../controllers/article');

const multer = require('multer');
const upload = multer({ dest: "uploads" });
cpUpload = upload.fields([{ name: 'main_image', maxCount: 1 }, { name: 'body_images', maxCount: 10 }])

router.get('/', articleController.getAllArticles);
router.get('/:_id', articleController.getOneArticle);
router.get('/getArticlesByCategory/:_id', articleController.getArticlesByCategory);
router.get('/getArticlesByTag/:_id', articleController.getArticlesByTag);

router.post('/', cpUpload, articleController.createArticle);
router.delete('/deleteArticles', articleController.deleteArticles);
router.delete('/:_id', articleController.deleteArticle);
router.put('/:_id', articleController.updateArticle);



module.exports = router;

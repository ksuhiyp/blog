const app = require('express');
const router = app.Router();
const articleController = require('../controllers/article');

router.get('/', articleController.getAllArticles);
router.get('/:_id', articleController.getOneArticle);
router.post('/', articleController.createArticle);
router.delete('/deleteArticles', articleController.deleteArticles);
router.delete('/:_id', articleController.deleteArticle);
router.put('/:_id', articleController.updateArticle);



module.exports = router;

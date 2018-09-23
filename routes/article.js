const app = require('express');
const router = app.Router();
const articleController = require('../controllers/article');
const multer = require('../config/multer').articleUpload
const passport = require('../controllers/auth/passport')

router
    .get('/', articleController.getAllArticles)
    .get('/:_id', articleController.getOneArticle)
    .get('/getArticlesByCategory/:_id', articleController.getArticlesByCategory)
    .get('/getArticlesByTag/:_id', articleController.getArticlesByTag)
    .options('*', (req, res, next) => { res.status(205).send('test') })
    .all('*', (req,res,next)=>{console.log(req.headers.authorization);next()},passport.authenticate('jwt', { session: false }), (req, res, next) => { next(); })
    .post('/', multer, articleController.createArticle)
    .delete('/:_id', articleController.deleteArticle)
    .delete('/', articleController.deleteArticles)
    .put('/:_id', multer, articleController.updateArticle);



module.exports = router;

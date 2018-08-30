const app = require('express');
const router = app.Router();
const articleController = require('../controllers/article');
const createError = require('http-errors')
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'main_image')
            cb(null, 'uploads/main_image')
        else if (file.fieldname = 'body_images')
            cb(null, 'uploads/body_images')

    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!new RegExp('image/(.)*').test(file.mimetype)) {
            req.multerImageValidation = 'wrong type';
            return cb(createError(400, 'bad extension'), false)
        }
        return cb(null, true);
    }
});
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

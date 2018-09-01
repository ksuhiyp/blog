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

module.exports = cpUpload;
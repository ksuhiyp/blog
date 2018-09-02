const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {

        switch (file.fieldname) {
            case 'main_image':
                cb(null, 'uploads/main_image')
                break;
            case 'body_images':
                cb(null, 'uploads/body_images')
                break;
            case 'profile_picture':
                cb(null, 'uploads/profile_picture')
                break;
        }
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
exports.articleUpload = upload.fields([{ name: 'main_image', maxCount: 1 }, { name: 'body_images', maxCount: 10 }])
exports.userUpload = upload.single('profile_picture');

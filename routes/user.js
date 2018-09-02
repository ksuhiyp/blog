
const app = require('express');
const userController = require('../controllers/user')
const multer = require('../config/multer').userUpload

const router = app.Router();



router
    .post('/', multer, userController.createUser)
    .get('/:_id', userController.getUserById)
    .get('/', userController.getAllUsers)
    .put('/:_id', multer, userController.updateUser)
    .delete('/:_id', userController.deleteUser)
    .delete('/', userController.deleteManyUsers);
module.exports = router;

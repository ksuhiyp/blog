
const app = require('express');
const userController = require('../controllers/user')
const multer = require('../config/multer').userUpload
const passport = require('passport')
const router = app.Router();



router
    .post('/', multer, passport.authenticate('jwt', { session: false }), userController.createUser)
    .post('/login', userController.getJWT)
    .get('/:_id', userController.getUserById)
    .get('/', userController.getAllUsers)
    .put('/:_id', multer, userController.updateUser)
    .delete('/:_id', userController.deleteUser)
    .delete('/', userController.deleteManyUsers);
module.exports = router;

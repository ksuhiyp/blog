
const app = require('express');
const userController = require('../controllers/user')

const router = app.Router();



router
    .post('/', userController.createUser)
    .get('/:_id', userController.getUserById)
    .get('/', userController.getAllUsers)
    .put('/:_id', userController.updateUser)
    .delete('/:_id', userController.deleteUser)
    .delete('/', userController.deleteManyUsers);
module.exports = router;

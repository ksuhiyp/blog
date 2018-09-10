const app = require('express');
const router = app.Router();
const categoryController = require('../controllers/category');
const passport = require('passport')

router
    .get('/', categoryController.getAllCategories)
    .get('/:_id', categoryController.getCategoryById)
    .all('*', passport.authenticate('jwt', { session: false }), (req, res, next) => { next(); })
    .post('/', categoryController.createCategory)
    .delete('/:_id', categoryController.deleteCategory)
    .put('/:_id', categoryController.updateCategory);

module.exports = router;

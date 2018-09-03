const app = require('express');
const router = app.Router();
const categoryController = require('../controllers/category');

router.post('/', categoryController.createCategory)
    .get('/', categoryController.getAllCategories)
    .get('/:_id', categoryController.getCategoryById)
    .delete('/:_id', categoryController.deleteCategory)
    .put('/:_id', categoryController.updateCategory);

module.exports = router;

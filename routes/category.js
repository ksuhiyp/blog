const app = require('express');
const router = app.Router();
const categoryController = require('../controllers/category');


router.post('/', categoryController.createCategory);
router.get('/getManyCategories', categoryController.getManyCategories);
router.get('/', categoryController.getAllCategorys);
router.get('/:_id', categoryController.getCategoryById);
router.delete('/deleteManyCategorys', categoryController.deleteManyCategorys);
router.delete('/:_id', categoryController.deleteCategory);
router.put('/:_id', categoryController.updateCategory);
module.exports = router;

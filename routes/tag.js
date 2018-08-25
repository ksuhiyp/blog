const app = require('express');
const router = app.Router();
const tagController = require('../controllers/tag');


router.post('/', tagController.createTag);
router.get('/', tagController.getAllTags);
router.get('/:_id', tagController.getTagById);
router.delete('/:_id', tagController.deleteTag);
router.put('/:_id', tagController.updateTag);

module.exports = router;

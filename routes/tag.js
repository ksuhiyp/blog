const app = require('express');
const router = app.Router();
const tagController = require('../controllers/tag');


router.post('/', tagController.createTag)
    .get('/', tagController.getAllTags)
    .get('/:_id', tagController.getTagById)
    .delete('/:_id', tagController.deleteTag)
    .put('/:_id', tagController.updateTag);

module.exports = router;

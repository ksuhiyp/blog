const app = require('express');
const router = app.Router();
const tagController = require('../controllers/tag');
const passport = require('passport')


router
    .get('/', tagController.getAllTags)
    .get('/:_id', tagController.getTagById)
    .all('*', passport.authenticate('jwt', { session: false }), (req, res, next) => { next(); })
    .post('/', tagController.createTag)
    .delete('/:_id', tagController.deleteTag)
    .put('/', tagController.upsertTag)
    .put('/:_id', tagController.updateTag)

module.exports = router;

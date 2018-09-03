const tagModel = require('../models/tag').model;
const createError = require('http-errors');
const errorHandler = require('../helpers/errorHandler');

exports.getTagById = (req, res, next) => {
    if (!errorHandler.validateObjId(req.params._id))
        return next(createError(400, 'Invalid id!'));

    tagModel.
        findById(req.params._id).
        select('-__v').
        populate('articles', 'title').
        exec().
        then((tag) => {
            if (!tag)
                return next(createError(400, `No, there is no tag with id of ${req.params._id}`));
                
            res.status(201).json({ "Operation": 'GET/tag', "result": tag })
        }).catch(err => next(err));

}


exports.getAllTags = (req, res, next) => {
    tagModel.
        find().
        select('-__v ').
        exec().
        then((tags) => {
            if (!tags)
                res.status(204);

            res.status(201).json({ "Operation": 'GET/allTags', "Count": tags.length, "Result": tags });

        }).catch((err) => next(err));
}
exports.createTag = (req, res, next) => {

    tag = new tagModel({ title: req.body.title });

    tag.save().then((tag) => {

        if (!tag)
            throw new Error('somthing went wrong!');

        res.status(201).json({ "Operation": "POST/tag", "Result": { title: tag.title, id: tag._id } })
    }).catch(err => next(err))


}
exports.deleteTag = (req, res, next) => {

    if (!errorHandler.validateObjId(req.params._id))
        return next(createError(400, "Invalid ID!"));

    tagModel.findById(req.params._id).exec().then((tag) => {

        if (!tag)
            throw new Error('Tag not found!');

        tag.remove().then((doc) => {

            res.status(201).json({ "operation": "DELETE/tag", "tagId": tag._id })

        }).catch(err => next(err));

    }).catch(err => next(err))
}

exports.updateTag = (req, res, next) => {

    if (!errorHandler.validateObjId(req.params._id))
        return next(createError(400, "Invalid ID!"));

    tagModel.
        findById(req.params._id).
        then((tag) => {

            if (!tag)
                throw new Error('Tag Not Found!');

            tag.title = req.body.title;

            tag.save().then((tag) => {
                res.status(200).json({ "operation": "PUT/tag", "updateTag": tag })

            }).catch((err) => next(err));
        }).catch((err) => next(createError(500, err)));

}

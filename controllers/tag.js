const tagModel = require('../models/tag').model;
const createError = require('http-errors');
const errorHandler = require('../errorHandler');

exports.getTagById = (req, res, next) => {
    if (!errorHandler.validateObjId(req.params._id))
        return next(createError(400, 'Invalid id!'));

    tagModel.
        findById(req.params._id).
        select('-__v').
        populate('articles', 'title').
        exec((err, tag) => {
            if (err)
                return next(err);
            if (!tag)
                return next(createError(400, `No, there is no tag with id of ${req.params._id}`));
            res.status(201).json({ "Operation": 'get tag', "result": tag })
        });

}


exports.getAllTags = (req, res, next) => {
    tagModel.
        find(null).
        select('-__v -articles').
        populate('articles', 'title').
        exec((err, tags) => {
            if (err)
                return next(err);
            if (!tags)
                return next(createError(204))
            res.status(201).json({ "Operation": 'GET/allTags', "result": tags })
        });
}
exports.createTag = (req, res, next) => {

    tag = new tagModel({ title: req.body.title });

    tag.save((err, tag) => {
        if (err)
            return next(err);
        if (!tag)
            return next(createError(400, 'somthing went wrong!'));

        res.status(201).json({ "Operation": "POST/tag", tag: { title: tag.title, id: tag._id } })
    })


}
exports.deleteTag = (req, res, next) => {
    if (!req.params._id)
        return next(createError(400, 'missing Parameters!'));

    if (!errorHandler.validateObjId(req.params._id))
        return next(createError(400, "Invalid ID!"));

    tagModel.findById(req.params._id).exec((err, tag) => {
        if (err)
            return next(err);
        if (!tag)
            return next(createError(400, "tag not found!"));
        tag.remove((err) => {
            if (err)
                return next(err);

            res.status(200).json({ "operation": "DELETE/tag", "tagId": tag._id })

        });

    })
}

exports.updateTag = (req, res, next) => {
    if (!req.params._id)
        return next(createError(400, 'missing Parameters!'));

    if (!errorHandler.validateObjId(req.params._id))
        return next(createError(400, "Invalid ID!"));
    tagModel.findById(req.params._id, (err, tag) => {
        if (err)
            return next(createError(500, err));
        if (!tag)
            return next(createError(204, "Tag not found"));
        for (prop in req.body)
            tag[prop] = req.body[prop];



        tag.save((err, tag) => {
            if (err)
                next(createError(400, err));
            if (!tag)
                next(createError(400, "Tag not found"));
            res.status(200).json({ "operation": "PUT/tag", "updateTag": tag })

        });
    });

}

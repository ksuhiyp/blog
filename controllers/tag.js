const tagModel = require('../models/tag');
const createError = require('http-errors');
const errorHandler = require('../controllers/errorHandler');

exports.getTagById = (req, res, next) => {
    if (!errorHandler.validateObjId(req.params._id))
        return next(createError(400, 'Invalid id!'));

    tagModel.getTagById(req.params._id, (err, tag) => {
        if (err)
            return next(err);
        if (!tag)
            return next(createError(400, `No, there is no tag with id of ${req.params._id}`));
        res.status(201).json({ "Operation": 'get tag', "result": tag })
    })

}

exports.getManyTags = (req, res, next) => {
    if (!errorHandler.validateObjIds(req.query._id))
        return next(createError(400, 'Invalid id! parameter should be type of id[]'));

    tagModel.getManyTags({ "_id": { "$in": req.query._id } }, null, null, (err, tag) => {
        if (err)
            return next(err);
        if (!tag)
            return next(createError(400, 'somthing is not ok'));
        res.status(201).json({ "Operation": 'get Many tag', "result": tag })


    });
}
exports.getAllTags = (req, res, next) => {
    tagModel.getAllTags(null, (err, tags) => {
        if (err)
            return next(err);
        if (!tags)
            return next(createError(204))
        res.status(201).json(tags)
    })
}
exports.createTag = (req, res, next) => {

    tag = new tagModel.tagModel({ title: req.body.title });

    tagModel.createtTag(tag, (err, tag) => {
        if (err)
            return next(err);
        if (!tag)
            return next(createError(400, 'somthing went wrong!'));
        res.status(201).json({ "Operation": "Create Tag", tag })
    })


}
exports.deleteTag = (req, res, next) => {
    if (!req.params._id)
        return next(createError(400, 'missing Parameters!'));

    if (!errorHandler.validateObjId(req.params._id))
        return next(createError(400, "Invalid ID!"));

    tagModel.deleteTag(req.params._id, (err, tag) => {
        if (err)
            return next(err);
        if (!tag)
            return next(createError(400, "tag not found!"));

        res.status(201).json({ "operation": "delete tag", "result": tag })

    })
}
exports.deleteManyTags = (req, res, next) => {
    if (!req.query._id)
        return next(createError(400, 'missing query Params of type id[]'));
    if (!Array.isArray(req.query._id))
        return next(createError(400, 'Params should be in form of an Array, string given!'));
    if (!errorHandler.validateObjIds(req.query._id))
        return next(createError(400, 'Invalid IDs!'));

    let query = { '_id': { '$in': req.query._id } }

    tagModel.deleteManyTags(query, (err, tags) => {
        res.status(201).json({ "operation": "deleteTags", "deletedArticles": tags.n })

    })
}
exports.updateTag = (req, res, next) => {
    tagModel.getTagById({ "_id": req.params._id }, function (err, tag) {
        if (err)
            next(createError(400, err));
        if (!tag)
            next(createError(400, "Tag not found"));
        for (prop in req.body) {
            tag[prop] = req.body[prop];

        }

        tag.save((err, tag) => {
            if (err)
                next(createError(400, err));
            if (!tag)
                next(createError(400, "Tag not found"));
            res.status(200).json({ "operation": "updateTag", "updateTag": tag })

        });
    });

}

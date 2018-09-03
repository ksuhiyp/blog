const categoriesModel = require('../models/category').model;
const errorHandler = require('../errorHandler');
const createError = require('http-errors');


exports.getCategoryById = (req, res, next) => {
    if (!errorHandler.validateObjId(req.params._id))
        return next(createError(400, 'invalid id'))
    req.query.options ? options = req.query.options : options = null
    categoriesModel.findById(req.params._id, options).
        select('-__v ').
        exec().
        then((category) => {
            if (!category)
                throw new Error("Category Not Found!")
            res.status(200).json({ "operation": "GET/Category", "Category": category })
        }).catch(err => next(err))
}

exports.createCategory = (req, res, next) => {
    category = new categoriesModel(req.body);
    category.save().then((category) => {

        res.status(200).json({ "operation": "POST/Category", "Category": category })

    }).catch(err => next(err))

}
/**var doc = parent.children.id(_id); */
exports.getAllCategories = (req, res, next) => {
    categoriesModel.find().
        select('-__v').
        exec().
        then((categories) => {
            if (!categories)
                throw new Error('No Categories Found!');
            res.status(200).json({ "operation": "Get/allCategories", "Count": categories.length, "Categories": categories })
        }).catch(err => next(err))
}
exports.deleteCategory = (req, res, next) => {

    if (!errorHandler.validateObjId(req.params._id))
        return next(createError(400, "Invalid ID!"));

    categoriesModel.findByIdAndRemove(req.params._id).
        then((category) => {
            if (!category)
                throw new Error('category not found!');

            res.status(201).json({ "operation": "DELETE/Category", "result": category._id })

        }).catch(err => next(err))
}
/**we need a way to assert that req.body is not empty */
exports.updateCategory = (req, res, next) => {
    if (!errorHandler.validateObjId(req.params._id))
        return next(createError(400, "Invalid ID!"));

    categoriesModel.
        findById(req.params._id).
        then((category) => {
            if (!category)
                throw new Error('Tag Not Found!');

            category.title = req.body.title;
            category.save().then((category) => {
                res.status(200).json({ "operation": "PUT/category", "updateCategory": category })
            }).catch((err) => next(err));
        }).catch((err) => next(createError(500, err)));
}
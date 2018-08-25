const categoriesModel = require('../models/category').model;
const errorHandler = require('../errorHandler');
const createError = require('http-errors');


exports.getCategoryById = (req, res, next) => {
    if (!errorHandler.validateObjId(req.params._id))
        return next(createError(400, 'invalid id'))
    req.query.options ? options = req.query.options : options = null
    categoriesModel.findById(req.params._id, options).
        select('-__v ').
        exec((err, category) => {
            if (err)
                return next(err);
            if (!category)
                return next(createError(204));
            res.status(200).json({ "operation": "GET/Category", "Category": category })

        })
}

exports.createCategory = (req, res, next) => {
    category = new categoriesModel(req.body);
    category.save((err, category) => {
        if (err)
            return next(err);
        if (!category)
            return next(createError(204));
        res.status(200).json({ "operation": "POST/Category", "Category": category })

    });

}
/**var doc = parent.children.id(_id); */
exports.getAllCategories = (req, res, next) => {
    categoriesModel.find().
        select('-__v -articles').
        exec((err, categories) => {
            if (err)
                return next(err);
            if (!categories)
                return next(createError(204, 'No Categories Found!'));
            res.status(200).json({ "operation": "Get All Categories", "Categories": categories })
        })
}
exports.deleteCategory = (req, res, next) => {
    if (!req.params._id)
        return next(createError(400, 'missing Parameters!'));

    if (!errorHandler.validateObjId(req.params._id))
        return next(createError(400, "Invalid ID!"));

    categoriesModel.findByIdAndRemove(req.params._id, (err, category) => {
        if (err)
            return next(err);
        if (!category)
            return next(createError(400, "category not found!"));

        res.status(201).json({ "operation": "DELETE/Category", "result": category._id })

    })
}
/**we need a way to assert that req.body is not empty */
exports.updateCategory = (req, res, next) => {
    categoriesModel.findByIdAndUpdate(req.params._id, req.body, { new: true, runValidators: true }, (err, category) => {
        if (err)
            return next(createError(400, err));
        if (!category)
            return next(createError(400, "Category not found"));
        res.status(200).json({ "operation": "PUT/Category", "updateCategory": category });


    });

}
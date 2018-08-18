const categoryModel = require('../models/category');
const createError = require('http-errors');
const errorHandler = require('../controllers/errorHandler');

exports.getCategoryById = (req, res, next) => {
    if (!errorHandler.validateObjId(req.params._id))
        return next(createError(400, 'Invalid id!'));

    categoryModel.getCategoryById(req.params._id, (err, category) => {
        if (err)
            return next(err);
        if (!category)
            return next(createError(400, `No, there is no category with id of ${req.params._id}`));
        res.status(201).json({ "Operation": 'get category', "result": category })
    })

}

exports.getManyCategories = (req, res, next) => {
    if (!errorHandler.validateObjIds(req.query._id))
        return next(createError(400, 'Invalid id! parameter should be type of id[]'));

    categoryModel.getManyCategories({ "_id": { "$in": req.query._id } }, null, null, (err, category) => {
        if (err)
            return next(err);
        if (!category)
            return next(createError(400, 'somthing is not ok'));
        res.status(201).json({ "Operation": 'get Many category', "result": category })


    });
}
exports.getAllCategorys = (req, res, next) => {
    categoryModel.getAllCategorys(null, (err, categorys) => {
        if (err)
            return next(err);
        if (!categorys)
            return next(createError(204))
        res.status(201).json(categorys)
    })
}
exports.createCategory = (req, res, next) => {

    category = new categoryModel.categoryModel({ title: req.body.title });

    categoryModel.createtCategory(category, (err, category) => {
        if (err)
            return next(err);
        if (!category)
            return next(createError(400, 'somthing went wrong!'));
        res.status(201).json({ "Operation": "Create Category", category })
    })


}
exports.deleteCategory = (req, res, next) => {
    if (!req.params._id)
        return next(createError(400, 'missing Parameters!'));

    if (!errorHandler.validateObjId(req.params._id))
        return next(createError(400, "Invalid ID!"));

    categoryModel.deleteCategory(req.params._id, (err, category) => {
        if (err)
            return next(err);
        if (!category)
            return next(createError(400, "category not found!"));

        res.status(201).json({ "operation": "delete category", "result": category })

    })
}
exports.deleteManyCategorys = (req, res, next) => {
    if (!req.query._id)
        return next(createError(400, 'missing query Params of type id[]'));
    if (!Array.isArray(req.query._id))
        return next(createError(400, 'Params should be in form of an Array, string given!'));
    if (!errorHandler.validateObjIds(req.query._id))
        return next(createError(400, 'Invalid IDs!'));

    let query = { '_id': { '$in': req.query._id } }

    categoryModel.deleteManyCategorys(query, (err, categorys) => {
        res.status(201).json({ "operation": "deleteCategorys", "deletedArticles": categorys.n })

    })
}
exports.updateCategory = (req, res, next) => {
    categoryModel.getCategoryById({ "_id": req.params._id }, function (err, category) {
        if (err)
            next(createError(400, err));
        if (!category)
            next(createError(400, "Category not found"));
        for (prop in req.body) {
            category[prop] = req.body[prop];

        }

        category.save((err, category) => {
            if (err)
                next(createError(400, err));
            if (!category)
                next(createError(400, "Category not found"));
            res.status(200).json({ "operation": "updateCategory", "updateCategory": category })

        });
    });

}

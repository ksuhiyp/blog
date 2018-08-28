const articleModel = require('../models/article').articleModel;
const createError = require('http-errors');
const errorHandler = require('../errorHandler');


/**
 * Can be used to list all aticles or specific list of articles depending on @param {query} 
 * query = { "_id": { "$in": ids } } || {}
 * @param {*} query 
 * @param {*} res 
 * @param {*} next 
 */

exports.getAllArticles = ((req, res, next) => {
    //TODO: filter capability 
    authorPopulation = ['author', 'name'];
    tagsPopulation = ['tags', 'title'];
    categoriesPopulation = ['categorys', 'title'];
    articleModel.find().
        populate(...authorPopulation).
        populate({ path: 'tags', model: 'tag' }).
        populate({ path: 'categories', model: 'category' }).
        exec((err, articles) => {
            if (err)
                next(err);
            if (!articles.length)
                res.status(204).send()
            else
                res.status(200).json(articles)
        })
})

exports.getOneArticle = (req, res, next) => {
    const id = req.params._id;
    authorPopulation = ['author', 'name'];
    tagsPopulation = ['tags', 'title'];
    categoriesPopulation = ['categorys', 'title'];
    if (!errorHandler.validateObjId(id))
        return next(createError(400, `Invalid id parameter ${id}`));

    articleModel.findById(id).
        populate(authorPopulation).
        populate({ path: 'tags', model: 'tag' }).
        populate({ path: 'categories', model: 'category' }).
        exec((err, article) => {
            if (err)
                next(err);
            if (!article)
                res.status(204).send();
            else
                res.status(200).json(article)
        })
}
exports.createArticle = (req, res, next) => {
    data = new articleModel(req.body)
    data.save((err, article) => {
        if (err)
            return next(err);

        if (!article)
            return next(createError(400, 'somthing went wrong!'));


        res.status(201).json({
            "Operation": "POST/article",
            "article_id": article._id
        });

    });



}

//{ field: { $in: [<value1>, <value2>, ... <valueN> ] } }
exports.deleteArticles = (req, res, next) => {
    if (!req.query.id)
        return next(createError(400, 'No parameters provided'));
    if (!Array.isArray(req.query.id)) {
        if (!errorHandler.validateObjId(req.query.id))
            return next(createError(400, "Incorrect Id"));
        articleModel.deleteArticle(req.query.id, (err, article) => {
            if (err) {
                return next(err)
            }
            if (!article)
                return next(createError(400, 'article not found to be deleted!'));

            res.status(200).json({ "operation": "deleteArticle", "deletedArticle": article._id });

        })
    }
    else {
        if (!errorHandler.validateObjIds(req.query.id))
            return next(createError(400, 'One or more ids are Invalid'));
        let ids = req.query.id
        let query = { '_id': { '$in': ids } }
        articleModel.deleteManyArticles(query, (err, articles) => {
            if (err) {
                return next(createError(500, err.message))
            }
            res.status(200).json({ "operation": "deleteArticles", "deletedArticles": articles.n })
        })
    }

}
exports.deleteArticle = (req, res, next) => {
    if (!req.params._id)
        next(createError(400, 'Missing Parameters'))
    if (!errorHandler.validateObjId(req.params._id))
        return next(createError(400, "Incorrect Id"));
    let id = req.params._id
    articleModel.deleteArticle(id, (err, article) => {
        if (err) {
            next(err)
        }
        if (!article)
            next(createError(400, 'article not found to be deleted!'));
        res.status(200).json({ "operation": "deleteArticle", "deletedArticle": article._id })

    })
}
exports.updateArticle = (req, res, next) => {
    req.body.last_update = Date.now();

    articleModel.findById(req.params._id, function (err, doc) {
        if (err)
            return next(err);
        if (!doc)
            return next(createError(204, 'article not found!'));
        for (entity in req.body)
            doc[entity] = req.body[entity];


        doc.save((err, doc) => {

            if (err)
                return next(err);
            if (!doc)
                return next(createError(400, "doc not found"));
            res.status(200).json({ "operation": "updateArticle", "updateArticle": doc })

        });
    });
}
exports.getArticlesByCategory = (req, res, next) => {
    articleModel.articleModel.find({ 'categories._id': req.params._id }, 'title _id', (err, articles) => {
        if (err)
            return next(err);
        if (!articles)
            return next(createError(400, 'Not found'));
        res.status(200).json({ "operation": "getArticlesByCategory", "Articles": articles })

    })
};

exports.getArticlesByTag = (req, res, next) => { }
exports.getAllTags = (req, res, next) => {
    res.status(201).json(['tag1', 'tag2', 'tag3'])

}




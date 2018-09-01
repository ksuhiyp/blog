const articleModel = require('../models/article').articleModel;
const createError = require('http-errors');
const errorHandler = require('../errorHandler');
const fs = require('fs')
const multer = require('../config/multer')

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
    data = new articleModel({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        tags: req.body.tags,
        categories: req.body.categories,
        description: req.body.description,
        article_images: {
            "body_images": req.files.body_images ? req.files.body_images.map((file) => { return file.path }) : "",
            "main_image": req.files.main_image ? req.files.main_image[0].path : ""
        }
    });
    data.save().
        then((article) => {
            res.status(201).json({
                "Operation": "POST/article",
                "article_id": article._id
            });

        }).catch((err) => {
            for (file in req.files) {
                path = req.files[file].map((element) => {
                    fs.unlink(element.path, (err) => {
                        if (err)
                            return next(err)
                    });
                })
            }
            return next(err);
        })
};
exports.updateArticle = (req, res, next) => {
    req.body.last_update = Date.now();

    articleModel.
        findById(req.params._id).
        exec().
        then((doc) => {
            if (!doc)
                throw new Error('Docoment not found!!');

            doc.article_images.body_images.forEach((element) => {
                fs.unlink(element, (err) => { })
            });
            fs.unlink(doc.article_images.main_image, (err) => { });

            doc['title'] = req.body['title'];
            doc['body'] = req.body['body'];
            doc['author'] = req.body['author'];
            doc['description'] = req.body['description'];
            doc['tags'] = req.body['tags'];
            doc['categories'] = req.body['categories'];
            doc['article_images'] = {
                "body_images": req.files.body_images ? req.files.body_images.map((file) => { return file.path }) : "",
                "main_image": req.files.main_image ? req.files.main_image[0].path : ""
            }
            doc.save().
                then((doc) => {
                    res.status(200).json({ "operation": "updateArticle", "updateArticle": doc })
                })
        }).catch((err) => {
            return next(err)
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




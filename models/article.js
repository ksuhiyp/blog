const mongoose = require('mongoose');
const tagsSchema = mongoose.Schema({
    title: {
        type: String, index: true, enum: ['tag1', 'tag2', 'tag3']

    }
});
const categoriesSchema = mongoose.Schema({
    title: {
        type: String, index: true, enum: ['categories1', 'categories2', 'categories3']

    }
});
const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    tags: [tagsSchema],
    categories: [categoriesSchema],
    create_date: {
        type: Date,
        default: Date.now
    },
    last_update: {
        type: Date,
        default: null

    },
    description: {
        type: String,
        required: false
    },
    article_images: {
        main_image: {
            String
        },
        body_images: {
            type: Array
        }
    }
});
schema.post('save', (article, next) => {

    article.model('user').updateOne({ "_id": article.author }, { $push: { articles: article._id } }, { new: true }, (err, user) => {

        if (err)
            return next(err);
        if (!user)
            return next(createError(400, 'Author not found in User list!'));
        next();


    });
});
schema.pre('remove', (article, next) => {
    article.model('user').updateOne({ "_id": article.author }, { $pull: { articles: article._id } }, { new: true }, (err, user) => {
        if (err)
            return next(err);
        if (!user)
            return next(createError(400, 'Author not found in User list!'));
        next();

    });
})

exports.articleModel = articleModel = mongoose.model('article', schema);


exports.getArticles = (condition, options, projection, population, callback, limit) => {
    articleModel.
        find(condition, options, projection).
        limit(limit).
        populate(...population).
        exec(callback);
}
exports.getOneArticle = (id, populate, callback) => {

    articleModel.
        findById(id).
        populate('author', 'user_name').
        exec(callback)
}
exports.createArticle = (article, callback) => {
    articleModel.create(article, callback)
}
exports.deleteArticle = (id, callback) => {
    articleModel.findByIdAndRemove(id, callback);
}
exports.deleteManyArticles = (query, callback) => {
    articleModel.deleteMany(query, callback)
}
exports.updateArticle = (id, update, options, callback) => {
    articleModel.findByIdAndUpdate(id, update, options, callback)
}
 /**
  * population may be vital sometimes not always
  * @link https://mongoosejs.com/docs/populate.html */
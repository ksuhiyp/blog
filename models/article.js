const mongoose = require('mongoose');
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
    tags: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        ref: 'tags'
    },
    categories: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'category'
    },

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

    articleModel.findById(id).populate(...populate).exec(callback)
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
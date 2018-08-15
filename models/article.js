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
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: false
    },
    categories: {
        type: Array,
        required: false
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    last_update: {
        type: Date,
        default:null

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


exports.getArticles = (condition, options, projection, callback, limit) => {
    articleModel.find(condition, options, projection, callback).limit(limit)
}
exports.getOneArticle = (id, callback) => {

    articleModel.findById(id, callback)
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


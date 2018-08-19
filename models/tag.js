const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    articles: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article'
    }
});

exports.tagModel = tagModel = mongoose.model('tag', schema);
exports.getAllTags = (conditon, callback) => {
    tagModel.find(conditon, callback)
}

exports.getManyTags = (condition, options, projection, callback, limit) => {
    tagModel.find(condition, options, projection, callback).limit(limit)
}
exports.getTagById = (id, callback) => {

    tagModel.findById(id, callback)
}
exports.createtTag = (tag, callback) => {
    tagModel.create(tag, callback)

}
exports.deleteTag = (id, callback) => {
    tagModel.findByIdAndRemove(id, callback);
}
exports.deleteManyTags = (query, callback) => {
    tagModel.deleteMany(query, callback)
}
exports.updateTag = (id, update, options, callback) => {
    tagModel.findByIdAndUpdate(id, update, options, callback)
}



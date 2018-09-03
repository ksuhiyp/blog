const mongoose = require('mongoose');
const schema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true

    }

});

schema.post('remove', (doc, next) => {

    doc.model('article').findOneAndUpdate({ "categories._id": { "$in": [doc._id] } }, { $pull: { 'category._id': doc._id } }, (err, categories) => {
        if (err)
            return next(err);
        if (!doc)
            return next(createError(500, 'internal server error'));

        next();
    })

});
exports.model = model = mongoose.model('category', schema);
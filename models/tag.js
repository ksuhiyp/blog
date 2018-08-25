const mongoose = require('mongoose');
const schema = mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    articles: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'articles'

    }
});
exports.model = model = mongoose.model('tag', schema);
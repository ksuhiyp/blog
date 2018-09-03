const fs = require('fs');
exports.unlinkFile = (path, err) => fs.unlink(path, err => err)


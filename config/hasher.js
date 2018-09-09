const bcrypt = require('bcrypt');

exports.hash = (myPlaintextPassword, saltRounds) => 
    bcrypt.
        genSalt(saltRounds).
        then((salt) =>
            bcrypt.
                hash(myPlaintextPassword, salt).
                then((hash) =>
                    hash
                ).catch(err => err))
        .catch(err => err);


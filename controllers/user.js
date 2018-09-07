const userModel = require('../models/user').model;
const createError = require('http-errors');
const errorHandler = require('../helpers/errorHandler');
const unlink = require('../helpers/unlink').unlinkFile

exports.createUser = (req, res, next) => {
    user = new userModel(req.body)

    user.profile_picture = req.file ? req.file.path : '';

    user.
        save().
        then((user) => {
            res.status(201).json({
                "message": "success",
                "operation": "POST/user",
                "data": user._id
            })
        }).catch((err) => {
            /**unlinking uploads at this stage could cause code race */
            if (req.file)
                unlink(req.file.path, (err) => {
                    next(err)
                })
            return next(err);
        })
}

exports.getUserById = (req, res, next) => {
    const id = req.params._id;
    if (!errorHandler.validateObjId(id))
        return next(createError(400, `Invalid id parameter ${id}`));

    options = {};

    userModel.findOne({ "_id": id }).
        select('-__v -password').
        exec((err, user) => {
            if (err)
                next(err);
            if (!user)
                return next(createError(400, `user not found!`));

            res.status(200).json({
                "operation": "GET/user",
                "Result": user
            });
        });
}

exports.getAllUsers = (req, res, next) => {
    query = {}
    options = {}
    userModel.find(query, options).
        select('-__v -password').
        exec((err, users) => {
            if (err)
                next(err);
            if (!users.length)
                res.status(204).send()
            else
                res.status(200).json({
                    'Operation': 'GET/users', users, Count: users.length
                })
        })
}

exports.deleteUser = (req, res, next) => {
    id = req.params._id;
    if (!errorHandler.validateObjId(id))
        return next(createError(400, `Invalid Parameter id ${id}`));
    userModel.findById(id).exec().then((user) => {

        if (!user)
            throw new Error('User not Found!');

        user.remove().
            then((user) => {
                if (user.profile_picture)
                    unlink(user.profile_picture, (err) => next(err))
                res.status(200).json({
                    'Operation': 'DELETE/user', 'user': user._id
                })
            }).catch(err => next(err));

    }).catch((err) => next(err))


}
exports.deleteManyUsers = (req, res, next) => {
    try {
        ids = req.query._id;
        if (!errorHandler.validateObjIds(ids))
            return next(createError(400, `Invalid Parameter id ${id}`));
        ids.map(async (id) => {
            user = await userModel.findById(id).exec()
            if (!user)
                throw new Error(`User with id ${id} not Found!`);

            removedUser = await user.remove();

            if (removedUser.profile_picture)
                await unlink(removedUser.profile_picture, (err) => next(err));
        })
        res.status(200).json({
            'Operation': 'DELETE/users', 'user': 'done'
        })
    } catch (error) {
        return next(error)
    }
}
exports.updateUser = (req, res, next) => {
    userModel.findById({ "_id": req.params._id }).
        then((doc) => {
            if (!doc)
                throw new Error('User Not Found!');

            req.body.last_update = Date.now();
            if (doc.profile_picture)
                unlink(doc.profile_picture, err => next(err));
            for (prop in req.body) {
                doc[prop] = req.body[prop];
            }
            doc.profile_picture = req.file ? req.file.path : null;

            doc.save().
                then((user) => {
                    res.status(201).json({
                        "message": "success",
                        "operation": "POST/user",
                        "data": user._id
                    })
                }).catch((err) => {
                    if (req.file)
                        unlink(req.file.path, (err) => {
                            next(err)
                        });
                    return next(err)
                })
        }).catch((err) => {
            if (req.file)
                unlink(req.file.path, (err) => {
                    next(err);
                });
            next(createError(400, err));
        });

}


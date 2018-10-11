"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("./schema");
var getAll = function () {
    return schema_1.default.find({});
};
exports.getAll = getAll;
var getById = function (id) {
    return schema_1.default.findById(id);
};
exports.getById = getById;
var create = function (user) {
    return schema_1.default.create(user);
};
exports.create = create;
var update = function (id, user) {
    var updateUser = {
        name: user.name,
        email: user.email,
        password: user.password
    };
    return schema_1.default.findByIdAndUpdate(id, updateUser);
};
exports.update = update;
var remove = function (id) {
    return schema_1.default.remove(id);
};
exports.remove = remove;

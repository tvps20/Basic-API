"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var repository = require("./repository");
var httpStatus = require("http-status");
var sendResponse = function (res, statusCode, date) {
    res.status(statusCode).json({ 'result': date });
};
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.getAll = function (req, res) {
        repository.getAll()
            .then(function (users) { return sendResponse(res, httpStatus.OK, users); })
            .catch(function (err) {
            console.error.bind(console, "Erro ao buscar usu\u00E1rios: " + err.message);
            sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, "Erro ao buscar usu\u00E1rios: " + err.message);
        });
    };
    UserController.prototype.getById = function (req, res) {
        var id = { _id: req.params.id };
        if (id._id.length != 24)
            return sendResponse(res, httpStatus.BAD_REQUEST, 'ID inválido!');
        repository.getById(id)
            .then(function (user) {
            user == null ? sendResponse(res, httpStatus.NOT_FOUND, 'Usuário não foi encontrado!') : sendResponse(res, httpStatus.OK, user);
        })
            .catch(function (err) {
            console.error.bind(console, "Erro ao buscar usu\u00E1rio: " + err.message);
            sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, "Erro ao buscar usu\u00E1rio: " + err.message);
        });
    };
    UserController.prototype.create = function (req, res) {
        var user = req.body;
        repository.create(user)
            .then(function (user) { return sendResponse(res, httpStatus.CREATED, 'Usuário criado com sucesso!'); })
            .catch(function (err) {
            console.error.bind(console, "Erro ao criar usu\u00E1rio: " + err.message);
            sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, "Erro ao criar usu\u00E1rio: " + err.message);
        });
    };
    UserController.prototype.update = function (req, res) {
        var id = { _id: req.params.id };
        var user = req.body;
        if (id._id.length != 24)
            return sendResponse(res, httpStatus.BAD_REQUEST, 'ID inválido!');
        repository.update(id, user)
            .then(function (user) {
            user == null ? sendResponse(res, httpStatus.NOT_FOUND, 'Usuário não foi encontrado!') : sendResponse(res, httpStatus.OK, 'Usuário Atualizado');
        })
            .catch(function (err) {
            console.error.bind(console, "Erro ao atualizar usu\u00E1rio: " + err.message);
            sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, "Erro ao atualizar usu\u00E1rio: " + err.message);
        });
    };
    UserController.prototype.delete = function (req, res) {
        var id = { _id: req.params.id };
        if (id._id.length != 24)
            return sendResponse(res, httpStatus.BAD_REQUEST, 'ID inválido!');
        repository.remove(id)
            .then(function (result) { return sendResponse(res, httpStatus.OK, 'Usuário excluido com sucesso!'); })
            .catch(function (err) {
            console.error.bind(console, "Erro ao excluir usu\u00E1rio: " + err.message);
            sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, "Erro ao excluir usu\u00E1rio: " + err.message);
        });
    };
    return UserController;
}());
exports.default = new UserController;

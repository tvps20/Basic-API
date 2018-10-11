"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("./controller");
var httpStatus = require("http-status");
var sendResponse = function (res, statusCode, date) {
    res.status(statusCode).json({ 'result': date });
};
var UserRoutes = /** @class */ (function () {
    function UserRoutes(app) {
        this.createRoutes(app);
    }
    UserRoutes.prototype.createRoutes = function (app) {
        app.route('/').get(function (req, res) { return res.status(200).json({ 'message': 'Hello, world' }); });
        app.route('/teste').get(function (req, res) { return res.status(200).json({ 'message': 'Rota teste esta funcionando' }); });
        app.route('/api/v1/users').get(this.getAll);
        app.route('/api/v1/users/:id').get(this.getById);
        app.route('/api/v1/users').post(this.create);
        app.route('/api/v1/users/:id').put(this.update);
        app.route('/api/v1/users/:id').delete(this.delete);
    };
    UserRoutes.prototype.getAll = function (req, res) {
        controller_1.default.getAll()
            .then(function (users) { return sendResponse(res, httpStatus.OK, users); })
            .catch(function (err) {
            console.error.bind(console, "Erro ao buscar usu\u00E1rios: " + err.message);
            sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, "Erro ao buscar usu\u00E1rios: " + err.message);
        });
    };
    UserRoutes.prototype.getById = function (req, res) {
        var id = { _id: req.params.id };
        if (id._id.length != 24)
            return sendResponse(res, httpStatus.BAD_REQUEST, 'ID inválido!');
        controller_1.default.getById(id)
            .then(function (user) {
            user == null ? sendResponse(res, httpStatus.NOT_FOUND, 'Usuário não foi encontrado!') : sendResponse(res, httpStatus.OK, user);
        })
            .catch(function (err) {
            console.error.bind(console, "Erro ao buscar usu\u00E1rio: " + err.message);
            sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, "Erro ao buscar usu\u00E1rio: " + err.message);
        });
    };
    UserRoutes.prototype.create = function (req, res) {
        var user = req.body;
        controller_1.default.create(user)
            .then(function (user) { return sendResponse(res, httpStatus.CREATED, 'Usuário criado com sucesso!'); })
            .catch(function (err) {
            console.error.bind(console, "Erro ao criar usu\u00E1rio: " + err.message);
            sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, "Erro ao criar usu\u00E1rio: " + err.message);
        });
    };
    UserRoutes.prototype.update = function (req, res) {
        var id = { _id: req.params.id };
        var user = req.body;
        if (id._id.length != 24)
            return sendResponse(res, httpStatus.BAD_REQUEST, 'ID inválido!');
        controller_1.default.update(id, user)
            .then(function (user) {
            user == null ? sendResponse(res, httpStatus.NOT_FOUND, 'Usuário não foi encontrado!') : sendResponse(res, httpStatus.OK, 'Usuário Atualizado');
        })
            .catch(function (err) {
            console.error.bind(console, "Erro ao atualizar usu\u00E1rio: " + err.message);
            sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, "Erro ao atualizar usu\u00E1rio: " + err.message);
        });
    };
    UserRoutes.prototype.delete = function (req, res) {
        var id = { _id: req.params.id };
        if (id._id.length != 24)
            return sendResponse(res, httpStatus.BAD_REQUEST, 'ID inválido!');
        controller_1.default.delete(id)
            .then(function (result) { return sendResponse(res, httpStatus.OK, 'Usuário excluido com sucesso!'); })
            .catch(function (err) {
            console.error.bind(console, "Erro ao excluir usu\u00E1rio: " + err.message);
            sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, "Erro ao excluir usu\u00E1rio: " + err.message);
        });
    };
    return UserRoutes;
}());
exports.default = UserRoutes;

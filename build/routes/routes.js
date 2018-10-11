"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("../server/modules/user/controller");
var ROUTES = function (app) {
    app.route('/').get(function (req, res) { return res.status(200).json({ 'message': 'Hello, world' }); });
    app.route('/teste').get(function (req, res) { return res.status(200).json({ 'message': 'Rota teste esta funcionando' }); });
    app.route('/api/v1/users').get(controller_1.default.getAll);
    app.route('/api/v1/users/:id').get(controller_1.default.getById);
    app.route('/api/v1/users').post(controller_1.default.create);
    app.route('/api/v1/users/:id').patch(controller_1.default.update); // Troando put por patch, atualização parcial, atualiza apenas o campo que foi modificado.
    app.route('/api/v1/users/:id').delete(controller_1.default.delete);
};
exports.default = ROUTES;

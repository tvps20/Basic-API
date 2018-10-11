"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var db_1 = require("./config/db");
var controller_1 = require("./modules/user/controller");
var App = /** @class */ (function () {
    function App() {
        this.app = express(), this.middleware(), this.routes();
    }
    App.prototype.closeDataBaseConnection = function (message, callback) {
        db_1.default.closeConnection(message, function () { return callback(); });
    };
    App.prototype.middleware = function () {
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    };
    App.prototype.routes = function () {
        this.app.route('/').get(function (req, res) { return res.status(200).json({ 'message': 'Hello, world' }); });
        this.app.route('/teste').get(function (req, res) { return res.status(200).json({ 'message': 'Rota teste esta funcionando' }); });
        this.app.route('/api/v1/users').get(controller_1.default.getAll);
        this.app.route('/api/v1/users/:id').get(controller_1.default.getById);
        this.app.route('/api/v1/users').post(controller_1.default.create);
        this.app.route('/api/v1/users/:id').put(controller_1.default.update);
        this.app.route('/api/v1/users/:id').delete(controller_1.default.delete);
    };
    return App;
}());
exports.default = new App();

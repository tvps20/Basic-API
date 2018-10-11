"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var db_1 = require("./config/db");
var routes_1 = require("../routes/routes");
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
        routes_1.default(this.app);
    };
    return App;
}());
exports.default = new App();

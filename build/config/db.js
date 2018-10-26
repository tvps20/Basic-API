"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var DataBase = /** @class */ (function () {
    function DataBase() {
        this.DB_URI = 'mongodb://127.0.0.1/ts-base-api';
        this.createConnection();
    }
    DataBase.prototype.createConnection = function () {
        if (process.env.NODE_ENV == 'production') {
            this.DB_URI = process.env.MONGODB_URI;
        }
        mongoose.connect(this.DB_URI, { useNewUrlParser: true });
        this.logger(this.DB_URI);
    };
    DataBase.prototype.logger = function (uri) {
        this.DB_CONNECTION = mongoose.connection;
        this.DB_CONNECTION.on('connected', function () { return console.log("Mondoose esta conectado ao " + uri); });
        this.DB_CONNECTION.on('error', function (error) { return console.log("Erro na conex\u00E3o: " + error); });
        this.DB_CONNECTION.on('disconnected', function () { return console.log("Mongoose esta desconectado do " + uri); });
    };
    DataBase.prototype.closeConnection = function (message, callback) {
        this.DB_CONNECTION.close(function () {
            console.log("Mongoose foi desconectado pelo: " + message);
            callback();
        });
    };
    return DataBase;
}());
exports.default = new DataBase;

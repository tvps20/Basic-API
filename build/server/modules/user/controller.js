"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        return __awaiter(this, void 0, void 0, function () {
            var users, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, repository.getAll()];
                    case 1:
                        users = _a.sent();
                        sendResponse(res, httpStatus.OK, users);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getById = function (req, res) {
        var id = { _id: req.params.id };
        if (id._id.length != 24)
            return sendResponse(res, httpStatus.BAD_REQUEST, 'ID inválido!');
        try {
            var user = repository.getById(id);
            sendResponse(res, httpStatus.OK, user);
        }
        catch (error) {
            console.log(error);
            sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error);
        }
    };
    UserController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = req.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, repository.create(user)];
                    case 2:
                        _a.sent();
                        sendResponse(res, httpStatus.CREATED, "Usu\u00E1rio criado");
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = { _id: req.params.id };
                        user = req.body;
                        if (id._id.length != 24)
                            return [2 /*return*/, sendResponse(res, httpStatus.BAD_REQUEST, 'ID inválido!')];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, repository.update(id, user)];
                    case 2:
                        _a.sent();
                        sendResponse(res, httpStatus.OK, 'Usuário atualizado');
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3);
                        sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error_3);
                        return [3 /*break*/, 4];
                    case 4:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = { _id: req.params.id };
                        if (id._id.length != 24)
                            return [2 /*return*/, sendResponse(res, httpStatus.BAD_REQUEST, 'ID inválido!')];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, repository.remove(id)];
                    case 2:
                        result = _a.sent();
                        sendResponse(res, httpStatus.OK, result);
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.log(error_4);
                        sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.default = new UserController;
// Sem try catch
// class UserController {
//     constructor() {}
//     public getAll(req, res) {
//         repository.getAll()
//             .then(users => sendResponse(res, httpStatus.OK, users))
//             .catch(err => {
//                 console.error.bind(console, `Erro ao buscar usuários: ${ err.message }`);
//                 sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, `Erro ao buscar usuários: ${ err.message }`);
//             });
//     }
//     public getById(req, res) {
//         const id = { _id: req.params.id };
//         if(id._id.length != 24 ) return sendResponse(res, httpStatus.BAD_REQUEST, 'ID inválido!');
//         repository.getById(id)
//             .then(user => {
//                 user == null ? sendResponse(res, httpStatus.NOT_FOUND, 'Usuário não foi encontrado!') : sendResponse(res, httpStatus.OK, user);
//             })
//             .catch(err => {
//                 console.error.bind(console, `Erro ao buscar usuário: ${ err.message }`);
//                 sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, `Erro ao buscar usuário: ${ err.message }`);
//             });
//     }
//     public create(req, res) {
//         const user = req.body;
//         repository.create(user)
//             .then(user => sendResponse(res, httpStatus.CREATED, 'Usuário criado com sucesso!'))
//             .catch(err => {
//                 console.error.bind(console, `Erro ao criar usuário: ${ err.message }`);
//                 sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, `Erro ao criar usuário: ${ err.message }`);
//             });
//     }
//     public update(req, res) {
//         const id = { _id: req.params.id };
//         const user = req.body;
//         if(id._id.length != 24 ) return sendResponse(res, httpStatus.BAD_REQUEST, 'ID inválido!');
//         repository.update(id, user)
//             .then(user => {
//                 user == null ? sendResponse(res, httpStatus.NOT_FOUND, 'Usuário não foi encontrado!') : sendResponse(res, httpStatus.OK, 'Usuário Atualizado');
//             })
//             .catch(err => {
//                 console.error.bind(console, `Erro ao atualizar usuário: ${ err.message }`);
//                 sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, `Erro ao atualizar usuário: ${ err.message }`);
//             });
//     }
//     public delete(req, res) {
//         const id = { _id: req.params.id };
//         if(id._id.length != 24 ) return sendResponse(res, httpStatus.BAD_REQUEST, 'ID inválido!');
//         repository.remove(id)
//             .then(result => sendResponse(res, httpStatus.OK, 'Usuário excluido com sucesso!'))
//             .catch(err => {
//                 console.error.bind(console, `Erro ao excluir usuário: ${ err.message }`);
//                 sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, `Erro ao excluir usuário: ${ err.message }`);
//             });
//     }
// }
// export default new UserController;

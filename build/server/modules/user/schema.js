"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true, required: true },
    password: { type: String, required: true, select: false },
}, { timestamps: true });
exports.default = mongoose.model('User', UserSchema);

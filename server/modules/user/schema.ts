import * as  Mongoose  from "mongoose";

const UserSchema = new Mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default UserSchema;
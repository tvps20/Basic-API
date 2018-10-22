import * as  mongoose  from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true, required: true },
    password: { type: String, required: true, select: false },
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
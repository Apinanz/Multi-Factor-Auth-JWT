import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user_id: { type: String, default: null },
    firstname: { type: String, default: null },
    lastname: { type: String, default: null },
    email: { type: String, default: null, unique: true },
    password: { type: String },
    token: { type: String },
    secret: { type: String },
    multi_factor: { type: Boolean, default: false },
    created_at: { type: Date, default: null },
    updated_at: { type: Date, default: null },
})

export default mongoose.model('User', userSchema);
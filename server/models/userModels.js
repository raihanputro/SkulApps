import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    profilePic: {
        type: String,
        required: true,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const userModel = mongoose.model('userModel', userSchema);

export default userModel;
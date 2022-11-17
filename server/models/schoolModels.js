import mongoose from 'mongoose';

const schoolSchema = mongoose.Schema({
    name: String,
    npsn: String,
    status: String,
    addres: String,
    desc: String,
    authorId: String,
    authorName: String,
    tags: [String],
    schoolImage: String,
    likes: {
        type: [String],
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const SchoolModel = mongoose.model('SchoolModel', schoolSchema);

export default SchoolModel;
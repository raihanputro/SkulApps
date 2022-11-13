import mongoose from 'mongoose';

const schoolSchema = mongoose.Schema({
    name: String,
    npsn: String,
    status: String,
    addres: String,
    desc: String,
    author: String,
    tags: [String],
    schoolImage: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const SchoolModel = mongoose.model('SchoolModel', schoolSchema);

export default SchoolModel;
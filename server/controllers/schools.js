import mongoose from "mongoose";
import SchoolModel from "../models/schoolModels.js";


export const getSchools = async (req, res) => {
    const { page } = req.query;

    try {
        const limit = 9;
        const startIndex = (Number(page) -1 ) * limit;
        const total = await SchoolModel.countDocuments({});

        const schools = await SchoolModel.find().sort({ _id: -1}).limit(limit).skip(startIndex);

        res.json({ data: schools, currentPage: Number(page), numberOfPage: Math.ceil(total / limit) });
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

export const getSchoolsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const name = new RegExp(searchQuery, "i"); 

        const schools = await SchoolModel.find({ $or: [ {name}, { tags: { $in: tags.split(',') }} ]});

        res.json({ data: schools });
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const createSchool = async (req, res) => {
    const school = req.body;

    const newSchool = new SchoolModel({...school, authorId: req.userId, createdAt: new Date().toISOString() });

    try {
        await newSchool.save()

        res.status(201).json(newSchool);
    } catch(error) {
        res.status(409).json({ message: error.message});
    }
}

export const updateSchool =  async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Tidak ada post dengan id tersebut!');

    const updatedPost = await SchoolModel.findByIdAndUpdate(_id, post, { new: true });

    res.json(updatedPost);
}
 
export const deleteSchool = async (req, res) => {
    const {id: _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Tidak ada post dengan id tersebut!');

    const deletedPost = await SchoolModel.findByIdAndRemove(_id);
    
    res.json(deletedPost);
}

export const likeSchool = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: "Tidak terautentikasi!"});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Tidak ada post dengan id tersebut!');

    const post = await SchoolModel.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const likedPost = await SchoolModel.findByIdAndUpdate(id, post, { new: true });

    res.json(likedPost); 
}
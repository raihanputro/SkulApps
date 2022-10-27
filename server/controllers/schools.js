import mongoose from "mongoose";
import SchoolModel from "../models/schoolModels.js";


export const getSchools = async (req, res) => {
    try {
        const postMessage = await SchoolModel.find();

        res.status(200).json(postMessage);
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

export const createSchool = async (req, res) => {
    const school = req.body;

    const newSchool = new SchoolModel(school);

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
    const {id: _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Tidak ada post dengan id tersebut!');

    const post = await SchoolModel.findById(_id);
    const likedPost = await SchoolModel.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1}, { new: true });

    res.json(likedPost); 
}
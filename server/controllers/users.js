import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModels.js';


const secret = 'test';


export const userRegister = async (req,res) => {
    const { name, email, password, profilePic } = req.body;

    try {
        const oldUser = await userModel.findOne({ email });

        if(oldUser) return res.status(400).json({ message: "Pengguna sudah ada, silahkan login!"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await userModel.create({ name, email, password: hashedPassword, profilePic });

        const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

        res.status(201).json({ result, token});
    } catch(error) {
        res.status(500).json({ message: "Ada masalah!" });
        console.log(error);
    }
};
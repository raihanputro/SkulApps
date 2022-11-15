import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModels.js';

const secret = 'test';

export const signin = async(req, res) => {
    const { email, password } =  req.body;

    try {
        const oldUser = await userModel.findOne({ email });

        if(!oldUser) return res.status(404).json({ message: "Email belum terdaftar, silahkan ke halaman daftar!"});

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: "Password salah, silahkan masukkan password yang benar!"});

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id}, secret, {expiresIn: "1h"});

        res.status(200).json({ result: oldUser, token });
    } catch (error) {
        res.status(500).json({ message: "Terdapat masalah!"});
        console.log(error);
    }
};

export const signup = async(req, res) => {
    const { name, email, password, confirmPassword } =  req.body;

    try {
        const oldUser =  await userModel.findOne({ email });

        if(oldUser) return res.status(400).json({ message: "Email sudah terdaftar, silahkan ke halaman login!"});

        if(password !== confirmPassword) return res.status(400).json({ message: "Konfirmasi password tidak benar, silahkan ulangi!"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await userModel.create({ name, email, password: hashedPassword});

        const token =  jwt.sign({ email: result.email, id: result._id}, secret, {expiresIn: "1h"});

        res.status(201).json({ result, token});
    } catch (error) {
        res.stattus(500).json({ message: "Terdapat masalah!"});
        console.log(error)
    }
    
};
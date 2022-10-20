import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotEnv from 'dotenv';

import postRoutes from './routes/schools.js'

const app = express();
dotEnv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/schools', postRoutes);

const PORT = process.env.PORT;

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server berjalan pada port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} tidak terhubung!`));


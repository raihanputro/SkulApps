import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotEnv from 'dotenv';

import schoolRoutes from './routes/schoolRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
dotEnv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(express.json());
app.use(cors());

app.use('/schools', schoolRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT;

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server berjalan pada port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} tidak terhubung!`));


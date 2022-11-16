import express from "express";

import { getSchools, getSchoolsBySearch, createSchool, updateSchool, deleteSchool, likeSchool } from '../controllers/schools.js';
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get('/', getSchools);
router.get('/search', getSchoolsBySearch);
router.post('/', auth, createSchool);
router.patch('/:id', auth, updateSchool);
router.delete('/:id', auth, deleteSchool);
router.patch('/:id/likeSchool', auth, likeSchool);

export default router;
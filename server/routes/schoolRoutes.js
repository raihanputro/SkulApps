import express from "express";

import { getSchools, createSchool, updateSchool, deleteSchool, likeSchool } from '../controllers/schools.js';

const router = express.Router();

router.get('/', getSchools);
router.post('/', createSchool);
router.patch('/:id', updateSchool);
router.delete('/:id', deleteSchool);
router.patch('/:id/likeSchool', likeSchool);

export default router;
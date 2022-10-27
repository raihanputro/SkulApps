import express  from "express";
import { userRegister } from "../controllers/users.js";

const router = express.Router();

router.post('/', userRegister);

export default router;
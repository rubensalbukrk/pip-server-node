import express from 'express';
import { verifyToken } from '../middlewares/auth';
import {create, get,remove} from '../controllers/notices.controller'

const router = express.Router();

router.post("/", verifyToken, create)
router.get("/", get)
router.delete("/:id", verifyToken, remove)

export default router;
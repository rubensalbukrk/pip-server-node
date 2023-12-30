import express from 'express';
import { verifyToken } from '../middlewares/auth';
import {create, get,remove} from '../controllers/notices.controller'
import bodyParser from 'body-parser';

const router = express.Router();
router.use(bodyParser.json());

router.post("/", verifyToken, create)
router.get("/", get)
router.delete("/:id", verifyToken, remove)

export default router;
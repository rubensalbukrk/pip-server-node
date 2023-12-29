import data from '../utils/data';
import express from 'express';
import { verifyToken } from './../middlewares/auth';
import bodyParser from 'body-parser';
import { get, create, update, remove } from '../controllers/solicitations.controller'

const router = express.Router()
router.use(bodyParser.json());

router.post("/", verifyToken, create)
router.get("/", verifyToken, get)
router.put("/:id", verifyToken, update)
router.delete("/:id", verifyToken, remove)

export default router;

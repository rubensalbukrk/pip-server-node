import { verifyToken } from './../middlewares/auth';
import express from 'express';
import {create, get, remove, update} from '../controllers/user.controller'
import bodyParser from 'body-parser';

const router = express.Router()
router.use(bodyParser.json());

  router.post("/", verifyToken, create)
  router.get("/", verifyToken, get)
  router.put("/:id", verifyToken, update)
  router.delete("/:id", verifyToken, remove)

export default router;
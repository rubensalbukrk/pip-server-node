import { verifyToken } from './../middlewares/auth';
import express from 'express';
import {create, get, remove, update} from '../controllers/user.controller'
import bodyParser from 'body-parser';

const router = express.Router()
router.use(bodyParser.json());

  router.post("/", create)
  router.get("/", get)
  router.put("/:id", verifyToken, update)
  router.delete("/:id", remove)

export default router;
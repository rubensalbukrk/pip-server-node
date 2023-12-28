import { verifyToken } from './../middlewares/auth';
import express from 'express';
import bcrypt from 'bcrypt'
import { userValidation } from '../validations/user.validation';
import {create, get, remove, update} from '../controllers/user.controller'

const router = express.Router()

  router.post("/", create)
  router.get("/", get)
  router.put("/:id", verifyToken, update)
  router.delete("/:id", verifyToken, remove)

export default router;
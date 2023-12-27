import { verifyToken } from './../middlewares/auth';
import express from 'express';
import data from '../utils/data'
import bcrypt from 'bcrypt'
import { UserProps } from '../interfaces/userProps';
import { userValidation } from '../validations/user.validation';
import {create, get, remove, update} from '../controllers/user.controller'

const router = express.Router()


  router.get("/", get)
  router.post("/", create)
  router.put("/:id", verifyToken, update)
  router.delete("/:id", verifyToken, remove)

export default router;
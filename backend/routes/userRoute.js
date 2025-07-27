import express from 'express';
import { login, register, listUsers } from '../controllers/userController.js';
import { userTable } from '../models/userModel.js';


const userRoute = express.Router();

userTable();

userRoute.post('/login', login);
userRoute.post('/register', register);
userRoute.get('/list', listUsers);

export default userRoute;
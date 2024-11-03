import express from 'express';
import homeController from './src/controllers/homeController.js';
import loginController from './src/controllers/loginController.js';
import helpController from './src/controllers/helpController.js';
import registerController from "./src/controllers/registerController.js";
import { userRequired } from './src/middleware/globalMiddleware.js';
import doctorController from "./src/controllers/doctorController.js";

const router = express.Router();

//Routes Home
router.get('/', homeController.index);

//Routes Login
router.get('/login', loginController.index);
router.post('/login', loginController.submit);

//Routes Previus
router.get('/previus', loginController.previus);

//Routes Register
router.get('/register', registerController.index)
router.post('/register', registerController.register);

//Routes Help
router.get('/help', helpController.index);
router.get('/previus-help', helpController.previus);

//Routes Doctor
router.get('/doctor', userRequired, doctorController.index);

export default router;
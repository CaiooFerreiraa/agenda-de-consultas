import express from 'express';
import homeController from './src/controllers/homeController.js';
import loginController from './src/controllers/loginController.js';
import helpController from './src/controllers/helpController.js';
import registerController from "./src/controllers/registerController.js";

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

//Routes Help
router.get('/help', helpController.index);
router.get('/previus-help', helpController.previus);

export default router;
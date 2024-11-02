import express from 'express';
import homeController from './src/controllers/homeController.js';
import loginController from './src/controllers/loginController.js';
import helpController from './src/controllers/helpController.js';

const router = express.Router();

//Routes Home
router.get('/', homeController.index);

//Routes Login
router.get('/login', loginController.index);
router.post('/login', loginController.submit);

//Routes Previus
router.get('/previus', loginController.previus);

//Routes Help
router.get('/help', helpController.index);

export default router;
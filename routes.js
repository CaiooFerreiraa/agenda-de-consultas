import express from 'express';
import homeController from './src/controllers/homeController.js';
import loginController from './src/controllers/loginController.js';

const router = express.Router();

//Rotas da home
router.get('/', homeController.index);

//Rotas login
router.get('/login', loginController.index);

//Rota voltar
router.get('/voltar', loginController.previus);

export default router;
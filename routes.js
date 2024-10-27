import express from 'express';
import homeController from './src/controllers/homeController.js';
import loginController from './src/controllers/loginController.js';

const router = express.Router();

//Rotas da home
router.get('/', homeController.index);

//Rota login
router.get('/login', loginController.index);

//Route previus
router.get('/voltar', loginController.previus);

export default router;
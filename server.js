import express from 'express';
import router from './routes.js';
import path from 'path';
import os from 'os';

const networkInterface = os.networkInterfaces();
const app = express();
const port = 8080;
const ip = networkInterface['Wi-Fi'][3].address;

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve('public')));
app.use(express.json());

app.set('views', path.resolve('src', 'views'));
app.set('view engine', 'ejs');

app.use(router);

app.listen(port, () => console.log(`Servidor rodando: http://${ip}:${port}`));
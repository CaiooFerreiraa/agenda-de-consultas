import express from 'express';
import router from './routes.js';
import path from 'path';

const app = express();
const port = 8080;
const ip = '192.168.1.150'

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve('public')));
app.use(express.json());

app.set('views', path.resolve('src', 'views'));
app.set('view engine', 'ejs');

app.use(router);

app.listen(port, () => console.log(`Servidor rodando: http://${ip}:${port}`));
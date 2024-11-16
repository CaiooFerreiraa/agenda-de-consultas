import express from 'express';
import router from './routes.js';
import path from 'path';
import os from 'os';
import csrf from 'csurf';
import flash from 'connect-flash';
import { createCsrf, csrfError} from './src/middleware/globalMiddleware.js'
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();

const networkInterface = os.networkInterfaces();
const app = express();
const port = 8080;
const ip = networkInterface['Wi-Fi'][3].address;

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve('public')));
app.use(express.json());

const sessionOptions = session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve('src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());

app.use(createCsrf);
app.use(csrfError);

app.use(router);

app.listen(port, () => console.log(`Servidor rodando: http://${ip}:${port}`));
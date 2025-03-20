import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import path from 'path';
import {fileURLToPath} from 'url';
import passport from './src/config/passport.js';
import routes from './src/routes/routes.js';
import setLocals from './src/middlewares/setLocals.js';

dotenv.config()

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

app.use(setLocals);

app.use("/", routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error!' });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on ${process.env.PORT || 3000}`);
});
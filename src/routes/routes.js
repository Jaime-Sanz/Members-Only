import express from 'express';
import { getSignUpPage, postSignUp, getLoginPage, postLogin } from '../controllers/routeControllers.js';
import validateUserSignUp from '../middlewares/validateSignUp.js';
import validateUserLogin from '../middlewares/validateLogin.js';

const router = express.Router();

router.get('/login', getLoginPage);
router.post('/login', validateUserLogin,  postLogin);

router.get('/sign-up', getSignUpPage);
router.post('/sign-up', validateUserSignUp, postSignUp);

export default router;
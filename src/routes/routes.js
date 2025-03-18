import express from 'express';
import { getHomePage, getSignUpPage, postSignUp, getLoginPage } from '../controllers/routeControllers.js';
import validateUserSignUp from '../middlewares/validateSignUp.js';
import validateUserLogin from '../middlewares/validateLogin.js';
import passport from 'passport';

const router = express.Router();

router.get('/', getHomePage);

router.get('/login', getLoginPage);
router.post('/login', validateUserLogin, passport.authenticate("local", {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/sign-up', getSignUpPage);
router.post('/sign-up', validateUserSignUp, postSignUp);

export default router;
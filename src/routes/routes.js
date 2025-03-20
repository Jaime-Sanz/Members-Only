import express from 'express';
import { getHomePage, getCreateMessage, postCreateMessage, postSecretMessage, getLoginPage, getSignUpPage, postSignUp, postLogout } from '../controllers/routeControllers.js';
import validateUserSignUp from '../middlewares/validateSignUp.js';
import validateUserLogin from '../middlewares/validateLogin.js';
import validateSecret from '../middlewares/validateSecret.js';
import passport from 'passport';

const router = express.Router();

router.get('/', getHomePage);

router.get('/create-message', getCreateMessage);
router.post('/create-message', postCreateMessage);

router.post('/secret', validateSecret, postSecretMessage);

router.get('/login', getLoginPage);
router.post('/login', validateUserLogin, passport.authenticate("local", {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.post('/logout', postLogout);

router.get('/sign-up', getSignUpPage);
router.post('/sign-up', validateUserSignUp, postSignUp);

export default router;
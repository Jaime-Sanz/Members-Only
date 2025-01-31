import express from 'express';
import { getHomepage, getSignUp, getLogin, postSignUp } from '../controllers/homeController.js';
import { validateSignup } from '../middleware/validation.js';

const router = express.Router();

router.get('/', getHomepage);

router.get('/sign-up', getSignUp);

router.get('/login', getLogin);

router.post('/sign-up', validateSignup, postSignUp);

export default router;
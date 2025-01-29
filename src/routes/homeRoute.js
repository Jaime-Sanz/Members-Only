import express from 'express';
import { getHomepage, getSignUp, getLogin, postSignUp } from '../controllers/homeController.js';

const router = express.Router();

router.get('/', getHomepage);

router.get('/sign-up', getSignUp);

router.get('/login', getLogin);

router.post('/sign-up', postSignUp);

export default router;
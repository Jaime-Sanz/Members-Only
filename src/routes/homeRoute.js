import express from 'express';
import { getHomepage, getSignUp, getLogin } from '../controllers/homeController.js';

const router = express.Router();

router.get('/', getHomepage);

router.get('/sign-up', getSignUp);

router.get('/login', getLogin);

export default router;
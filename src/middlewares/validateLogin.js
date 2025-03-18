import { body, validationResult } from 'express-validator';

const validateUserLogin = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username not entered'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password not entered'),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const error = new Error('Validation Error');
            error.status = 400;
            error.errors = errors.array();
            next(error);
        }

        next();
    }
];

export default validateUserLogin;
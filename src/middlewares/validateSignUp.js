import { body, validationResult } from 'express-validator';

const validateUserSignUp = [
    body('username')
        .trim()
        .notEmpty(),
    body('password')
        .trim()
        .notEmpty()
        .isLength( {min: 3}),
    body('confirmpassword')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords do not match'),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const error = new Error('validation failed');
            error.status = 400;
            error.errors = errors.array();
            next(error);
        }

        next();
    }
];

export default validateUserSignUp;
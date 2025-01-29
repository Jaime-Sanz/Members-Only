import { body } from "express-validator";

const validateSignup = [
    body('full_name').trim().notEmpty().withMessage('Full name is required').escape(),
    body('username').trim().isLength({ min: 4 }).withMessage('Username must be at least 4 characters long').escape(),
    body('password').isLength({ min:6 }).withMessage('Password must be at least 6 characters long').escape( ),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords must match');
        }
        return true;
    }),
];

export { validateSignup };
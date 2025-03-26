import { body, validationResult } from 'express-validator';

const validateSecret = [
    body('secretMessage')
    .trim()
    .notEmpty()
    .custom(value => {
        if (value !== "dogwater") {
            throw new Error('Thats not the right word!');
        }
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const error = new Error('Validation Error');
            error.status = 400;
            error.errors = errors.array();
            return next(error);
        }
        next();
    }
];

export default validateSecret;
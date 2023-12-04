import { check,body} from "express-validator";

export default {
    email:check('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Enter valid email').normalizeEmail(),
    password:body('password').notEmpty().withMessage('Password field is required').isLength({min:8}).withMessage('Password must contain atleast 8 characters').trim(),
    name:body('name').notEmpty().withMessage('Name field is required'),
    category:body('category').notEmpty().withMessage('Category field is required'),
    description:body('description').notEmpty().withMessage('Description field is required'),
    amount:body('price').notEmpty().withMessage('Price field is required')
}
import { Request, Response, NextFunction } from 'express';
import { validateSignupInput, SignupInput, LoginInput, validateLoginInput } from './validation';

export const validateSignupMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedInput: SignupInput = await validateSignupInput(req.body);
        req.body = validatedInput
        next();
    } catch (error) {
        console.error('Validation error:', error);
        res.status(400).json({ message: 'Invalid input', errors: error });
    }
};

export const validateLoginMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedInput: LoginInput = await validateLoginInput(req.body);
        req.body = validatedInput
        next();
    } catch (error) {
        console.error('Validation error:', error);
        res.status(400).json({ message: 'Invalid input', errors: error });
    }
};

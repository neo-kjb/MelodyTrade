import { Request, Response, NextFunction } from 'express';
import { DiskInput, validateDiskInput } from './validation';


export const validateDiskInputMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedInput: DiskInput = await validateDiskInput(req.body);
        req.body = validatedInput
        next();
    } catch (error) {
        console.error('Validation error:', error);
        res.status(400).json({ message: 'Invalid input', errors: error });
    }
};